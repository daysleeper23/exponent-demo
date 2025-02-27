import { getTasks } from "@/api/task";
import { Task } from "@/types/task";
import TaskListRow from "./TaskListRow";

const TaskListView = () => {
  const tasks: Task[] = getTasks(100);
  return (
    <div className="text-sm overflow-y-auto relative">
      {tasks.map((task) => (
        <TaskListRow task={task} />
      ))}
    </div>
  );
}
export default TaskListView;
