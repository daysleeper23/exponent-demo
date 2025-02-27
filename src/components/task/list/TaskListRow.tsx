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
      className="w-full px-4 py-2 flex gap-4 items-center justify-between
        border-b border-primary-200 dark:border-primary-700
        hover:bg-primary-foreground
        pointer-events-auto"
      key={task.id}>
      <div className="flex gap-4">
        <div className="w-20">{"EXP-" + task.number}</div>
        <div>{task.title}</div>
      </div>
      <div className="flex gap-4 pointer-events-auto">
        <TaskProperty value={task.status} items={statusMap}/>
        <TaskProperty value={task.priority} items={priorityMap}/>
      </div>
    </div>
  );
}
export default TaskListRow;