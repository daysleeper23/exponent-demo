import { memo } from 'react';
import { groupByOptions } from '@/api/static/common';
import ExpoCombobox from '@/components/common/expo-combo/expo-combo';

export interface TaskBoardViewHeaderProps {
  groupBy: string;
  onGroupByChange: (value: string) => void;
}

const DndBoardHeader = memo(
  ({ groupBy, onGroupByChange }: TaskBoardViewHeaderProps) => {
    return (
      <div
        className="w-full px-4 py-2 flex gap-4 items-center
        border-b border-primary-200 dark:border-primary-700
        bg-accent
        pointer-events-auto"
        data-testid="task-board-view-header"
      >
        <div className="ml-auto flex gap-4 items-center pointer-events-auto">
          <span className="text-sm text-primary/80">Group by</span>
          <ExpoCombobox
            className="w-32"
            items={groupByOptions}
            value={groupBy}
            onChange={onGroupByChange}
            searchable={false}
          />
        </div>
      </div>
    );
  }
);
export default DndBoardHeader;
