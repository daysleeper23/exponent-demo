import Button from '@/components/ui/button';
import useTaskStore from '@/store/task';
import { Task } from '@/types/task';
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';


const TaskListViewHeader = () => {
  const setSortOptions = useTaskStore((state) => state.setSortOption);
  const sortOption = useTaskStore((state) => state.sortOption);

  const handleSortClick = (newKey: keyof Task) => {
    const { key, direction } = sortOption;
    // if the same column is clicked again, toggle the direction
    if (key === newKey) {
      setSortOptions(newKey, -1 * direction as 1 | -1);
    } else {
      // changing columns, reset to ascending
      setSortOptions(newKey, 1);
    }
  };

  const getSortIcon = (checkingKey: string) => {
    const { key, direction } = sortOption;
    if (key === checkingKey) {
      return direction === 1 ? <ArrowUp /> : <ArrowDown />;
    }
    return <ChevronsUpDown />;
  };

  return (
    <div
      className="w-full px-4 py-2 flex gap-4 items-center
        border-b border-primary-200 dark:border-primary-700
        bg-primary-foreground
        pointer-events-auto"
      data-testid="task-list-view-header"
    >
      {/* number */}
      <Button
        variant="ghost"
        size="sm"
        className="-ml-4 w-20"
        onClick={() => handleSortClick('number')}
        data-testid="task-list-view-header-number"
      >
        {'Task'}
        {getSortIcon('number')}
      </Button>

      {/* title */}
      <Button
        variant="ghost"
        size="sm"
        className="w-20"
        onClick={() => handleSortClick('title')}
        data-testid="task-list-view-header-title"
      >
        {'Title'}
        {getSortIcon('title')}
      </Button>

      <div className="hidden sm:ml-auto sm:flex sm:gap-4 sm:pointer-events-auto">
        {/* status */}
        <div className="w-[152px]">
          <Button
            variant="ghost"
            className="w-20"
            onClick={() => handleSortClick('status')}
            data-testid="task-list-view-header-status"
          >
            {'Status'}
            {getSortIcon('status')}
          </Button>
        </div>

        {/* priority */}
        <div className="w-[144px]">
          <Button
            variant="ghost"
            className="w-20"
            onClick={() => handleSortClick('priority')}
            data-testid="task-list-view-header-priority"
          >
            {'Priority'}
            {getSortIcon('priority')}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default TaskListViewHeader;
