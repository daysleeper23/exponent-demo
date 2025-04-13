import React from 'react';
import { priorityMap, statusMap } from '@/api/static/common';
import { useTasks } from '@/api/supabase/use-tasks';
import useTaskStore from '@/store/task';
import ExpoCombobox from '@/components/common/expo-combo/expo-combo';

interface TaskListRowProps {
  id: string;
  style?: React.CSSProperties;
}

const TaskListRow = React.memo(({ id, style }: TaskListRowProps) => {
  const task = useTaskStore((state) => state.tasks[id]);
  const { updateTask } = useTasks();

  const handleUpdatePriority = (value: string) => {
    const updatedTask = { ...task, priority: parseInt(value) };
    updateTask(updatedTask);
  };

  const handleUpdateStatus = (value: string) => {
    const updatedTask = { ...task, status: parseInt(value) };
    updateTask(updatedTask);
  };

  return (
    <div
      style={style}
      className="w-full px-4 py-2 flex gap-4 items-center
        text-muted-foreground
        border-b border-primary-200 dark:border-primary-700
        hover:bg-primary-foreground
        pointer-events-auto"
      key={task.id}
      data-testid="task-list-row"
    >
      <span className="w-20">{'EXP-' + task.number}</span>
      <span className="flex-1 text-primary overflow-hidden text-nowrap">
        {task.title}
      </span>

      <div className="hidden sm:ml-auto sm:flex sm:gap-4 sm:pointer-events-auto">
        <ExpoCombobox
          className="w-[128px]"
          items={statusMap}
          value={task.status.toString()}
          onChange={handleUpdateStatus}
        />

        <ExpoCombobox
          className="w-[128px]"
          items={priorityMap}
          value={task.priority.toString()}
          onChange={handleUpdatePriority}
        />
      </div>
    </div>
  );
});

TaskListRow.whyDidYouRender = true;

export default TaskListRow;
