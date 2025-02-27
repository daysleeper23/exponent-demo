import { lazy, Suspense, useState } from 'react';
import { Route, Routes } from 'react-router';
import TaskListView from './components/task/list/TaskListView';
import { SidebarInset, SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { AppSidebar } from './components/ui/sidebar/app-sidebar';
import { Separator } from './components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './components/ui/breadcrumb';
import Button from './components/ui/button/button';
import { useTheme } from "@/components/context/ThemeProvider";
import { Moon, Sun } from 'lucide-react';

const TaskBoardView = lazy(() => import('@/components/task/board/TaskBoardView'));
const TaskTimelineView = lazy(() => import('@/components/task/timeline/TaskTimelineView'));

const App = () => {

  const { changeTheme } = useTheme()
  const [darkMode, setDarkMode] = useState(false)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
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
        <div className="flex flex-1 flex-col">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<TaskListView />} />
              <Route path="/board" element={<TaskBoardView />} />
              <Route path="/timeline" element={<TaskTimelineView />} />
            </Routes>
          </Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default App;
