import { priorityMap, statusMap } from '@/api/static/common';
import { localUsers } from '@/api/static/user';
import { ExpoBarChart } from '@/components/charts/bar-chart';
import ExpoBarChartCustomLabel from '@/components/charts/bar-chart-custom-label';
import ExpoPieChart from '@/components/charts/pie-chart';
import taskApi from '@/hooks/api/use-tasks';
import ExpoComposedChart from '@/components/charts/composed-chart';
import { Task } from '@/types/task';

export default function TaskAnalyticsView() {
  const { data: tasks, isPending } = taskApi.useTasks();

  const tasksByMember = localUsers.map((user) => ({
    key: user.name,
    value: (tasks || []).filter((task: Task) => task.assignee === user.id)
      .length,
  }));

  const tasksByStatus = Object.values(statusMap).map((status, index) => ({
    key: status.label,
    value: (tasks || []).filter((task: Task) => task.status === status.value)
      .length,
    fill: `var(--color-${index})`,
  }));

  const tasksByPriority = Object.values(priorityMap).map((priority, index) => ({
    key: priority.label,
    value: (tasks || []).filter(
      (task: Task) => task.priority === priority.value
    ).length,
    fill: `var(--color-${index})`,
  }));

  return (
    <div className="grid overflow-y-auto w-full">
      <div className="p-6 gap-6 grid lg:grid-cols-2 xl:gap-10 scroll-mt-20">
        <ExpoComposedChart
          title="Current Sprint Velocity"
          description="Show team progress for current sprint"
        />

        <ExpoBarChart
          title="Tasks by status"
          description="Number of task by statuses"
          data={tasksByStatus}
          dataPending={isPending}
        />
        <ExpoPieChart
          title="Tasks by priority"
          description="Task shares among priorities"
          data={tasksByPriority}
        />
        <ExpoBarChartCustomLabel
          title="Tasks by team member"
          description="Workload among members"
          data={tasksByMember}
        />
      </div>
    </div>
  );
}
