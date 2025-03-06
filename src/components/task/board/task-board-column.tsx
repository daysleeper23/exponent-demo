import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import TaskBoardCard from './task-board-card'
import { Column } from './task-board-view'
import { ScrollArea } from '@/components/ui/scroll-area'

interface TaskBoardColumnProps {
  column: Column
}

export function TaskBoardColumn({ column }: TaskBoardColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  })

  return (
    <Card className="w-[320px] h-full flex flex-col shadow-none bg-muted/40 border border-muted/70 ">
      <CardHeader className='p-3'>
        <ColumnTitle value={column.id} />
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-3">
        <ScrollArea>
          <SortableContext id={column.id} items={column.tasks} strategy={verticalListSortingStrategy}>
            <div ref={setNodeRef} className="flex flex-col gap-2">
              {column.tasks.map(task => (
                <TaskBoardCard key={task} id={task} />
              ))}
            </div>
          </SortableContext>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

const ColumnTitle = ({ value }: { value: string }) => {

  return (
    <div className="flex gap-2 h-6 text-sm font-normal items-center overflow-hidden truncate">
        {/* {meta?.icon} */}
        {/* {meta?.label} */}
        {value}
    </div>
  )
}