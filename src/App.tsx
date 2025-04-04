import { lazy, Suspense, useLayoutEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/sidebar/app-sidebar';

import TaskListView from '@/components/task/list/task-list-view';
import taskApi from './hooks/api/use-tasks';
// import taskApi from './hooks/api/use-tasks-supabase';
import HeaderBar from './components/ui/header-bar';
import PendingBoundary from './components/common/pending-boundary';
import LoadingDataView from './components/common/loading-data-view';

const DndBoardReact = lazy(() => import('@/components/task/board-react'));
const TaskTimelineView = lazy(
  () => import('@/components/task/timeline/task-timeline-view')
);

const TaskAnalyticsView = lazy(
  () => import('@/components/task/analytics/task-analytics-view')
);

const App = () => {
  const { data: tasks, isPending, isError, error } = taskApi.useTasks();

  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useLayoutEffect(() => {
    if (contentRef.current !== null) {
      setContentHeight(contentRef.current.getBoundingClientRect().height);
    }
  }, [tasks]);

  if (isError) {
    throw new Error(error?.message ?? 'Unknown error');
  }

  return (
    <div className="flex h-screen w-screen">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex flex-col h-full">
          <HeaderBar />
          <div
            ref={contentRef}
            className="flex flex-1 flex-col overflow-hidden relative"
          >
            <Suspense fallback={<LoadingDataView message="Loading tasks..." />}>
              <PendingBoundary isPending={isPending}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <TaskListView
                        tasks={tasks || []}
                        viewHeight={contentHeight}
                      />
                    }
                  />
                  <Route
                    path="/board"
                    element={<DndBoardReact tasks={tasks || []} />}
                  />
                  <Route path="/analytics" element={<TaskAnalyticsView />} />
                  <Route path="/timeline" element={<TaskTimelineView />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </PendingBoundary>
            </Suspense>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};
export default App;
