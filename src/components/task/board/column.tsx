import { memo } from 'react';
import { useDroppable } from '@dnd-kit/react';
import { CardContent, CardHeader } from '@/components/ui/card';
import { priorityMap, statusMap } from '@/api/static/common';
import { CollisionPriority } from '@dnd-kit/abstract';
import DndCardReact from './card';
import { useVirtualization } from '../hooks/use-virtualization';

interface DndColumnReactProps {
  items: Array<string>;
  groupingType: string;
  columnId: string;
  columnHeight: number;
}

const rowSpace = 8; // Space between rows

const DndColumnReact = memo(
  ({ items, columnId, groupingType, columnHeight }: DndColumnReactProps) => {
    const { ref } = useDroppable({
      id: columnId,
      collisionPriority: CollisionPriority.Low,
    });

    //Virtualized List
    const rowCount = items.length;
    const rowHeight = 126 + rowSpace; // 126px for card height plus the gap between cards

    const {
      startIndex,
      endIndex,
      onScroll,
      getItemStyle: getBaseItemStyle,
      containerStyle,
    } = useVirtualization({
      totalItems: rowCount,
      itemHeight: rowHeight,
      containerHeight: columnHeight,
    });

    const getItemStyle = (index: number) => {
      const baseStyle = getBaseItemStyle(index);
      return {
        ...baseStyle,
        height: rowHeight - rowSpace,
      };
    };

    const renderItem = ({
      id,
      style,
      index,
    }: {
      id: string;
      style: React.CSSProperties;
      index: number;
    }) => (
      <DndCardReact
        key={id}
        column={columnId}
        style={style}
        id={id}
        index={index}
      />
    );

    const visibleItems = [];
    for (let i = startIndex; i < endIndex; i++) {
      // Add bounds checking to prevent accessing undefined indices
      if (i >= 0 && i < items.length) {
        visibleItems.push(
          renderItem({ id: items[i], style: getItemStyle(i), index: i })
        );
      }
    }

    return (
      <div className="w-[360px] flex flex-col gap-3 h-full py-0 shadow-none">
        <CardHeader className="p-2 pt-6">
          <ColumnTitle value={columnId} type={groupingType} />
        </CardHeader>
        <CardContent
          className="flex-1 overflow-y-auto p-2 pt-0"
          onScroll={onScroll}
        >
          <div
            ref={ref}
            className="flex-1 flex flex-col gap-2"
            style={containerStyle}
          >
            {visibleItems}
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
