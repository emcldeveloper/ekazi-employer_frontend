import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Flag,
  FolderOpen,
  MessageCircle,
  Users2Icon,
} from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/helpers";

interface TaskDetailsProps {
  task: any;
}

const TaskDetails = ({ task }: TaskDetailsProps) => {
  return (
    <div className="px-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">{task.title}</h1>
      </div>

      {/* Task Information */}
      <div className="grid grid-cols-[150px_1fr] gap-y-4">
        <div className="flex items-center gap-2">
          <Users2Icon size={16} className="text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Assigned to:</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {task.assignments?.length ? (
            task.assignments.map((assignment: any) => (
              <Badge key={assignment.id} variant="link">
                {assignment.user?.username}
              </Badge>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Unassigned</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Flag size={16} className="text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Priority</p>
        </div>

        <Badge
          variant={
            task.priority === "High"
              ? "destructive"
              : task.priority === "Medium"
                ? "default"
                : "link"
          }
          className="w-fit"
        >
          {task.priority}
        </Badge>

        <div className="flex items-center gap-2">
          <Clock3 size={16} className="text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Status</p>
        </div>

        <Badge variant="outline" className="w-fit">
          {task.status === "InProgress" ? "In Progress" : task.status}
        </Badge>

        <div className="flex items-center gap-2">
          <CalendarDays size={16} className="text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Due Date</p>
        </div>

        <p>{formatDate(task.deadline)}</p>

        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Created At</p>
        </div>

        <p>{formatDate(task.created_at)}</p>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Description</h3>

        <p className="leading-7 text-muted-foreground">
          {task.description || "No description provided."}
        </p>
      </div>

      {/* Comments and Attachments */}
      <Tabs defaultValue="comments">
        <TabsList variant="line">
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="attachments">Attachments</TabsTrigger>
        </TabsList>

        <TabsContent value="comments">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <MessageCircle />
              </EmptyMedia>
              <EmptyTitle className="text-sm">No Comments</EmptyTitle>
            </EmptyHeader>

            <EmptyContent className="flex-row justify-center gap-2">
              <Button size="sm" variant="link">
                Add Comment
              </Button>
            </EmptyContent>
          </Empty>
        </TabsContent>

        <TabsContent value="attachments">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FolderOpen />
              </EmptyMedia>
              <EmptyTitle className="text-sm">No Attachments</EmptyTitle>
            </EmptyHeader>

            <EmptyContent className="flex-row justify-center gap-2">
              <Button size="sm" variant="link">
                Add File
              </Button>
            </EmptyContent>
          </Empty>
        </TabsContent>
      </Tabs>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        {task.status !== "Completed" && <Button>Mark As Completed</Button>}
      </div>
    </div>
  );
};

export default TaskDetails;
