import { Task } from '@/types/task';
import { DragDropProvider } from '@dnd-kit/react';
import DndColumnReact from './column';
import { Suspense, useEffect, useState } from 'react';
import { move } from '@dnd-kit/helpers';
import { useColumnGrouping } from './use-column-grouping';
import DndCardReact from './card';
import TaskBoardViewHeader from '../board/task-board-view-header';
import { useUpdateTask } from '@/hooks/api/use-tasks';
import LoadingDataView from '@/components/common/loading-data-view';

const DndBoardReact = ({ tasks }: { tasks: Task[] }) => {
  const [groupBy, setGroupBy] = useState<string>('status');
  const initialColumns = useColumnGrouping(tasks, groupBy);
  const [columns, setColumns] =
    useState<Record<string, string[]>>(initialColumns);

  useEffect(() => {
    setColumns(initialColumns);
  }, [groupBy]);

  const updateTask = useUpdateTask();
  const [sourceId, setSourceId] = useState<string>('');
  const [targetId, setTargetId] = useState<string>('');

  const handleDragOver = (sourceId: string, targetId: string) => {
    const target = tasks.find((task) => task.id === targetId);
    const source = tasks.find((task) => task.id === sourceId);
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
        <TaskBoardViewHeader groupBy={groupBy} onGroupByChange={setGroupBy} />
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
