import { Suspense, useState } from 'react';
import { DragDropProvider } from '@dnd-kit/react';

import DndBoardHeader from './header';
import DndCardReact from './card';
import DndColumnReact from './column';
import LoadingDataView from '@/components/common/loading-data-view';

// import { useColumnGrouping } from './use-column-grouping';
import { useTasks } from '@/api/supabase/use-tasks';
import useTaskStore from '@/store/task';

const DndBoardReact = ({ groupKey = 'status' }: { groupKey: string }) => {
  const { tasks, tasksGrouped, setGroupOption } = useTaskStore();
  console.log('object', tasksGrouped);

  const { updateTask } = useTasks();
  const [sourceId, setSourceId] = useState<string>('');
  const [targetId, setTargetId] = useState<string>('');

  const handleDragOver = (sourceId: string, targetId: string) => {
    const target = tasks[targetId];
    const source = tasks[sourceId];
    if (target && source) {
      if (groupKey === 'priority' && target.priority !== source.priority) {
        const updatedTask = { ...source, priority: target.priority };
        updateTask(updatedTask);
      }

      if (groupKey === 'status' && target.status !== source.status) {
        const updatedTask = { ...source, status: target.status };
        updateTask(updatedTask);
      }
    }
  };

  const setGroupBy = (value: string) => {
    setGroupOption(value);
  };

  return (
    <Suspense fallback={<LoadingDataView message="Loading tasks..." />}>
      <div
        className="relative overflow-hidden flex-1 flex flex-col"
        data-testid="task-board-view"
      >
        <DndBoardHeader groupBy={groupKey} onGroupByChange={setGroupBy} />
        <div className="flex-1 flex w-full h-full overflow-x-auto">
          <DragDropProvider
            onDragStart={(event) => {
              const { operation } = event;
              setSourceId((operation.source?.id || '').toString());
            }}
            onDragOver={(event) => {
              const { operation } = event;
              setTargetId((prev) =>
                sourceId === (operation.target?.id || '').toString()
                  ? prev
                  : (operation.target?.id || '').toString()
              );
            }}
            onDragEnd={() => {
              handleDragOver(sourceId, targetId);
            }}
          >
            <div className="flex-1 flex px-2">
              {Object.entries(tasksGrouped).map(([column, items]) => (
                <DndColumnReact
                  key={column}
                  id={column}
                  groupingType={groupKey}
                >
                  {items.map((id: string, index: number) => (
                    <DndCardReact
                      key={id}
                      id={id}
                      column={column}
                      index={index}
                    />
                  ))}
                </DndColumnReact>
              ))}
            </div>
          </DragDropProvider>
        </div>
      </div>
    </Suspense>
  );
};
export default DndBoardReact;
