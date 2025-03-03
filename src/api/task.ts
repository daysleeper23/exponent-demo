import { v4 as uuid } from 'uuid';
import { Task, TasksSchema } from '@/types/task';
import { faker } from '@faker-js/faker';
import { localUsers } from './user';
import apiClient from './api-client';

export const getTasks = (count: number): Task[] => {
  const tasks: Task[] = [];

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
