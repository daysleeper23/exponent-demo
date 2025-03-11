import { Pie, PieChart } from 'recharts';

import { Card, CardContent } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { BarChartData, ExpoChartFooter, ExpoChartHeader } from './bar-chart';

interface ExpoPieChartProps {
  title: string;
  description: string;
  data: BarChartData[];
}

const ExpoPieChart = ({ title, description, data }: ExpoPieChartProps) => {
  const chartConfig = {
    tasks: {
      label: 'Tasks',
    },
    0: {
      label: data[0].key,
      color: 'hsl(var(--chart-2))',
    },
    1: {
      label: data[1].key,
      color: 'hsl(var(--chart-3))',
    },
    2: {
      label: data[2].key,
      color: 'hsl(var(--chart-4))',
    },
    3: {
      label: data[3].key,
      color: 'hsl(var(--chart-5))',
    },
    4: {
      label: data[4].key,
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col shadow-none">
      <ExpoChartHeader title={title} description={description} />
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent labelKey="key" nameKey="value" />}
            />
            <Pie data={data} dataKey="value" label nameKey="key" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <ExpoChartFooter
        title="Higher priority tasks trending upwards by 10%"
        description="Needs better prioritization"
      />
    </Card>
  );
};
export default ExpoPieChart;
