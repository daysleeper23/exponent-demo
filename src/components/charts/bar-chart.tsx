import { Loader2, TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export type BarChartData = {
  key: string;
  value: number;
  fill: string;
};

interface ExpoBarChartProps {
  title: string;
  description: string;
  data: BarChartData[];
  dataPending: boolean;
}

const ExpoBarChart = ({
  title,
  description,
  data,
  dataPending,
}: ExpoBarChartProps) => {
  if (dataPending) {
    return (
      <Card className="shadow-none">
        <ExpoChartHeader title={title} description={description} />
        <CardContent>
          <div className="flex items-center justify-center h-40">
            <Loader2 className="animate-spin" />
          </div>
        </CardContent>
        <ExpoChartFooter />
      </Card>
    );
  } else {
    const chartConfig = {
      value: {
        label: 'Tasks',
      },
      0: {
        label: data[0].key,
        color: 'hsl(var(--chart-1))',
      },
      1: {
        label: data[1].key,
        color: 'hsl(var(--chart-2))',
      },
      2: {
        label: data[2].key,
        color: 'hsl(var(--chart-3))',
      },
      3: {
        label: data[3].key,
        color: 'hsl(var(--chart-4))',
      },
      4: {
        label: data[4].key,
        color: 'hsl(var(--chart-5))',
      },
    } satisfies ChartConfig;

    return (
      <Card className="shadow-none">
        <ExpoChartHeader title={title} description={description} />
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart
              accessibilityLayer
              data={data}
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="key"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value}
              />
              <YAxis
                dataKey="value"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="value" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <ExpoChartFooter />
      </Card>
    );
  }
};

const ExpoChartFooter = () => {
  return (
    <CardFooter className="flex-col items-start gap-2 text-sm">
      <div className="flex gap-2 font-medium leading-none">
        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
      </div>
      <div className="leading-none text-muted-foreground">
        Showing total tasks for the last 6 months
      </div>
    </CardFooter>
  );
};

const ExpoChartHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  );
};

export { ExpoBarChart, ExpoChartFooter, ExpoChartHeader };
