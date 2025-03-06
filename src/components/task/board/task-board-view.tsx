export interface Column {
  id: string
  type: string
  tasks: string[]
}

import { useMemo, useRef, useState } from 'react'
import { DndContext, DragOverlay, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors, DragStartEvent, DragOverEvent, DragEndEvent, closestCenter, pointerWithin } from '@dnd-kit/core'
import { hasSortableData, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { Task } from '@/types/task'
import { TaskBoardColumn } from './task-board-column'
import TaskBoardCard from './task-board-card'

export interface Column {
  id: string
  type: string
  tasks: string[]
}

interface TaskBoardViewProps {
  tasks: Task[]
}

const TaskBoardView = ({ tasks }: TaskBoardViewProps) => {

  const [activeId, setActiveId] = useState<string | null>(null);

  let initialColumns = useMemo(() => {
    return new Map(
    [0, 1, 2 , 3, 4].map(element => {
      const value = {
        id: element.toString(),
        type: 'status',
        tasks: tasks.filter(task => task.status === element).map(task => task.id),
      }
      return [element.toString(), value];
    })
    );
  }, [tasks])!;
  const [columns, setColumns] = useState(initialColumns);

  const rafId = useRef<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, 
      {
        activationConstraint: {
          distance: 1,
        },
      }
    ),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id.toString());
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;

    if (hasSortableData(over) && hasSortableData(active)) {
      const activeColId = active.data.current.sortable.containerId.toString();
      const overColId = over.data.current.sortable.containerId.toString();
      const activeItemIndex = active.data.current.sortable.index;
      const overItemIndex = over.data.current.sortable.index;

      //remove the active item from the initial column
      active.data.current.sortable.items.splice(activeItemIndex, 1);

      if (activeColId === overColId) {
        over.data.current.sortable.items.splice(overItemIndex, 0, active.id);
        setColumns((prev) => {
          let activeCol = prev.get(activeColId)!.tasks;
          activeCol.splice(activeItemIndex, 1);
          activeCol.splice(overItemIndex, 0, active.id.toString());
          prev.get(activeColId)!.tasks = activeCol;
          return new Map(prev);
        })
      }
      else {        
        setColumns((prev) => {
          prev.get(activeColId)!.tasks = active.data.current.sortable.items.map(item => item.toString());
          prev.get(overColId)!.tasks = over.data.current.sortable.items.map(item => item.toString());
          return new Map(prev);
        })
      }
      console.log('after - active:', active.data.current.sortable.items.length, 'over:', over.data.current.sortable.items.length);
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    if (rafId.current !== null) return;

    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;

      const { active, over } = event;

      if (hasSortableData(over) && hasSortableData(active)) {
        const activeColId = active.data.current.sortable.containerId.toString();
        const overColId = over.data.current.sortable.containerId.toString();
        const activeItemIndex = active.data.current.sortable.index;
        const overItemIndex = over.data.current.sortable.index;

        console.log('DRAG OVER from [', activeColId, ',', activeItemIndex,'] to [', overColId, ',', overItemIndex, ']');
        if (activeColId === overColId) {
          return;
        } 
        else {
          // active.data.current.sortable.items.splice(activeItemIndex, 1);
          console.log('temporarily insert to over at', overItemIndex);
          if (!over.data.current.sortable.items.includes(active.id)) {
            console.log('item does not exists, inserting');
            over.data.current.sortable.items.splice(overItemIndex, 0, active.id);
          } else {
            console.log('already exists, just moving this temp to another position');
            const currentTempIndex = over.data.current.sortable.items.indexOf(active.id);
            if (currentTempIndex !== overItemIndex) {
              over.data.current.sortable.items.splice(currentTempIndex, 1);
              over.data.current.sortable.items.splice(overItemIndex, 0, active.id);
            }
          }
        }
      }
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className='relative overflow-hidden flex-1'>
        <div className='flex w-full h-full overflow-x-auto'>
          <div className='flex-1 flex px-3'>
            {[0, 1, 2, 3, 4].map(item => (
              <TaskBoardColumn key={item.toString()} column={columns.get(item.toString())!} />
            ))}
          </div>
        </div>
      </div>
      <DragOverlay>
        {activeId ? (
          <div className='opacity-80 w-[300px]'>
            <TaskBoardCard
              id={activeId}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
export default TaskBoardView;