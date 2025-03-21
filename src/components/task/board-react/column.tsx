import { memo } from 'react';
import { useDroppable } from '@dnd-kit/react';
import { CardContent, CardHeader } from '@/components/ui/card';
import { priorityMap, statusMap } from '@/api/api-common';
import { CollisionPriority } from '@dnd-kit/abstract';

interface DndColumnReactProps {
  children?: React.ReactNode;
  groupingType: string;
  id: string;
}

const DndColumnReact = memo(
  ({ children, id, groupingType }: DndColumnReactProps) => {
    const { ref } = useDroppable({
      id,
      collisionPriority: CollisionPriority.Low,
    });

    return (
      <div className="w-[360px] flex flex-col gap-3 h-full py-0 shadow-none">
        <CardHeader className="p-2 pt-6">
          <ColumnTitle value={id} type={groupingType} />
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-2 pt-0">
          <div ref={ref} className="flex flex-col gap-2">
            {children}
          </div>
        </CardContent>
      </div>
    );
  }
);
export default DndColumnReact;

const ColumnTitle = memo(({ value, type }: { value: string; type: string }) => {
  const colInfo = type === 'status' ? statusMap[value] : priorityMap[value];
  return (
    <div className="flex items-center gap-2 text-sm text-primary/80 px-2">
      {colInfo.icon}
      <span>{colInfo.label}</span>
    </div>
  );
});
