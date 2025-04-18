import { SidebarMenu, SidebarMenuItem } from '../sidebar';
import { useState } from 'react';
import useMediaQuery from '@/hooks/use-media-query';
import ExpoDialog from '../../common/expo-form/expo-dialog';
import ExpoDrawer from '../../common/expo-form/expo-drawer';
import { Plus } from 'lucide-react';
import ExpoFormTaskCreate from '../../task/form/expo-form-task-create';

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
              form={<ExpoFormTaskCreate setOpen={setOpen} />}
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
              form={<ExpoFormTaskCreate setOpen={setOpen} />}
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
