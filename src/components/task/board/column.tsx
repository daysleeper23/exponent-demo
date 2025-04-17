import { memo, SyntheticEvent, useCallback, useState } from 'react';
import { useDroppable } from '@dnd-kit/react';
import { CardContent, CardHeader } from '@/components/ui/card';
import { priorityMap, statusMap } from '@/api/static/common';
import { CollisionPriority } from '@dnd-kit/abstract';
import DndCardReact from './card';

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

    //overScan is the number of items to render above and below the visible area
    //overScan ~ half of the number of items that fit in the viewport, but not more than 5
    const overScan = Math.min(Math.floor(columnHeight / rowHeight / 2), 5);

    const [scrollTop, setScrollTop] = useState(0);

    //index of the first visible item
    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / rowHeight) - overScan
    );

    //number of items that fit in the viewport plus overscan
    const visibleCount = Math.ceil(columnHeight / rowHeight) + overScan * 2;

    // the endIndex must not go past the end of the list
    const endIndex = Math.min(rowCount, startIndex + visibleCount);

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

    /*
    This function is called whenever the user scrolls the list.
    It checks if the user is scrolling up or down and updates the scrollTop state accordingly.

    To reduce the number of re-render,
    instead of updating the scrollTop state on every scroll event, only update it when the user scrolls past the overscan limit.
  */
    const onScroll = (event: SyntheticEvent) => {
      const currentScrollTop = event.currentTarget.scrollTop;
      if (currentScrollTop >= scrollTop) {
        //scrolling down
        if (
          event.currentTarget.scrollTop >=
          scrollTop + (overScan - 1) * rowHeight
        ) {
          setScrollTop(event.currentTarget.scrollTop);
        }
      } else {
        //scrolling up
        if (
          event.currentTarget.scrollTop <=
          scrollTop - (overScan - 1) * rowHeight
        ) {
          setScrollTop(event.currentTarget.scrollTop);
        }
      }
    };

    // Memoize the style creation function to prevent unnecessary object creation on each render
    const getItemStyle = useCallback(
      (index: number): React.CSSProperties => ({
        position: 'absolute',
        top: index * rowHeight,
        height: rowHeight - rowSpace,
        width: '100%',
      }),
      [rowHeight]
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
            style={{
              height: rowCount * rowHeight,
              position: 'relative',
            }}
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
