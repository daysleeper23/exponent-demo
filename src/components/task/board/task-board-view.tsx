export interface Column {
  id: string;
  type: string;
  tasks: string[];
}

import { memo, useEffect, useRef, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  closestCenter,
} from '@dnd-kit/core';
import {
  arrayMove,
  hasSortableData,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { Task } from '@/types/task';
import TaskBoardColumn from './task-board-column';
import TaskBoardCard from './task-board-card';
import TaskBoardViewHeader from './task-board-view-header';
import { useTaskGrouping } from '@/hooks/use-tasks-grouping';
import { priorityMap, statusMap } from '@/api/static/common';

export interface Column {
  id: string;
  type: string;
  tasks: string[];
}

interface TaskBoardViewProps {
  tasks: Task[];
}

const TaskBoardView = memo(({ tasks }: TaskBoardViewProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [groupBy, setGroupBy] = useState<string>('status');
  const initialColumns = useTaskGrouping(tasks, groupBy);
  const [columns, setColumns] = useState(initialColumns);
  const columnKeys =
    groupBy === 'status' ? Object.keys(statusMap) : Object.keys(priorityMap);

  useEffect(() => {
    setColumns(initialColumns);
  }, [tasks, groupBy]);

  const rafId = useRef<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (hasSortableData(over) && hasSortableData(active)) {
      const activeColId = active.data.current.sortable.containerId.toString();
      const overColId = over.data.current.sortable.containerId.toString();

      if (activeColId === overColId) {
        // drop the task in the same column, update changes to the states

        const activeItemIndex = active.data.current.sortable.index;
        const overItemIndex = over.data.current.sortable.index;

        setColumns((prev) => {
          const activeCol = [...prev.get(activeColId)!.tasks];
          activeCol.splice(activeItemIndex, 1);
          activeCol.splice(overItemIndex, 0, active.id.toString());
          prev.get(activeColId)!.tasks = activeCol;
          return new Map(prev);
        });
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    if (rafId.current !== null) return;

    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;

      const { active, over } = event;

      if (hasSortableData(over) && hasSortableData(active)) {
        const activeColId = active.data.current.sortable.containerId.toString();
        const overColId = over.data.current.sortable.containerId.toString();

        if (activeColId === overColId) {
          // same column, handled automatically by dnd-kit
          return;
        } else {
          const activeItemIndex = active.data.current.sortable.index;
          const overItemIndex = over.data.current.sortable.index;

          if (!over.data.current.sortable.items.includes(active.id)) {
            // over column does not have this item, insert it

            over.data.current.sortable.items.splice(
              overItemIndex,
              0,
              active.id
            );
            active.data.current.sortable.items.splice(activeItemIndex, 1);

            //update the state
            setColumns((prev) => {
              prev.get(activeColId)!.tasks =
                active.data.current.sortable.items.map((item) =>
                  item.toString()
                );
              prev.get(overColId)!.tasks = over.data.current.sortable.items.map(
                (item) => item.toString()
              );
              return new Map(prev);
            });
          } else {
            // over column has this item already, just move it to the new position
            const currentTempIndex = over.data.current.sortable.items.indexOf(
              active.id
            );
            arrayMove(
              over.data.current.sortable.items,
              currentTempIndex,
              overItemIndex
            );
          }
        }
      }
    });
  };

  return (
    <div
      className="relative overflow-hidden flex-1 flex flex-col"
      data-testid="task-board-view"
    >
      <TaskBoardViewHeader groupBy={groupBy} onGroupByChange={setGroupBy} />
      <div className="flex-1 flex w-full h-full overflow-x-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex-1 flex px-2">
            {columnKeys.map((item) => (
              <TaskBoardColumn key={item} column={columns.get(item)!} />
            ))}
          </div>

          <DragOverlay>
            {activeId ? (
              <div className="opacity-80 w-[300px]">
                <TaskBoardCard id={activeId} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
});
export default TaskBoardView;
