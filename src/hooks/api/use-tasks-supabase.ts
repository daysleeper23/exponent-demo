import { useState, useEffect, useCallback } from 'react';
import supabase from '@/api/supabase/supabase';
import { Task, TasksSchema } from '@/types/task';
import { updateTaskSupabase } from '@/api/supabase/supabase-task';

const useTasks = () => {
  const [data, setData] = useState<Task[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsPending(true);

      try {
        const { data } = await supabase
          .from('tasks')
          .select(
            'id, number, title, status, priority, assignee, team, description'
          );
        setData(TasksSchema.parse(data));
        setIsError(false);
        setError(null);
      } catch (error) {
        setData([]);
        setIsError(true);
        setError(error as Error);
      } finally {
        setIsPending(false);
      }
    };

    fetchTasks();
  }, []);

  return { data, isPending, isError, error };
};

const useUpdateTask = () => {
  const mutate = useCallback(updateTaskSupabase, []);
  return mutate;
};

export default { useTasks, useUpdateTask };
