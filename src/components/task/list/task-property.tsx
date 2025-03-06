import { TaskPropertyMap } from '@/api/api-common';

interface TaskPropertyProps {
  value: number;
  items: TaskPropertyMap;
}

const TaskProperty = ({ value, items }: TaskPropertyProps) => {
  const prop = items[value.toString()];

  return (
    <div className="flex gap-1 w-[120px] items-center px-2 py-1 hover:bg-primary/5 rounded-md pointer-events-auto">
      {prop.icon && (
        <prop.icon className="mr-2 h-4 w-4 text-muted-foreground" />
      )}
      <span>{prop.label}</span>
    </div>
  );
};
export default TaskProperty;
