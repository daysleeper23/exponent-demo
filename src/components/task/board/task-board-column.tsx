import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import { CardContent, CardHeader } from '@/components/ui/card'
import TaskBoardCard from './task-board-card'
import { Column } from './task-board-view'
import { statusMap } from '@/api/api-common'

interface TaskBoardColumnProps {
  column: Column
}

export function TaskBoardColumn({ column }: TaskBoardColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  })

  return (
    <div className="w-[320px] flex-1 flex flex-col gap-0 h-full py-0 shadow-none">
      <CardHeader className='p-3 pt-6'>
        <ColumnTitle value={column.id} />
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-3">
        <SortableContext id={column.id} items={column.tasks} strategy={verticalListSortingStrategy}>
          <div ref={setNodeRef} className="flex flex-col gap-2">
            {column.tasks.map(task => (
              <TaskBoardCard key={task} id={task} />
            ))}
          </div>
        </SortableContext>
      </CardContent>
    </div>
  )
}

const ColumnTitle = ({ value }: { value: string }) => {
  const colInfo = statusMap[value];
  return (
    <div className="flex items-center gap-2 text-sm text-primary/80 px-2">
        <colInfo.icon size={18}/>
        <span>{colInfo.label}</span>
    </div>
  )
}