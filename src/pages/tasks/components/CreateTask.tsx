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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon } from "lucide-react";

const CreateTask = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon size={16} />
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
  );
};

export default CreateTask;
