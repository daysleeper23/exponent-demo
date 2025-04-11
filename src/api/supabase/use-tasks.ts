import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskApi } from './task';
import useTaskStore from '@/store/task';
import { Task } from '@/types/task';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const useTasks = () => {
  const queryClient = useQueryClient();
  const setTasks = useTaskStore((state) => state.setTasks);
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const addTask = useTaskStore((state) => state.addTask);
  const teamId = useTaskStore((state) => state.teamId);

  // Query for fetching tasks
  const {
    data: tasks,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['tasks', teamId],
    queryFn: async () => {
      const { data, error } = await taskApi.getTasks(teamId);
      if (error) throw error;
      return data;
    },
  });

  // Update Zustand store when tasks data changes
  useEffect(() => {
    if (tasks) {
      setTasks(tasks);
    }
  }, [tasks]);

  // Mutation for updating tasks
  const updateTaskMutation = useMutation<Task, Error, Task>({
    mutationFn: taskApi.updateTask,
    onSuccess: (updatedTask: Task) => {
      if (updatedTask) {
        updateTask(updatedTask);
        queryClient.setQueryData(['tasks', teamId], (oldData: Task[]) => {
          if (oldData) {
            return oldData.map((task) =>
              task.id === updatedTask.id ? updatedTask : task
            );
          }
          return oldData;
        });
        toast.success('Task updated successfully');
      }
    },
  });

  // Mutation for deleting tasks
  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      const { error } = await taskApi.deleteTask(taskId);
      if (error) throw error;
    },
    onSuccess: (_, taskId) => {
      deleteTask(taskId);
      queryClient.invalidateQueries({ queryKey: ['tasks', teamId] });
    },
  });

  // Mutation for adding tasks
  const addTaskMutation = useMutation({
    mutationFn: taskApi.addTaskSimulation,
    onMutate: async () => {
      //cancel any outgoing queries
      await queryClient.cancelQueries({ queryKey: ['tasks', teamId] });
    },
    onSuccess: (data: Task) => {
      if (data) {
        addTask(data);
        queryClient.setQueryData(['tasks', teamId], (oldData: Task[]) => [
          data,
          ...(oldData || []),
        ]);
      }
    },
    onError: (_error, _, context) => {
      if (context) {
        queryClient.setQueryData(
          ['tasks', teamId],
          (oldData: Task[]) => oldData
        );
      }
    },
  });

  return {
    tasks,
    isPending,
    isError,
    error,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
    addTask: addTaskMutation.mutate,
  };
};
