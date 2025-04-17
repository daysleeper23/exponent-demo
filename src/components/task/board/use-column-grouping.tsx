import { priorityMap, statusMap } from '@/api/static/common';
import { Task } from '@/types/task';
import { useMemo } from 'react';

export const useColumnGrouping = (tasks: Task[], groupBy: string) => {
  if (groupBy !== 'status' && groupBy !== 'priority') {
    throw new Error('Invalid groupBy value');
  }

  return useMemo(() => {
    if (groupBy === 'status') {
      return Object.entries(statusMap).reduce<Record<string, string[]>>(
        (acc, [statusKey, statusConfig]) => {
          acc[statusKey] = tasks
            .filter((task) => task.status === statusConfig.value)
            .map((task) => task.id);
          return acc;
        },
        {}
      );
    } else {
      return Object.entries(priorityMap).reduce<Record<string, string[]>>(
        (acc, [priorityKey, priorityConfig]) => {
          acc[priorityKey] = tasks
            .filter((task) => task.priority === priorityConfig.value)
            .map((task) => task.id);
          return acc;
        },
        {}
      );
    }
  }, [tasks, groupBy]);
};
