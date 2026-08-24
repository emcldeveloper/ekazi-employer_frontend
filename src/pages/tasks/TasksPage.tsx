import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  ListTodoIcon,
  Search,
} from "lucide-react";

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
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent } from "@/components/ui/card";

import { useTasks } from "@/hooks/tasks";
import { formatDate } from "@/utils/helpers";
import type { Task } from "@/@types/tasks";
import CreateTask from "./components/CreateTask";
import ViewTask from "./components/ViewTask";
import DeleteTask from "./components/DeleteTask";
import UpdateTask from "./components/UpdateTask";
import { DataPagination } from "@/components/data-pagination";
import { useDebounce } from "@/hooks/useDebounce";

const TasksPage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const { data: tasksData, isLoading } = useTasks({
    page,
    limit: perPage,
    search: debouncedSearch,
  });

  const tasks = tasksData?.data || [];
  const statistics = tasksData?.statistics || {};

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Task Management</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Track task progress, monitor workloads, and manage task completion
          across your team.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card size="sm">
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">All Tasks</h3>
              <p className="mt-1 text-3xl font-bold">{statistics?.total}</p>
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
              <p className="mt-1 text-3xl font-bold">
                {statistics?.by_status?.completed}
              </p>
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

              <h2 className="mt-1 text-3xl font-bold">
                {statistics?.by_status?.in_progress}
              </h2>
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
              <h2 className="mt-1 text-3xl font-bold">
                {statistics?.by_status?.pending}
              </h2>
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
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
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
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className="flex h-40 items-center justify-center">
                      <Spinner />
                    </div>
                  </TableCell>
                </TableRow>
              ) : tasks.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-32 text-center text-muted-foreground"
                  >
                    No tasks available.
                  </TableCell>
                </TableRow>
              ) : (
                tasks.map((task: Task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <div>
                        <p className="">{task.title}</p>
                        <p className="text-xs text-muted-foreground font-semibold">
                          Assigned to:{" "}
                          {task.assignments?.length
                            ? task.assignments
                                .map((staff) => staff.user?.username)
                                .join(", ")
                            : "Unassigned"}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge>{task.priority}</Badge>
                    </TableCell>

                    <TableCell>
                      <Badge>{task.status}</Badge>
                    </TableCell>

                    <TableCell>{formatDate(task.deadline)}</TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <ViewTask />
                        <UpdateTask task={task} />
                        <DeleteTask taskId={task.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}

          {tasks.length > 0 && (
            <DataPagination
              page={tasksData?.current_page}
              perPage={tasksData?.per_page}
              totalPages={tasksData?.total_pages}
              onPageChange={setPage}
              onPerPageChange={setPerPage}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksPage;
