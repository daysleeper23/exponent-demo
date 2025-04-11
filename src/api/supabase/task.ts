import supabase from './supabase';
import { Task } from '@/types/task';

export const taskApi = {
  getTasks: async (
    teamId: string
  ): Promise<{ data: Task[]; error: Error | null }> => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('team', teamId);

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
};
