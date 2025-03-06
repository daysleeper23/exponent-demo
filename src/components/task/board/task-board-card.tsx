import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { Card, CardContent } from '@/components/ui/card'
import { Task } from '@/types/task'
import queryClient from '@/api/query-client'


interface TaskBoardCardProps {
  id: string
}

const TaskBoardCard = ({ id }: TaskBoardCardProps) => {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, resizeObserverConfig: {} })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const task: Task = (queryClient.getQueryData(['tasks']) as Task[]).find((task: Task) => task.id === id)!;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing shadow-none hover:bg-muted/50 rounded-md pointer-events-auto flex-none relative"
    >
      <CardContent className="px-3 pt-3 pb-6 text-left whitespace-pre-wrap relative z-10 pointer-events-none">
        <div>
          <div className="text-left font-normal text-sm w-full flex-wrap">{task.title}</div>
        </div>
      </CardContent>
    </Card>
  )
};
export default TaskBoardCard;