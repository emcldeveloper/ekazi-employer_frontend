import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A bar chart with a label";

const chartData = [
  { month: "January", jobs: 186 },
  { month: "February", jobs: 305 },
  { month: "March", jobs: 237 },
  { month: "April", jobs: 73 },
  { month: "May", jobs: 209 },
  { month: "June", jobs: 214 },
  { month: "July", jobs: 186 },
  { month: "August", jobs: 305 },
  { month: "September", jobs: 237 },
  { month: "October", jobs: 73 },
  { month: "November", jobs: 209 },
  { month: "December", jobs: 214 },
];

const chartConfig = {
  jobs: {
    label: "Jobs",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function JobsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Jobs</CardTitle>
        <CardDescription>Overview of jobs posted</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="jobs" fill="var(--color-jobs)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
