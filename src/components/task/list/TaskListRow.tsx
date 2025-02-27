import { Task } from "@/types/task";
import TaskProperty from "./TaskProperty";
import { priorityMap, statusMap } from "@/api/common";

interface TaskListRowProps {
  task: Task;
  style?: React.CSSProperties;
}

const TaskListRow = ({ task, style }: TaskListRowProps) => {

  return (
    <div
      data-testid={task.id}
      style={style}
      className="w-full px-4 py-2 flex gap-4 items-center
        border-b border-primary-200 dark:border-primary-700
        hover:bg-primary-foreground
        pointer-events-auto"
      key={task.id}>
      
      <span className="w-20">{"EXP-" + task.number}</span>
      <span className="flex-1 overflow-hidden text-nowrap">{task.title}</span>

      <div className="hidden sm:ml-auto sm:flex sm:gap-4 sm:pointer-events-auto">
        <TaskProperty value={task.status} items={statusMap}/>
        <TaskProperty value={task.priority} items={priorityMap}/>
      </div>
    </div>
  );
}
export default TaskListRow;