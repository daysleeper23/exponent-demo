import { Suspense, useEffect, useState } from 'react';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';

import DndBoardHeader from './header';
import DndCardReact from './card';
import DndColumnReact from './column';
import LoadingDataView from '@/components/common/loading-data-view';

// import { useColumnGrouping } from './use-column-grouping';
import { useTasks } from '@/api/supabase/use-tasks';
import useTaskStore from '@/store/task';

const DndBoardReact = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const [groupBy, setGroupBy] = useState<string>('status');
  const initialColumns = useTaskStore((state) => state.tasksGrouped);
  const [columns, setColumns] =
    useState<Record<string, string[]>>(initialColumns);
  console.log('columns', columns);

  useEffect(() => {
    setColumns(initialColumns);
  }, [groupBy]);

  const { updateTask } = useTasks();
  const [sourceId, setSourceId] = useState<string>('');
  const [targetId, setTargetId] = useState<string>('');

  const handleDragOver = (sourceId: string, targetId: string) => {
    const target = tasks[targetId];
    const source = tasks[sourceId];
    if (target && source) {
      if (groupBy === 'priority' && target.priority !== source.priority) {
        const updatedTask = { ...source, priority: target.priority };
        updateTask(updatedTask);
      }

      if (groupBy === 'status' && target.status !== source.status) {
        const updatedTask = { ...source, status: target.status };
        updateTask(updatedTask);
      }
    }
  };

  return (
    <Suspense fallback={<LoadingDataView message="Loading tasks..." />}>
      <div
        className="relative overflow-hidden flex-1 flex flex-col"
        data-testid="task-board-view"
      >
        <DndBoardHeader groupBy={groupBy} onGroupByChange={setGroupBy} />
        <div className="flex-1 flex w-full h-full overflow-x-auto">
          <DragDropProvider
            onDragStart={(event) => {
              const { operation } = event;
              setSourceId((operation.source?.id || '').toString());
            }}
            onDragOver={(event) => {
              const { operation } = event;
              setColumns((columns) => move(columns, event));
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
              {Object.entries(columns).map(([column, items]) => (
                <DndColumnReact key={column} id={column} groupingType={groupBy}>
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
