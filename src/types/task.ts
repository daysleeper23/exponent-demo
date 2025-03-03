import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.string().uuid(),
  number: z.number().min(1),
  title: z.string().nonempty({ message: 'Task title could not be empty.' }),
  description: z.string().default('').nullable(),
  status: z.number().max(4).min(0),
  assignee: z.string().uuid(),
  priority: z.number().max(4).min(0),
  team: z.string().uuid(),
});
export const TasksSchema = z.array(TaskSchema);

export type Task = z.infer<typeof TaskSchema>;
