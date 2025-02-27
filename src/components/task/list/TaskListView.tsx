import { getTasks } from "@/api/task";
import { Task } from "@/types/task";
import TaskListRow from "./TaskListRow";

const TaskListView = () => {
  const tasks: Task[] = getTasks(10);
  return (
    <div className="text-sm">
      {tasks.map((task) => (
        <TaskListRow task={task} />
      ))}
    </div>
  );
}
export default TaskListView;
