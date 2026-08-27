"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A bar chart with a label";

export default function JobStagesChart({ data }: { data: any }) {
  const applied = data?.pipeline?.[0]?.total;
  const shortlisted = data?.pipeline?.[1]?.total;
  const screening = data?.pipeline?.[2]?.total;
  const interview = data?.pipeline?.[3]?.total;
  const selected = data?.pipeline?.[4]?.total;
  const employed = data?.pipeline?.[5]?.total;
  const declined = data?.pipeline?.[6]?.total;

  const chartData = [
    { month: "Applied", desktop: applied },
    { month: "Shortlist", desktop: shortlisted },
    { month: "Screening", desktop: screening },
    { month: "Interview", desktop: interview },
    { month: "Selected", desktop: selected },
    { month: "Employed", desktop: employed },
    { month: "Declined", desktop: declined },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Stages</CardTitle>
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
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
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
