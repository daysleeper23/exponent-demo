import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';

import Button from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ExpoSelect from '@/components/common/expo-select/expo-select';

import { TaskCreateSchema } from '@/types/task';
import { priorityMap, statusMap } from '@/api/static/common';
import { localUsers, localUsersMap } from '@/api/static/user';
import { useTasks } from '@/api/supabase/use-tasks';

interface ExpoFormTaskCreateProps extends React.ComponentProps<'form'> {
  setOpen: (open: boolean) => void;
}

const ExpoFormTaskCreate = ({
  className,
  setOpen,
}: ExpoFormTaskCreateProps) => {
  const form = useForm<z.infer<typeof TaskCreateSchema>>({
    resolver: zodResolver(TaskCreateSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 0,
      priority: 0,
      team: '80c322ca-e7ac-4b4e-822e-db6d1983b8e2',
      assignee: localUsers[0].id,
    },
  });

  const createTask = useTasks().addTask;

  const onSubmit = (values: z.infer<typeof TaskCreateSchema>) => {
    createTask(values);
    setOpen(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-8', className)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  data-testid="form-task-create-title"
                  placeholder="Task title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  data-testid="form-task-create-description"
                  placeholder="Task description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <ExpoSelect
                  data-testid="form-task-create-status"
                  items={statusMap}
                  value={field.value.toString()}
                  onChange={(val: string) => field.onChange(val)}
                  className="w-[180px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <ExpoSelect
                  data-testid="form-task-create-priority"
                  items={priorityMap}
                  value={field.value.toString()}
                  onChange={(val: string) => field.onChange(val)}
                  className="w-[180px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="assignee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assignee</FormLabel>
              <FormControl>
                <ExpoSelect
                  data-testid="form-task-create-assignee"
                  items={localUsersMap}
                  value={(field.value ?? '').toString()}
                  onChange={(val: string) => field.onChange(val)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          data-testid="form-task-create-submit"
          className="w-full"
          type="submit"
        >
          Create task
        </Button>
      </form>
    </Form>
  );
};
export default ExpoFormTaskCreate;
