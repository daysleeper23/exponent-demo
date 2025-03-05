import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.string().uuid(),
  number: z.number().min(1),
  title: z.string().nonempty({ message: 'Task title could not be empty.' }),
  description: z
    .string()
    .default('')
    .nullable()
    .transform((val) => val ?? ''),
  status: z.preprocess((val) => Number(val), z.number().min(0).max(4)),
  assignee: z.string().uuid(),
  priority: z.preprocess((val) => Number(val), z.number().min(0).max(4)),
  team: z.string().uuid(),
});
export const TasksSchema = z.array(TaskSchema);
export const TaskCreateSchema = TaskSchema.omit({
  id: true,
  number: true,
});

export type Task = z.infer<typeof TaskSchema>;
export type TaskCreate = z.infer<typeof TaskCreateSchema>;
export type TaskUpdate = {
  id: Task['id'];
} & Partial<Omit<Task, 'id' | 'number' | 'team'>>;
