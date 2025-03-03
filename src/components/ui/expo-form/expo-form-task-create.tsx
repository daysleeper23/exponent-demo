import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/ui/button/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TaskCreateSchema } from '@/types/task';
import { cn } from '@/lib/utils';
import { Textarea } from '../textarea';
import ExpoSelect from '../expo-select/expo-select';
import { priorityMap, statusMap } from '@/api/common';
import { localUsersMap } from '@/api/user';

const ExpoFormTaskCreate = ({ className }: React.ComponentProps<'form'>) => {
  const form = useForm<z.infer<typeof TaskCreateSchema>>({
    resolver: zodResolver(TaskCreateSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 0,
      priority: 0,
      team: '80c322ca-e7ac-4b4e-822e-db6d1983b8e2',
      assignee: '156de810-1339-469d-9611-8443cdda88d1',
    },
  });

  const onSubmit = (values: z.infer<typeof TaskCreateSchema>) => {
    // Alert the user with the form values
    // TODO: Replace this with a real API call
    window.alert(`You want to create a task:
    - Title: ${values.title}
    - Description: ${values.description}
    - Status: ${statusMap[values.status].label}
    - Priority: ${priorityMap[values.priority].label}
    - Assignee: ${localUsersMap[localUsersMap.findIndex((user) => user.value === values.assignee)].label}
    `);
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
                <Input placeholder="Task title" {...field} />
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
                <Textarea placeholder="Task description" {...field} />
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
                {/* <Input type="number" placeholder="Task status" {...field} /> */}
                <ExpoSelect
                  items={Object.values(statusMap)}
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
                  items={Object.values(priorityMap)}
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
                  items={Object.values(localUsersMap)}
                  value={field.value.toString()}
                  onChange={(val: string) => field.onChange(val)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Create task
        </Button>
      </form>
    </Form>
  );
};
export default ExpoFormTaskCreate;
