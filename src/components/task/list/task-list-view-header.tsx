import Button from '@/components/ui/button';
import useColumnSorting from '@/hooks/use-column-sorting';

interface TaskListViewHeaderProps {
  sortOptions: ReturnType<typeof useColumnSorting>['sortOptions'];
  handleSortClick: ReturnType<typeof useColumnSorting>['handleSortClick'];
  getSortIcon: ReturnType<typeof useColumnSorting>['getSortIcon'];
}

const TaskListViewHeader = ({
  sortOptions,
  getSortIcon,
  handleSortClick,
}: TaskListViewHeaderProps) => {
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
        onClick={() => handleSortClick(0)}
        data-testid="task-list-view-header-number"
      >
        {sortOptions[0].label}
        {getSortIcon(0)}
      </Button>

      {/* title */}
      <Button
        variant="ghost"
        size="sm"
        className="w-20"
        onClick={() => handleSortClick(1)}
        data-testid="task-list-view-header-title"
      >
        {sortOptions[1].label}
        {getSortIcon(1)}
      </Button>

      <div className="hidden sm:ml-auto sm:flex sm:gap-4 sm:pointer-events-auto">
        {/* status */}
        <div className="w-[152px]">
          <Button
            variant="ghost"
            className="w-20"
            onClick={() => handleSortClick(2)}
            data-testid="task-list-view-header-status"
          >
            {sortOptions[2].label}
            {getSortIcon(2)}
          </Button>
        </div>

        {/* priority */}
        <div className="w-[144px]">
          <Button
            variant="ghost"
            className="w-20"
            onClick={() => handleSortClick(3)}
            data-testid="task-list-view-header-priority"
          >
            {sortOptions[3].label}
            {getSortIcon(3)}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default TaskListViewHeader;
