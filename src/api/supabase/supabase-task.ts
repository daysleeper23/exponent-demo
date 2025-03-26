import { Task } from "@/types/task";
import supabase from "./supabase-client";
import queryClient from "../query-client";
import { toast } from "sonner";

export const updateTaskSupabase = async (updatedTask: Task) => {
  const { id, team, ...rest } = updatedTask;
  try {
    const { data, error } = await supabase
      .from('tasks')
      .update({ ...rest })
      .eq('id', id)
      .select(
        'id, number, title, status, priority, assignee, team, description'
      );
    
    if (data && data[0]) {
      queryClient.setQueryData(
        ['tasks'],
        (oldData: Task[]) =>
          oldData.map((task) =>
            task.id === data[0].id ? data[0] : task
          ) || []
      );

      toast.success('Task has been updated.', {
        description: updatedTask.title,
        action: {
          label: 'View task',
          onClick: () => {
            //navigate to the task
            console.log('View task');
          },
        },
      });
    }
      

    if (error) {
      throw error;
    }
  } catch (err) {
    // setIsError(true);
    // setError(err as Error);
  } finally {
    // setIsLoading(false);
  }
};