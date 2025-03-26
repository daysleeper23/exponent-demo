import { priorityMap, statusMap } from '@/api/static/common';
import { Column } from '@/components/task/board/task-board-view';
import { Task } from '@/types/task';
import { useMemo } from 'react';

export const useTaskGrouping = (
  tasks: Task[],
  groupBy: string
): Map<string, Column> => {
  if (!tasks) {
    return new Map();
  }

  if (groupBy !== 'status' && groupBy !== 'priority') {
    throw new Error('Invalid groupBy value');
  }

  const groupedVariants = useMemo(() => {
    return {
      status: new Map(
        Object.keys(statusMap).map((element) => {
          const value = {
            id: element.toString(),
            type: 'status',
            tasks: tasks
              .filter((task) => task.status === parseInt(element))
              .map((task) => task.id),
          };
          return [element.toString(), value];
        })
      ),
      priority: new Map(
        Object.keys(priorityMap).map((element) => {
          const value = {
            id: element.toString(),
            type: 'priority',
            tasks: tasks
              .filter((task) => task.priority === parseInt(element))
              .map((task) => task.id),
          };
          return [element.toString(), value];
        })
      ),
    };
  }, [tasks]);

  return groupedVariants[groupBy];
};
