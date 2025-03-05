import { Task } from '@/types/task';
import { priorityMap, statusMap } from '@/api/common';
import ExpoSelect from '@/components/ui/expo-select/expo-select';
import { useUpdateTask } from '@/hooks/api/use-tasks';


interface TaskListRowProps {
  task: Task;
  style?: React.CSSProperties;
}

const TaskListRow = ({ task, style }: TaskListRowProps) => {
  const updateTask = useUpdateTask();
  
  const handleUpdatePriority = (value: string) => {
    task.priority = parseInt(value);
    updateTask(task);
  };

  const handleUpdateStatus = (value: string) => {
    task.status = parseInt(value);
    updateTask(task);
  };

  return (
    <div
      style={style}
      className="w-full px-4 py-2 flex gap-4 items-center
        text-primary/80
        border-b border-primary-200 dark:border-primary-700
        hover:bg-primary-foreground
        pointer-events-auto"
      key={task.id}
      data-testid="task-list-row"
    >
      <span className="w-20">{'EXP-' + task.number}</span>
      <span className="flex-1 overflow-hidden text-nowrap">{task.title}</span>

      <div className="hidden sm:ml-auto sm:flex sm:gap-4 sm:pointer-events-auto">
        <ExpoSelect
          className="w-[152px]"
          items={Object.values(statusMap)}
          value={task.status.toString()}
          onChange={handleUpdateStatus}
        />

        <ExpoSelect
          className="w-[144px]"
          items={Object.values(priorityMap)}
          value={task.priority.toString()}
          onChange={handleUpdatePriority}
        />
      </div>
    </div>
  );
};
export default TaskListRow;
