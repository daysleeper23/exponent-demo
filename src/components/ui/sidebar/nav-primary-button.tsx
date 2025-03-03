import { SidebarMenu, SidebarMenuItem } from '../sidebar';
import { useState } from 'react';
import useMediaQuery from '@/hooks/use-media-query';
import ExpoDialog from '../expo-form/expo-dialog';
import ExpoDrawer from '../expo-form/expo-drawer';
import { Plus } from 'lucide-react';
import ExpoFormTaskCreate from '../expo-form/expo-form-task-create';

const NavPrimaryButton = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <div>
      <SidebarMenu>
        <SidebarMenuItem>
          {isDesktop ? (
            <ExpoDialog
              open={open}
              onOpenChange={setOpen}
              title="Create new task"
              description=" "
              form={<ExpoFormTaskCreate />}
            >
              <Plus />
              Create new task
            </ExpoDialog>
          ) : (
            <ExpoDrawer
              open={open}
              onOpenChange={setOpen}
              title="Create new task"
              description=" "
              form={<ExpoFormTaskCreate />}
            >
              <Plus />
              Create new task
            </ExpoDrawer>
          )}
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
};
export default NavPrimaryButton;
