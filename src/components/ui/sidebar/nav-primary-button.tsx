import { Plus } from 'lucide-react';
import { SidebarMenu, SidebarMenuItem } from '../sidebar';
import Button from '../button/button';

export interface NavPrimaryButtonProps {}
const NavPrimaryButton = () => {
  return (
    <div>
      <SidebarMenu>
        <SidebarMenuItem>
          <Button variant="default" className="w-full">
            <Plus />
            Create new task
          </Button>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
};
export default NavPrimaryButton;
