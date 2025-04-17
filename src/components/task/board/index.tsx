import {
  memo,
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';

import DndBoardHeader from './header';
import DndColumnReact from './column';
import LoadingDataView from '@/components/common/loading-data-view';

import { useTasks } from '@/api/supabase/use-tasks';
import useTaskStore from '@/store/task';
import { useColumnGrouping } from '../hooks/use-column-grouping';

const DndBoardReact = memo(({ groupKey = 'status' }: { groupKey: string }) => {
  const { tasks, tasksArray, setGroupOption } = useTaskStore();
  const groupedTask = useColumnGrouping(tasksArray, groupKey);
  const [columns, setColumns] = useState(groupedTask);
  const [columnHeight, setColumnHeight] = useState(0);
  const dndColumnRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (
      dndColumnRef.current !== null &&
      dndColumnRef.current.getBoundingClientRect().height !== columnHeight
    ) {
      setColumnHeight(
        dndColumnRef.current.getBoundingClientRect().height - 49 - 52
      );
    }
  }, [tasks?.length]);

  useEffect(() => {
    setColumns(groupedTask);
  }, [tasksArray, groupKey]);

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
            <div ref={dndColumnRef} className="flex-1 flex gap-2 px-2">
              {Object.entries(columns).map(([column, items]) => (
                // <div ref={dndColumnRef} className="flex-1 flex">
                <DndColumnReact
                  key={column}
                  columnId={column}
                  groupingType={groupKey}
                  columnHeight={columnHeight}
                  items={items}
                />
                // </div>
              ))}
            </div>
          </DragDropProvider>
        </div>
      </div>
    </Suspense>
  );
});
export default DndBoardReact;
