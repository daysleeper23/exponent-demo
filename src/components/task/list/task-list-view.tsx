import React, { useRef } from 'react';
import TaskListRow from './task-list-row';
import TaskListViewHeader from './task-list-view-header';
import useTaskStore from '@/store/task';
import { useVirtualization } from '../hooks/use-virtualization';

interface TaskListViewProps {
  viewHeight: number;
}

const TaskListView = React.memo(
  ({ viewHeight }: TaskListViewProps) => {
    const containerRef = useRef(null);
    const sortedList = useTaskStore((state) => state.sortedList);

    //Virtualized List
    const rowCount = sortedList.length;
    const rowHeight = 45;

    const { startIndex, endIndex, onScroll, getItemStyle, containerStyle } =
      useVirtualization({
        totalItems: rowCount,
        itemHeight: rowHeight,
        containerHeight: viewHeight,
      });

    const renderItem = ({
      id,
      style,
    }: {
      id: string;
      style: React.CSSProperties;
    }) => <TaskListRow key={id} style={style} id={id} />;

    const visibleItems = [];
    for (let i = startIndex; i < endIndex; i++) {
      // Add bounds checking to prevent accessing undefined indices
      if (i >= 0 && i < sortedList.length) {
        visibleItems.push(
          renderItem({ id: sortedList[i], style: getItemStyle(i) })
        );
      }
    }

    // Handle empty state
    if (rowCount === 0) {
      return (
        <>
          <TaskListViewHeader />
          <div className="flex items-center justify-center h-32 text-gray-500">
            No tasks available
          </div>
        </>
      );
    }

    return (
      <>
        <TaskListViewHeader />
        <div
          data-testid="task-list-view"
          className="text-sm overflow-y-auto relative"
          ref={containerRef}
          onScroll={onScroll}
          role="list"
          tabIndex={0}
        >
          <div
            data-testid="task-list-view-full"
            style={containerStyle}
            aria-rowcount={rowCount}
          >
            {visibleItems}
          </div>
        </div>
      </>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.viewHeight === nextProps.viewHeight;
  }
);

TaskListView.whyDidYouRender = true;

export default TaskListView;
