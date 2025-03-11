import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from 'recharts';

import { Card, CardContent } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { BarChartData, ExpoChartHeader } from './bar-chart';

interface ExpoBarChartCustomLabelProps {
  title: string;
  description: string;
  data: Omit<BarChartData, 'fill'>[];
}

const ExpoBarChartCustomLabel = ({
  title,
  description,
  data,
}: ExpoBarChartCustomLabelProps) => {
  const chartConfig = {
    value: {
      label: 'value',
      color: 'hsl(var(--chart-1))',
    },
    label: {
      color: 'hsl(var(--background))',
    },
  } satisfies ChartConfig;

  return (
    <Card className="shadow-none">
      <ExpoChartHeader title={title} description={description} />
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="key"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="value" type="number" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="value"
              layout="vertical"
              fill="var(--color-value)"
              radius={4}
            >
              <LabelList
                dataKey="key"
                position="insideLeft"
                offset={8}
                className="fill-background"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
export default ExpoBarChartCustomLabel;
