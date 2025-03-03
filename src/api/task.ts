import { v4 as uuid } from 'uuid';
import { Task, TasksSchema } from '@/types/task';
import { faker } from '@faker-js/faker';
import { localUsers } from './user';
import apiClient from './apiClient';

// export const TaskSchema = z.object({
//     id: z.string().uuid(),
//     number: z.number().min(1),
//     title: z.string().nonempty({ message: "Task title could not be empty." }),
//     description: z.string().default(""),
//     status: z.number().max(4).min(0),
//     assignee: z.string().uuid(),
//     priority: z.number().max(4).min(0),
//     team: z.string().uuid(),
//     estimate: z.number().default(0),
// });

export const getTasks = (count: number): Task[] => {
  const tasks: Task[] = [];

  // const statuses = [0, 1, 2, 3, 4] as Task['status'][];
  // const randomDate = () => {
  //   const today = new Date();
  //   const maxDaysToAdd = 30; // Maximum days in the future
  //   const randomDays = Math.floor(Math.random() * maxDaysToAdd) + 1; // At least 1 day in the future
  //   const futureDate = new Date(today);
  //   futureDate.setDate(today.getDate() + randomDays);
  //   return futureDate;
  // };

  //
  const startNumber = Math.floor(Math.random() * 300);

  for (let i = 0; i < count; i++) {
    tasks.push({
      id: uuid(),
      number: startNumber + i,
      title: faker.hacker.phrase(),
      description: faker.hacker.phrase(),
      status: Math.floor(Math.random() * 5),
      priority: Math.floor(Math.random() * 5),
      assignee: localUsers[Math.floor(Math.random() * localUsers.length)].id,
      team: '80c322ca-e7ac-4b4e-822e-db6d1983b8e2',
    });
  }
  return tasks;
};

export async function fetchTasks(): Promise<Task[]> {
  const response = await apiClient.get('/tasks');
  if (response.status !== 200) {
    throw new Error('Failed to fetch tasks');
  }

  // Validate array of tasks using Zod
  const data = TasksSchema.parse(response.data.data);

  return data;
}
