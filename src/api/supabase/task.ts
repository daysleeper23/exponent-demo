import supabase from './supabase';
import { v4 as uuid } from 'uuid';
import { Task, TaskCreate } from '@/types/task';
import { toast } from 'sonner';

const TASK_LIMIT = 200;

export const taskApi = {
  getTasks: async (
    teamId: string
  ): Promise<{ data: Task[]; error: Error | null }> => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('team', teamId)
      .limit(TASK_LIMIT);

    if (error) throw error;
    return {
      data: data || ([] as Task[]),
      error: error || null,
    };
  },

  getTask: async (id: string): Promise<Task | null> => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data || null;
  },

  updateTask: async (task: Task): Promise<Task> => {
    const { data, error } = await supabase
      .from('tasks')
      .update(task)
      .eq('id', task.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  deleteTask: async (id: string) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id);

    return { error };
  },

  addTask: async (task: Task): Promise<Task> => {
    const { data, error } = await supabase
      .from('tasks')
      .insert(task)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
  addTaskSimulation: async (taskCreate: TaskCreate): Promise<Task> => {
    const newTask: Task = {
      id: uuid(),
      number: 1000 + Math.floor(Math.random() * 1000),
      ...taskCreate,
    };

    toast.success('Task has been created.', {
      description:
        "Actually, the task is created locally, but it's not saved on the server 😛. You can re-sort the task list by number DESC to see it.",
      action: {
        label: 'View task',
        onClick: () => {
          //navigate to the task
          console.log('View task');
        },
      },
    });
    return newTask;
  },
};
