import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchTasks, updateTask } from '@/api/task';
// import { getTasks } from '@/api/task';
import { Task } from '@/types/task';
import queryClient from '@/api/query-client';

export function useTasks() {
  /* remote data */
  return useQuery<Task[], Error>({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    staleTime: 1000 * 60,
  });

  /* local data */
  // return {
  //   data: getTasks(1000),
  //   isPending: false,
  //   isError: false,
  //   error: null
  // }
}

export const useUpdateTask = () => {
  return useMutation({
    mutationFn: (task: Task) => {
      return updateTask(task.id, task).then((updatedTask) => updatedTask);
    },
    onMutate: async (updatedTask: Task) => {

      //cancel any outgoing queries
      await queryClient.cancelQueries({ queryKey: ['tasks'] })
      
      //snapshot the previous value
      const previousTasks = queryClient.getQueryData(['tasks']);

      //optimistic update
      queryClient.setQueryData(
        ['tasks']
        , (oldData: Task[]) => oldData.map((task) => task.id === updatedTask.id ? updatedTask : task) || []
      );

      return { previousTasks };
    },
    onError: (_error, _, context) => {
      if (context) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
    },
  }).mutate;
}
