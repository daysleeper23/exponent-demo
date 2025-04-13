import { memo } from 'react';
import { useSortable } from '@dnd-kit/react/sortable';
import { cn } from '@/lib/utils';
import { priorityMap, statusMap } from '@/api/static/common';
import { useTasks } from '@/api/supabase/use-tasks';
import useTaskStore from '@/store/task';
import ExpoCombobox from '@/components/common/expo-combo/expo-combo';

interface DndCardReactProps {
  id: string;
  column: string;
  index: number;
}

const DndCardReact = memo(({ id, column, index }: DndCardReactProps) => {
  const sortable = useSortable({
    id,
    group: column,
    index,
  });
  const { updateTask } = useTasks();

  const task = useTaskStore((state) => state.tasks[id]);

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
      ref={sortable.ref}
      className={cn(
        'cursor-grab active:cursor-grabbing hover:bg-muted/50 pointer-events-auto flex-1 relative',
        'flex flex-col gap-3 rounded-md border p-3 hover:bg-muted shadown-sm',
        { dragging: sortable.isDragging }
      )}
    >
      <div className="text-left font-normal text-xs inline-flex flex-wrap p-1 px-2 w-fit rounded-lg bg-secondary-foreground/10 text-primary/60">
        EXP-{task.number}
      </div>

      <div className="text-left font-normal text-sm w-full flex-wrap">
        {task.title}
      </div>

      <div className="flex gap-2 pointer-events-auto">
        <ExpoCombobox
          items={statusMap}
          value={task.status.toString()}
          onChange={handleUpdateStatus}
        />
        <ExpoCombobox
          items={priorityMap}
          value={task.priority.toString()}
          onChange={handleUpdatePriority}
        />
      </div>
    </div>
  );
});
export default DndCardReact;
