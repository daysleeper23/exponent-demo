import React from 'react';
import TaskListRow from './task-list-row';
import { SyntheticEvent, useRef, useState } from 'react';
import TaskListViewHeader from './task-list-view-header';
import useTaskStore from '@/store/task';

interface TaskListViewProps {
  viewHeight: number;
}

const TaskListView = React.memo(
  ({ viewHeight }: TaskListViewProps) => {
    const sortedList = useTaskStore((state) => state.sortedList);

    //Virtualized List
    const rowCount = sortedList.length;
    const rowHeight = 45;

    //overScan is the number of items to render above and below the visible area
    //overScan ~ half of the number of items that fit in the viewport, but not more than 5
    const overScan = Math.min(Math.floor(viewHeight / rowHeight / 2), 5);

    const [scrollTop, setScrollTop] = useState(0);
    const containerRef = useRef(null);

    //index of the first visible item
    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / rowHeight) - overScan
    );

    //number of items that fit in the viewport plus overscan
    const visibleCount = Math.ceil(viewHeight / rowHeight) + overScan * 2;

    // the endIndex must not go past the end of the list
    const endIndex = Math.min(rowCount, startIndex + visibleCount);

    const renderItem = ({
      id,
      style,
    }: {
      id: string;
      style: React.CSSProperties;
    }) => <TaskListRow key={id} style={style} id={id} />;

    /*
    This function is called whenever the user scrolls the list.
    It checks if the user is scrolling up or down and updates the scrollTop state accordingly.

    To reduce the number of re-render,
    instead of updating the scrollTop state on every scroll event, only update it when the user scrolls past the overscan limit.
    - overScan = 5, rowCount = 1000
      without checking: 488 re-renders 
      with checking:  ~200 re-renders
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
    const getItemStyle = React.useCallback(
      (index: number): React.CSSProperties => ({
        position: 'absolute',
        top: index * rowHeight,
        height: rowHeight,
        width: '100%',
      }),
      [rowHeight]
    );

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
            style={{ height: rowCount * rowHeight, position: 'relative' }}
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
