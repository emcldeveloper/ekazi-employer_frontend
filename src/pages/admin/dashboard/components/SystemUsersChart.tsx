import { Pie, PieChart } from "recharts";

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

export const description = "A pie chart with a label";

const chartData = [
  { browser: "jobseekers", users: 275, fill: "var(--color-jobseekers)" },
  { browser: "employers", users: 200, fill: "var(--color-employers)" },
  { browser: "recruiters", users: 187, fill: "var(--color-recruiters)" },
  { browser: "freelancers", users: 173, fill: "var(--color-freelancers)" },
  { browser: "admins", users: 90, fill: "var(--color-admins)" },
];

const chartConfig = {
  users: {
    label: "Users",
  },
  jobseekers: {
    label: "JobSeekers",
    color: "var(--chart-1)",
  },
  employers: {
    label: "Employers",
    color: "var(--chart-2)",
  },
  recruiters: {
    label: "Recruiters",
    color: "var(--chart-3)",
  },
  freelancers: {
    label: "Freelancers",
    color: "var(--chart-4)",
  },
  admins: {
    label: "Admins",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function SystemUsersChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>System Users</CardTitle>
        <CardDescription>Overview of registered system users</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62.5 pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="users" label nameKey="browser" />
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
