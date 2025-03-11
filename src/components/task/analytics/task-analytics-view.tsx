import { priorityMap, statusMap } from '@/api/api-common';
import { localUsers } from '@/api/api-user';
import { ExpoBarChart } from '@/components/charts/bar-chart';
import ExpoBarChartCustomLabel from '@/components/charts/bar-chart-custom-label';
import ExpoPieChart from '@/components/charts/pie-chart';
import { useTasks } from '@/hooks/api/use-tasks';

export default function TaskAnalyticsView() {
  const { data: tasks, isPending } = useTasks();

  const tasksByMember = localUsers
    .map((user) => ({
      key: user.name,
      value: tasks!.filter((task) => task.assignee === user.id).length,
    }));

  const tasksByStatus = Object.values(statusMap).map((status, index) => ({
    key: status.label,
    value: tasks!.filter((task) => task.status === status.value).length,
    fill: `var(--color-${index})`,
  }));

  const tasksByPriority = Object.values(priorityMap).map((priority, index) => ({
    key: priority.label,
    value: tasks!.filter((task) => task.priority === priority.value).length,
    fill: `var(--color-${index})`,
  }));

  return (
    <div className="grid overflow-y-auto w-full">
      <div className="p-6 gap-6 grid lg:grid-cols-2 xl:gap-10 scroll-mt-20">
        <ExpoBarChart title="Tasks by status" description="Number of task by statuses" data={tasksByStatus} dataPending={isPending} />
        <ExpoPieChart title="Tasks by priority" description="Task shares among priorities" data={tasksByPriority} />
        <ExpoBarChartCustomLabel title="Tasks by team member" description="Workload among members" data={tasksByMember} />
      </div>
      <div>
      </div>
    </div>
  );
}
