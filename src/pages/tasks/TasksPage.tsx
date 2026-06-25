import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  ListTodoIcon,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import CreateTask from "./components/CreateTask";
import { Skeleton } from "@/components/ui/skeleton";

const TasksPage = () => {
  const [search, setSearch] = useState("");
  const isLoading = false;

  const tasks = [];

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive";

      case "Medium":
        return "secondary";

      default:
        return "outline";
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "default";

      case "In Progress":
        return "secondary";

      default:
        return "outline";
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      [task.title, task.assignedTo, task.priority, task.status]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <div className="space-y-6">
      <Card size="sm">
        <CardContent>
          <div>
            <h2 className="text-2xl font-bold">Task Management</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Track task progress, monitor workloads, and manage task completion
              across your team.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-4">
        <Card size="sm">
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">All Tasks</h3>
              <p className="mt-1 text-3xl font-bold">0</p>
            </div>

            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <ListTodoIcon size={16} />
            </div>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Completed</h3>
              <p className="mt-1 text-3xl font-bold">0</p>
            </div>

            <div className="rounded-lg bg-green-100 p-3 text-green-600">
              <CheckCircle2 size={16} />
            </div>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">In Progress</p>

              <h2 className="mt-1 text-3xl font-bold">0</h2>
            </div>

            <div className="rounded-lg bg-amber-100 p-3 text-amber-600">
              <Clock3 size={16} />
            </div>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <h2 className="mt-1 text-3xl font-bold">0</h2>
            </div>
            <div className="rounded-lg bg-indigo-100 p-3 text-indigo-600">
              <CalendarDays size={16} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <InputGroup className="max-w-md">
              <InputGroupInput
                placeholder="Search client..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <InputGroupAddon>
                <Search className="h-4 w-4" />
              </InputGroupAddon>
            </InputGroup>

            <CreateTask />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-4 w-40" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-24 rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="ml-auto h-4 w-12" />
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredTasks.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-32 text-center text-muted-foreground"
                  >
                    No tasks available.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.title}</TableCell>

                    <TableCell>{task.assignedTo}</TableCell>

                    <TableCell>
                      <Badge variant={getPriorityVariant(task.priority)}>
                        {task.priority}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge variant={getStatusVariant(task.status)}>
                        {task.status}
                      </Badge>
                    </TableCell>

                    <TableCell>{task.dueDate}</TableCell>

                    <TableCell className="text-right">
                      <Button asChild size="sm" variant="link">
                        <Link to={`/tasks/${task.id}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksPage;
