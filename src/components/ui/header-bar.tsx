import { useTheme } from '../context/theme-provider';
import { SidebarTrigger } from './sidebar';
import { Separator } from './separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './breadcrumb';
import Button from './button';
import { Moon, Sun } from 'lucide-react';

const HeaderBar = () => {
  const { theme, changeTheme } = useTheme();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-primary-200 dark:border-primary-700">
      <div className="flex items-center gap-2 px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Exponent</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Tasks</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button
          variant="ghost"
          className="ml-auto"
          size={'icon'}
          onClick={() => {
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            changeTheme(newTheme);
          }}
        >
          {theme === 'dark' ? <Sun /> : <Moon />}
        </Button>
      </div>
    </header>
  );
};
export default HeaderBar;
