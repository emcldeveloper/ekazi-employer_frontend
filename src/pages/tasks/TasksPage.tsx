// TasksPage.tsx

import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Plus,
  Search,
  User2,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Field, FieldGroup } from "@/components/ui/field";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

const tasks = [
  {
    id: 1,
    title: "Review Frontend Applicants",
    assignedTo: "Amina Yusuf",
    priority: "High",
    status: "In Progress",
    dueDate: "25 May 2026",
  },
  {
    id: 2,
    title: "Post UI/UX Designer Job",
    assignedTo: "Kelvin George",
    priority: "Medium",
    status: "Pending",
    dueDate: "27 May 2026",
  },
  {
    id: 3,
    title: "Schedule Interviews",
    assignedTo: "Sophia Andrew",
    priority: "High",
    status: "Pending",
    dueDate: "29 May 2026",
  },
  {
    id: 4,
    title: "Update Employer Profile",
    assignedTo: "John Michael",
    priority: "Low",
    status: "Completed",
    dueDate: "20 May 2026",
  },
  {
    id: 5,
    title: "Approve Candidate Shortlist",
    assignedTo: "Fatma Ali",
    priority: "High",
    status: "In Progress",
    dueDate: "30 May 2026",
  },
  {
    id: 6,
    title: "Verify Client Documents",
    assignedTo: "David Peter",
    priority: "Medium",
    status: "Pending",
    dueDate: "31 May 2026",
  },
  {
    id: 7,
    title: "Prepare Weekly Report",
    assignedTo: "Grace William",
    priority: "Low",
    status: "Completed",
    dueDate: "18 May 2026",
  },
  {
    id: 8,
    title: "Manage Job Applications",
    assignedTo: "Neema Charles",
    priority: "Medium",
    status: "In Progress",
    dueDate: "28 May 2026",
  },
];

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

const TasksPage = () => {
  const [search, setSearch] = useState("");

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
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-xl font-bold">Tasks</h2>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Task</DialogTitle>

              <DialogDescription>
                Assign tasks to your recruiters or team members.
              </DialogDescription>
            </DialogHeader>

            <FieldGroup>
              <Field>
                <Label>Task Title</Label>

                <Input placeholder="Enter task title" />
              </Field>

              <Field>
                <Label>Description</Label>

                <Input placeholder="Enter task description" />
              </Field>

              <Field>
                <Label>Assign To</Label>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="amina">Amina Yusuf</SelectItem>

                    <SelectItem value="kelvin">Kelvin George</SelectItem>

                    <SelectItem value="sophia">Sophia Andrew</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <div className="grid gap-4 md:grid-cols-2">
                <Field>
                  <Label>Priority</Label>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>

                      <SelectItem value="medium">Medium</SelectItem>

                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <Label>Status</Label>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>

                      <SelectItem value="progress">In Progress</SelectItem>

                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <Field>
                <Label>Due Date</Label>

                <Input type="date" />
              </Field>
            </FieldGroup>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <Button>Create Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border bg-background p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Tasks</p>

              <h2 className="mt-2 text-3xl font-bold">24</h2>
            </div>

            <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>

        <div className="rounded-2xl border bg-background p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>

              <h2 className="mt-2 text-3xl font-bold">10</h2>
            </div>

            <Clock3 className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>

        <div className="rounded-2xl border bg-background p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">In Progress</p>

              <h2 className="mt-2 text-3xl font-bold">8</h2>
            </div>

            <CalendarDays className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>

        <div className="rounded-2xl border bg-background p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Team Members</p>

              <h2 className="mt-2 text-3xl font-bold">12</h2>
            </div>

            <User2 className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
      </div> */}

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
              {filteredTasks.map((task) => (
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksPage;
