import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A mixed bar chart";

const chartData = [
  { browser: "applied", jobs: 105, fill: "var(--color-applied)" },
  { browser: "shortlisted", jobs: 100, fill: "var(--color-shortlisted)" },
  { browser: "screening", jobs: 87, fill: "var(--color-screening)" },
  { browser: "interview", jobs: 73, fill: "var(--color-interview)" },
  { browser: "selected", jobs: 90, fill: "var(--color-selected)" },
];

const chartConfig = {
  jobs: {
    label: "Jobs",
  },
  applied: {
    label: "Applied",
    color: "var(--chart-1)",
  },
  shortlisted: {
    label: "Shortlist",
    color: "var(--chart-2)",
  },
  screening: {
    label: "Screening",
    color: "var(--chart-3)",
  },
  interview: {
    label: "Interview",
    color: "var(--chart-4)",
  },
  selected: {
    label: "Selected",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function JobStagesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Stages</CardTitle>
        <CardDescription>Overview of job stages of posted jobs</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="jobs" type="number" hide />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="jobs" radius={5}>
              <LabelList
                position="right"
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
