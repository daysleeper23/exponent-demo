import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import { toast } from 'sonner';

import { Task, TaskCreate, TaskSchema, TasksSchema } from '@/types/task';
import { faker } from '@faker-js/faker';
import { localUsers } from './api-user';
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
    //logging error to monitoring services
    if (error instanceof z.ZodError) {
      console.log('ZodError', error.errors);
    } else {
      console.error('Unknown Error', error);
    }

    const waitTime = 5;
    toast.error('Failed to fetch task.', {
      description: `The backend (hosted on Render) is being warmed up. Try again in ${waitTime} seconds?`,
      action: {
        label: `Yes`,
        onClick: () => {
          //retry the request in 15 seconds
          setTimeout(() => {
            fetchTasks();
          }, waitTime * 1000);
        },
      },
    });
    return [];
  }
}

export async function updateTask(
  taskId: string,
  taskUpdate: Partial<Task>
): Promise<Task | null> {
  try {
    const response = await apiClient.put(`/tasks/${taskId}`, taskUpdate);
    const updatedTask = TaskSchema.parse(response.data.data);

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

    return updatedTask;
  } catch (error) {
    //logging error to monitoring services
    if (error instanceof z.ZodError) {
      console.log('ZodError', error.errors);
    } else {
      console.error('Unknown Error', error);
    }

    const waitTime = 5;
    toast.error('Failed to update task.', {
      description: `Try again in ${waitTime} seconds?`,
      action: {
        label: `Yes`,
        onClick: () => {
          //retry the request
          setTimeout(() => {
            updateTask(taskId, taskUpdate);
          }, waitTime * 1000);
        },
      },
    });

    //throw error to be caught by React Query for optimistic update
    throw error;
  }
}

export async function createTask(taskCreate: TaskCreate): Promise<Task | null> {
  try {
    //create a new task instead of sending the request to the server
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
    console.log('returning new task', newTask);
    return newTask;
  } catch (error) {
    //logging error to monitoring services
    if (error instanceof z.ZodError) {
      console.log('ZodError', error.errors);
    } else {
      console.error('Unknown Error', error);
    }

    const waitTime = 5;
    toast.error('Failed to create task.', {
      description: `Try again in ${waitTime} seconds?`,
      action: {
        label: `Yes`,
        onClick: () => {
          //retry the request
          setTimeout(() => {
            createTask(taskCreate);
          }, waitTime * 1000);
        },
      },
    });

    //throw error to be caught by React Query for optimistic update
    throw error;
  }
}
