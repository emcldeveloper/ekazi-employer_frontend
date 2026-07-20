import type { CreateTaskForm } from "@/@types/tasks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateTask } from "@/hooks/tasks";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateTask = () => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateTaskForm>({
    defaultValues: {
      title: "",
      description: "",
      priority: "Medium",
      status: "Pending",
    },
  });

  // Creating Job
  const { mutate: createTask, isPending: isCreating } = useCreateTask();

  const onSubmit = async (data: CreateTaskForm) => {
    createTask(data, {
      onSuccess: (res) => {
        toast.success(res?.message || "Job created succesfully");
        setOpen(false);
        reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel>Task Title</FieldLabel>
              <Input
                placeholder="Enter task title"
                {...register("title", {
                  required: "Title is required",
                })}
              />
              {errors.title && <FieldError>{errors.title.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel>Description</FieldLabel>
              <Input
                placeholder="Enter task description"
                {...register("description")}
              />
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel>Priority</FieldLabel>

                <Controller
                  name="priority"
                  control={control}
                  rules={{ required: "Priority is required" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.priority && (
                  <FieldError>{errors.priority.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel>Status</FieldLabel>

                <Controller
                  name="status"
                  control={control}
                  rules={{ required: "Status is required" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="InProgress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status && (
                  <FieldError>{errors.status.message}</FieldError>
                )}
              </Field>
            </div>

            <Field>
              <FieldLabel>Due Date</FieldLabel>
              <Input
                type="date"
                {...register("deadline", {
                  required: "Due date is required",
                })}
              />
              {errors.deadline && (
                <FieldError>{errors.deadline.message}</FieldError>
              )}
            </Field>

            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Task"}
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTask;
