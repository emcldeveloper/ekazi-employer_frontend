// TaskDetails.tsx

import { CalendarDays, CheckCircle2, Clock3, Flag, User2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const task = {
  id: 1,
  title: "Review Frontend Applicants",
  description:
    "Review all frontend developer applications, shortlist qualified candidates and prepare interview schedules.",

  assignedTo: "Amina Yusuf",

  priority: "High",

  status: "In Progress",

  dueDate: "25 May 2026",

  createdAt: "20 May 2026",

  timeline: [
    {
      title: "Task Created",
      date: "20 May 2026",
    },
    {
      title: "Assigned To Amina Yusuf",
      date: "21 May 2026",
    },
    {
      title: "Applications Review Started",
      date: "22 May 2026",
    },
  ],
};

const TaskDetails = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{task.title}</h1>

          <p className="mt-1 text-muted-foreground">
            Detailed task management and tracking
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge>{task.status}</Badge>

          <Badge variant="destructive">{task.priority}</Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Task Description</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="leading-7 text-muted-foreground">
                {task.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-5">
                {task.timeline.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="mt-1 h-3 w-3 rounded-full bg-primary" />

                    <div>
                      <h3 className="font-medium">{item.title}</h3>

                      <p className="text-sm text-muted-foreground">
                        {item.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Task Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="flex items-center gap-3">
                <User2 className="h-4 w-4 text-muted-foreground" />

                <div>
                  <p className="text-sm text-muted-foreground">Assigned To</p>

                  <h3 className="font-medium">{task.assignedTo}</h3>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Flag className="h-4 w-4 text-muted-foreground" />

                <div>
                  <p className="text-sm text-muted-foreground">Priority</p>

                  <h3 className="font-medium">{task.priority}</h3>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock3 className="h-4 w-4 text-muted-foreground" />

                <div>
                  <p className="text-sm text-muted-foreground">Status</p>

                  <h3 className="font-medium">{task.status}</h3>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />

                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>

                  <h3 className="font-medium">{task.dueDate}</h3>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />

                <div>
                  <p className="text-sm text-muted-foreground">Created At</p>

                  <h3 className="font-medium">{task.createdAt}</h3>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <Button>Mark As Completed</Button>

                <Button variant="outline">Edit Task</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
