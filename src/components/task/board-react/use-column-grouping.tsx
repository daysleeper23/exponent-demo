import { priorityMap, statusMap } from '@/api/api-common';
import { Task } from '@/types/task';
import { useMemo } from 'react';

export const useColumnGrouping = (tasks: Task[], groupBy: string) => {
  if (!tasks) {
    return {};
  }

  if (groupBy !== 'status' && groupBy !== 'priority') {
    throw new Error('Invalid groupBy value');
  }

  const groupedVariants = useMemo(() => {
    return {
      status: Object.keys(statusMap).map((element) => {
        const value = tasks
          .filter((task) => task.status === parseInt(element))
          .map((task) => task.id);
        return value;
      }),
      priority: Object.keys(priorityMap).map((element) => {
        const value = tasks
          .filter((task) => task.priority === parseInt(element))
          .map((task) => task.id);
        return value;
      }),
    };
  }, [tasks, groupBy]);

  return groupedVariants[groupBy];
};
