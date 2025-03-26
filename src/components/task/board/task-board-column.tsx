import { memo } from 'react';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';

import { CardContent, CardHeader } from '@/components/ui/card';
import TaskBoardCard from './task-board-card';
import { Column } from './task-board-view';

import { priorityMap, statusMap } from '@/api/static/common';

interface TaskBoardColumnProps {
  column: Column;
}

const TaskBoardColumn = memo(({ column }: TaskBoardColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="w-[320px] flex-1 flex flex-col gap-3 h-full py-0 shadow-none">
      <CardHeader className="p-2 pt-6">
        <ColumnTitle value={column.id} type={column.type} />
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-2 pt-0">
        <SortableContext
          id={column.id}
          items={column.tasks}
          strategy={verticalListSortingStrategy}
        >
          <div ref={setNodeRef} className="flex flex-col gap-2">
            {column.tasks.map((task) => (
              <TaskBoardCard key={task} id={task} />
            ))}
          </div>
        </SortableContext>
      </CardContent>
    </div>
  );
});
export default TaskBoardColumn;

const ColumnTitle = memo(({ value, type }: { value: string; type: string }) => {
  const colInfo = type === 'status' ? statusMap[value] : priorityMap[value];
  return (
    <div className="flex items-center gap-2 text-sm text-primary/80 px-2">
      {colInfo.icon}
      <span>{colInfo.label}</span>
    </div>
  );
});
