import { memo } from 'react';
import { useSortable } from '@dnd-kit/react/sortable';
import { Task } from '@/types/task';
import queryClient from '@/api/reactQuery';
import { cn } from '@/lib/utils';
import { priorityMap, statusMap } from '@/api/static/common';
import ExpoSelect from '@/components/ui/expo-select/expo-select';
import { useTasks } from '@/api/supabase/use-tasks';

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

  const task: Task = (queryClient.getQueryData(['tasks']) as Task[]).find(
    (task: Task) => task.id === id
  )!;

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
        'flex flex-col gap-3 rounded-md border p-3 bg-primary-foreground hover:bg-muted',
        { dragging: sortable.isDragging }
      )}
    >
      <div className="text-left font-normal text-xs inline-flex flex-wrap p-1 px-2 w-fit rounded-lg bg-secondary-foreground/10 text-primary/60">
        EXP-{task.number}
      </div>

      <div className="text-left font-normal text-xs w-full flex-wrap">
        {task.title}
      </div>

      <div className="flex gap-2 pointer-events-auto">
        <ExpoSelect
          className="w-[152px]"
          items={statusMap}
          value={task.status.toString()}
          onChange={handleUpdateStatus}
        />
        <ExpoSelect
          className="w-[144px]"
          items={priorityMap}
          value={task.priority.toString()}
          onChange={handleUpdatePriority}
        />
        {/* <div className="flex items-center gap-2 text-xs text-primary/80 px-2 py-1 border rounded-md">
          {statusMap[task.status.toString()].icon}
          {statusMap[task.status.toString()].label}
        </div>

        <div className="flex items-center gap-2 text-xs text-primary/80 px-2 py-1 border rounded-md">
          {priorityMap[task.priority.toString()].icon}
          {priorityMap[task.priority.toString()].label}
        </div> */}

        {/* <ComboBox
          className="w-[144px]"
          items={statusMap}
          value={task.status.toString()}
          onChange={handleUpdatePriority}
        />
        <ComboBox
          className="w-[144px]"
          items={priorityMap}
          value={task.priority.toString()}
          onChange={handleUpdatePriority}
        /> */}
      </div>
    </div>
  );
});
export default DndCardReact;

// const ComboBox = ({ items, value, onChange, className, ...props }: {
//     items: TaskPropertyMap;
//     value: string;
//     onChange: (value: string) => void;
//     className?: string;
//   }) => {
//   return (
//     <Select onValueChange={onChange} value={value}>
//         <SelectTrigger className={className || ''} {...props}>
//           <SelectValue
//             placeholder={
//               <div className="flex items-center gap-2">
//                 {items[value].icon}
//                 {items[value].label}
//               </div>
//             }
//           />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             {Object.values(items).map((item) => (
//               <SelectItem key={item.value} value={item.value.toString()}>
//                 {item.icon}
//                 {item.label}
//               </SelectItem>
//             ))}
//           </SelectGroup>
//         </SelectContent>
//       </Select>
//   )
// }
