import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ExpoChartFooter, ExpoChartHeader } from './bar-chart';

const chartData = [
  { date: '2024-04-01', scope: 400, started: 59, completed: 39, ideal: 0 },
  { date: '2024-04-02', scope: 400, started: 97, completed: 80, ideal: 50 },
  { date: '2024-04-03', scope: 400, started: 120, completed: 92, ideal: 100 },
  { date: '2024-04-04', scope: 400, started: 137, completed: 110, ideal: 150 },
  { date: '2024-04-05', scope: 400, started: 137, completed: 110, ideal: 150 },
  { date: '2024-04-06', scope: 400, started: 137, completed: 110, ideal: 150 },
  { date: '2024-04-07', scope: 500, started: 157, completed: 135, ideal: 200 },
  { date: '2024-04-08', scope: 500, started: 222, completed: 190, ideal: 250 },
  { date: '2024-04-09', scope: 500, started: 261, completed: 220, ideal: 300 },
  { date: '2024-04-10', scope: 500, started: 301, completed: 265, ideal: 350 },
  { date: '2024-04-11', scope: 500, started: 342, completed: 301, ideal: 400 },
  { date: '2024-04-12', scope: 500, started: 342, completed: 301, ideal: 400 },
  { date: '2024-04-13', scope: 500, started: 342, completed: 301, ideal: 400 },
  { date: '2024-04-14', scope: 500, started: 373, completed: 350, ideal: 450 },
  { date: '2024-04-15', scope: 500, started: 409, completed: 392, ideal: 500 },
];

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  scope: {
    label: 'Scope',
    color: 'hsl(var(--chart-4))',
  },
  ideal: {
    label: 'Ideal',
    color: 'hsl(var(--chart-3))',
  },
  started: {
    label: 'Started',
    color: 'hsl(var(--chart-5))',
  },
  completed: {
    label: 'Completed',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;
interface ExpoComposedChartProps {
  title: string;
  description: string;
}
const ExpoComposedChart = ({ title, description }: ExpoComposedChartProps) => {
  return (
    <Card className="shadow-none">
      <ExpoChartHeader title={title} description={description} />
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full -ml-4"
        >
          <ComposedChart data={chartData}>
            <defs>
              <linearGradient
                id="fillScope"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
                strokeWidth={3}
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-scope)"
                  stopOpacity={0.1}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-scope)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="fillStarted" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-started)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-started)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-completed)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-completed)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <YAxis domain={[0, 500]} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="scope"
              type="monotone"
              fill="url(#fillScope)"
              stroke="var(--color-scope)"
              strokeWidth={1.5}
            />
            <Area
              dataKey="started"
              type="natural"
              fill="url(#fillStarted)"
              stroke="var(--color-started)"
              strokeWidth={1.5}
            />

            <Area
              dataKey="completed"
              type="natural"
              fill="url(#fillCompleted)"
              stroke="var(--color-completed)"
              strokeWidth={1.5}
            />
            <Line
              type="natural"
              dataKey="ideal"
              stroke="var(--color-ideal)"
              strokeDasharray="3 3"
              dot={false}
              strokeWidth={1.5}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
      <ExpoChartFooter
        title="Scope creeps & slow down towards the end of the project"
        description="Require stronger push for lofty goals"
      />
    </Card>
  );
};
export default ExpoComposedChart;
