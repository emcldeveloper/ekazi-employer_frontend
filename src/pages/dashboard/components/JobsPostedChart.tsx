"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A pie chart with a label";

export default function JobsPostedChart({ data }: { data: any }) {
  const activeJobs = data?.activeJobs;
  const expiredJobs = data?.expiredJobs;

  const chartData = [
    {
      browser: "chrome",
      visitors: activeJobs,
      fill: "var(--color-chrome)",
    },
    {
      browser: "safari",
      visitors: expiredJobs,
      fill: "var(--color-safari)",
    },
  ];

  const chartConfig = {
    visitors: {
      label: "Jobs",
    },
    chrome: {
      label: "Active",
      color: "var(--chart-1)",
    },
    safari: {
      label: "Expired",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Jobs Status</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62.5 pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" label nameKey="browser" />

            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
