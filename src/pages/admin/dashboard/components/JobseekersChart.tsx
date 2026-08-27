import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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
import type { JobseekerProfile } from "@/@types/admin-dashboard";

interface JobseekersChartProps {
  jobseekerProfiles: JobseekerProfile[];
}

// const chartData = [
//   { month: "January", completed: 186, uncompleted: 80 },
//   { month: "February", completed: 305, uncompleted: 200 },
//   { month: "March", completed: 237, uncompleted: 120 },
//   { month: "April", completed: 73, uncompleted: 190 },
//   { month: "May", completed: 209, uncompleted: 130 },
//   { month: "June", completed: 214, uncompleted: 140 },
//   { month: "July", completed: 186, uncompleted: 80 },
//   { month: "August", completed: 305, uncompleted: 200 },
//   { month: "September", completed: 237, uncompleted: 120 },
//   { month: "October", completed: 73, uncompleted: 190 },
//   { month: "November", completed: 209, uncompleted: 130 },
//   { month: "December", completed: 214, uncompleted: 140 },
// ];

const chartConfig = {
  completed: {
    label: "Completed",
    color: "var(--chart-1)",
  },
  uncompleted: {
    label: "Uncompleted",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function JobseekersChart({
  jobseekerProfiles = [],
}: JobseekersChartProps) {
  const chartData = jobseekerProfiles.map((item) => ({
    month: item.period,
    completed: Number(item.complete),
    uncompleted: Number(item.uncomplete),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Seekers Overview</CardTitle>
        <CardDescription>Job seekers registration statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <YAxis tickLine={false} axisLine={false} tickMargin={8} />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />

            <Line
              dataKey="completed"
              type="monotone"
              stroke="var(--color-completed)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-completed)",
              }}
            />

            <Line
              dataKey="uncompleted"
              type="monotone"
              stroke="var(--color-uncompleted)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-uncompleted)",
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
