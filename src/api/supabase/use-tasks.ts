import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskApi } from './task';
import useTaskStore from '@/store/task';
import { Task } from '@/types/task';
import { useEffect } from 'react';

export const useTasks = (teamId: string) => {
  const queryClient = useQueryClient();
  const setTasks = useTaskStore(state => state.setTasks);
  const updateTask = useTaskStore(state => state.updateTask);
  const deleteTask = useTaskStore(state => state.deleteTask);
  const addTask = useTaskStore(state => state.addTask);

  // Query for fetching tasks
  const { data: tasks, isPending, isError, error } = useQuery({
    queryKey: ['tasks', teamId],
    queryFn: async () => {
      const { data, error } = await taskApi.getTasks(teamId);
      if (error) throw error;
      return data;
    }
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
        queryClient.invalidateQueries({ queryKey: ['tasks', teamId] });
      }
    }
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
    }
  });

  // Mutation for adding tasks
  const addTaskMutation = useMutation({
    mutationFn: taskApi.addTask,
    onSuccess: (data: Task) => {
      if (data) {
        addTask(data);
        queryClient.invalidateQueries({ queryKey: ['tasks', teamId] });
      }
    }
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