import { lazy, Suspense, useLayoutEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router';
import { Moon, Sun } from 'lucide-react';

import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/sidebar/app-sidebar';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Button from '@/components/ui/button/button';
import { useTheme } from "@/components/context/ThemeProvider";

import TaskListView from '@/components/task/list/TaskListView';

import { useTasks } from './hooks/api/use-tasks';

const TaskBoardView = lazy(() => import('@/components/task/board/TaskBoardView'));
const TaskTimelineView = lazy(() => import('@/components/task/timeline/TaskTimelineView'));

const App = () => {

  // const taskCount = 1000;
  // const tasks: Task[] = getTasks(taskCount);
  const { data: tasks, isPending, isError, error } = useTasks();

  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useLayoutEffect(() => {
    if (contentRef.current !== null) {
      setContentHeight(contentRef.current.getBoundingClientRect().height);
    }
  }, [tasks]);

  if (isPending) {
    return <div>Loading tasks...</div>;
  }

  if (isError) {
    // console.log('tasks', tasks);
    return <div>Error: {error?.message ?? "Unknown error"}</div>;
  }

  return (
    <div className="flex h-screen w-screen">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex flex-col h-full">
          <HeaderBar />
          <div ref={contentRef} className="flex flex-1 flex-col overflow-hidden relative">
            <Suspense fallback={<div>Loading...</div>}>
              {/* <PendingBoundary isPending={isPending}> */}
                <Routes>
                  <Route path="/" element={<TaskListView tasks={tasks} viewHeight={contentHeight} />} />
                  <Route path="/board" element={<TaskBoardView />} />
                  <Route path="/timeline" element={<TaskTimelineView />} />
                </Routes>
              {/* </PendingBoundary> */}
            </Suspense>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
export default App;

const HeaderBar = () => {
  const { changeTheme } = useTheme()
  const [darkMode, setDarkMode] = useState(false)

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-primary-200 dark:border-primary-700">
      <div className="flex items-center gap-2 px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">
                Exponent
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Tasks</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button
          variant="ghost" className="ml-auto"
          size={"icon"}
          onClick={() => {
            const theme = darkMode === true ? "light" : "dark";
            setDarkMode(!darkMode);
            changeTheme(theme);
          }}
        >
          {
            darkMode ? <Sun /> : <Moon />
          }
        </Button>
      </div>
    </header>
  )
}

const PendingBoundary = ({ isPending, children }: {
  isPending: boolean;
  children: React.ReactNode;
}) => {
  if (isPending) {
    // Throw an unresolved Promise to trigger Suspense
    throw new Promise(() => {});
  }
  return <>{children}</>;
}
