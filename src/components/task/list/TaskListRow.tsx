import { Task } from "@/types/task";
import { ArrowDown, ArrowRight, ArrowUp, Circle, CircleCheckBig, CircleHelp, CircleOff, LucideIcon, Minus, OctagonAlert, Timer } from "lucide-react";
import TaskProperty from "./TaskProperty";

interface TaskListRowProps {
  task: Task;
}

export interface TaskPropertyMap {
  [key: string]: {
    label: string;
    icon: LucideIcon;
  };
}

const TaskListRow = ({ task }: TaskListRowProps) => {
  const statusMap: TaskPropertyMap = {
    '0': {
      label: "Backlog",
      icon: CircleHelp
    },
    '1': {
      label: "Todo",
      icon: Circle
    },
    '2': {
      label: "In Progress",
      icon: Timer
    },
    '3': {
      label: "Done",
      icon: CircleCheckBig
    },
    '4': {
      label: "Canceled",
      icon: CircleOff
    }
  };

  const priorityMap: TaskPropertyMap = {
    '0': {
      label: "No priority",
      icon: Minus
    },
    '1': {
      label: "Low",
      icon: ArrowDown
    },
    '2': {
      label: "Medium",
      icon: ArrowRight
    },
    '3': {
      label: "High",
      icon: ArrowUp
    },
    '4': {
      label: "Urgent",
      icon: OctagonAlert
    }
  };

  return (
    <div 
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

