import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import { toast } from 'sonner';

import { Task, TaskCreate, TasksSchema } from '@/types/task';
import { faker } from '@faker-js/faker';
import { localUsers } from './user';
import apiClient from './api-client';

//local data
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

//remote data
export async function fetchTasks(): Promise<Task[]> {
  try {
    const response = await apiClient.get('/tasks');
    const data = TasksSchema.parse(response.data.data);
    return data;
  } catch (error) {
    const retry = 5;
    toast.error('Failed to fetch task.', {
      description: `The backend (hosted on Render) is being warmed up. Try again in ${retry} seconds?`,
      action: {
        label: `Yes`,
        onClick: () => {
          //retry the request in 15 seconds
          setTimeout(() => {
            fetchTasks();
          }, retry * 1000);
        },
      },
    });
    return [];
  }
}

export async function createTask(taskCreate: TaskCreate): Promise<Task | null> {
  try {
    // const response = await apiClient.post('/tasks', task);
    // const data = TaskSchema.parse(response.data.data);
    // return data;)
    toast.success("Task has been created (no it's not :) )", {
      description: taskCreate.title,
      action: {
        label: 'View task',
        onClick: () => {
          //navigate to the task
          console.log('View task');
        },
      },
    });
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      //logging error to monitoring services
      console.log('ZodError', error.errors);

      toast.error('Could not create task, please try again', {
        description: new Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
          timeStyle: 'medium',
        }).format(new Date()),
        action: {
          label: 'Try Again',
          onClick: () => {
            //retry the request
            console.log('Try Again');
          },
        },
      });
    } else {
      console.error('Unknown Error', error);

      toast.error('Failed to create task', {
        description: new Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
          timeStyle: 'medium',
        }).format(new Date()),
        action: {
          label: 'Retry',
          onClick: () => {
            //retry the request
            console.log('Retry');
          },
        },
      });
    }
    return null;
  }
}
