import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Flag,
  MessageCircle,
  Users2Icon,
} from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    <div className="px-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{task.title}</h1>
      </div>

      <div className="grid grid-cols-[150px_1fr] gap-y-3">
        <div className="flex items-center gap-2">
          <Users2Icon size={16} className="text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Assigned to:</p>
        </div>
        <p>{task.assignedTo}</p>

        <div className="flex items-center gap-2">
          <Flag size={16} className="text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Priority</p>
        </div>
        <Badge variant="default">{task.priority}</Badge>

        <div className="flex items-center gap-2">
          <Clock3 size={16} className="text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Status</p>
        </div>
        <Badge>{task.status}</Badge>

        <div className="flex items-center gap-2">
          <CalendarDays size={16} className="text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Due Date</p>
        </div>
        <p>{task.dueDate}</p>

        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Created At</p>
        </div>
        <p>{task.createdAt}</p>
      </div>

      <div>
        <h3 className="font-semibold text-lg">Description</h3>
        <p className="leading-7 text-muted-foreground">{task.description}</p>
      </div>

      <Tabs defaultValue="comments">
        <TabsList variant="line">
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="attachments">Attachments</TabsTrigger>
        </TabsList>
        <TabsContent value="comments">
          <div>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <MessageCircle />
                </EmptyMedia>
                <EmptyTitle className="text-sm">No Comments Yet</EmptyTitle>
                <EmptyDescription>
                  No comments have been added to this task. Start the discussion
                  by adding the first comment.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent className="flex-row justify-center gap-2">
                <Button size="sm">Add Comment</Button>
              </EmptyContent>
            </Empty>
          </div>
        </TabsContent>
        <TabsContent value="attachments">
          <div>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <MessageCircle />
                </EmptyMedia>
                <EmptyTitle className="text-sm">No Attachments Yet</EmptyTitle>
                <EmptyDescription>
                  No files have been attached to this task. Upload documents,
                  images, or other relevant files.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent className="flex-row justify-center gap-2">
                <Button size="sm">Add File</Button>
              </EmptyContent>
            </Empty>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex gap-3 pt-4">
        <Button>Mark As Completed</Button>
      </div>
    </div>
  );
};

export default TaskDetails;
