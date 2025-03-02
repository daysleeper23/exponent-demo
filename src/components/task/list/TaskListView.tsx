import { Task } from "@/types/task";
import TaskListRow from "./TaskListRow";
import { SyntheticEvent, useRef, useState } from "react";
import Button from "@/components/ui/button/button";
import { ChevronsUpDown } from "lucide-react";

interface TaskListViewProps {
  tasks: Task[];
  viewHeight: number;
}

const TaskListView = ({ tasks, viewHeight }: TaskListViewProps) => {



  //Virtualized List
  const rowCount = tasks.length;
  const rowHeight = 45;

  //overScan is the number of items to render above and below the visible area
  //overScan ~ half of the number of items that fit in the viewport, but not more than 5
  const overScan = Math.min(Math.floor((viewHeight / rowHeight) / 2), 5);
  
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  //index of the first visible item
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overScan);

  //number of items that fit in the viewport plus overscan
  const visibleCount = Math.ceil(viewHeight / rowHeight) + overScan * 2;

  // the endIndex must not go past the end of the list
  const endIndex = Math.min(rowCount, startIndex + visibleCount);

  const renderItem = ({ task, style }: { task: Task; style: React.CSSProperties }) => (
    <TaskListRow key={task.id} style={style} task={task} />
  );

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
      if (event.currentTarget.scrollTop >= scrollTop + (overScan - 1) * rowHeight) {
        setScrollTop(event.currentTarget.scrollTop);
      }
    } else {
      //scrolling up
      if (event.currentTarget.scrollTop <= scrollTop - (overScan - 1) * rowHeight) {
        setScrollTop(event.currentTarget.scrollTop);
      }
    }
  };

  const visibleItems = [];
  for (let i = startIndex; i < endIndex; i++) {
    const style = {
      position: 'absolute',
      top: i * rowHeight,
      height: rowHeight,
      width: '100%',
    };
    visibleItems.push(renderItem({ task: tasks[i], style: style as React.CSSProperties }));
  }

  return (
    <>
      <div
        className="w-full px-4 py-2 flex gap-4 items-center
          border-b border-primary-200 dark:border-primary-700
          bg-primary-foreground
          pointer-events-auto"
      >
        <Button variant="ghost" size="sm" className="-ml-4 w-20">
          Task
          <ChevronsUpDown />
        </Button>
        <Button variant="ghost" className="w-20">
          Title
          <ChevronsUpDown />
        </Button>

        <div className="hidden sm:ml-auto sm:flex sm:gap-4 sm:pointer-events-auto">
          <div className="w-[120px]">
            <Button variant="ghost" className="w-20">
              Status
              <ChevronsUpDown />
            </Button>
          </div>
          <div className="w-[120px]">
            <Button variant="ghost" className="w-20">
              Priority
              <ChevronsUpDown />
            </Button>
          </div>
        </div>
      </div>
      <div 
        className="text-sm overflow-y-auto relative"
        ref={containerRef}
        onScroll={onScroll}
      >
        <div style={{ height: rowCount * rowHeight, position: 'relative' }}>
          {visibleItems}
        </div>
      </div>
    </>
    
  );
}
export default TaskListView;
