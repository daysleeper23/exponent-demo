import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link } from 'react-router';
import { NavMainItem } from './app-sidebar';

export function NavMain({
  items,
  setActiveItem,
}: {
  items: NavMainItem[];
  setActiveItem: (items: NavMainItem[]) => void;
}) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={item.isActive}
            onClick={() =>
              setActiveItem(
                items.map((i) => ({ ...i, isActive: i.title === item.title }))
              )
            }
          >
            <Link to={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
