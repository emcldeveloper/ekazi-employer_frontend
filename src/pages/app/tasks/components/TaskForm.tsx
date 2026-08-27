import SearchSelect from "react-select";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useCreateTask, useUpdateTask } from "@/hooks/tasks";
import { useUsers } from "@/hooks/users";
import type { CreateTaskForm, Task } from "@/@types/tasks";
import type { User } from "@/@types/users";
import type { OptionType } from "@/@types/jobs";
import { getErrorMessage } from "@/utils/axios-helpers";
import { useEffect } from "react";

interface TaskFormProps {
  task?: Task;
  onSuccess?: () => void;
}

const TaskForm = ({ task, onSuccess: closeModal }: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateTaskForm>({
    defaultValues: {
      title: "",
      description: "",
      priority: "Medium",
      status: "Pending",
      assignees: [],
      attachments: [],
    },
  });

  // Creating Job
  const { mutate: createTask, isPending: isCreating } = useCreateTask();

  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();

  const isPending = isCreating || isUpdating;

  const { data: users } = useUsers({});
  const userOptions =
    users?.data.map((item: User) => ({
      value: item.id,
      label: item.username,
    })) ?? [];

  //   Pre-fill for updating product
  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        // assignees: task.assignments,
        // attachments: task.attachments,
      });
    }
  }, [task, reset]);

  const onSubmit = async (data: CreateTaskForm) => {
    if (task) {
      updateTask(
        {
          id: task.id,
          payload: data,
        },
        {
          onSuccess: async (res) => {
            toast.success(res.message);
            closeModal?.();
          },
          onError: (error) => {
            getErrorMessage(error);
          },
        },
      );
    } else {
      createTask(data, {
        onSuccess: (res) => {
          toast.success(res?.message || "Job created succesfully");
          reset();
          closeModal?.();
        },
        onError: (error) => {
          getErrorMessage(error);
        },
      });
    }
  };

  return (
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
          <Textarea
            placeholder="Enter task description"
            {...register("description")}
          />
        </Field>

        <Field>
          <FieldLabel>Assign To</FieldLabel>
          <Controller
            name="assignees"
            control={control}
            rules={{
              required: "Select staff for this task",
            }}
            render={({ field }) => (
              <SearchSelect
                {...field}
                isClearable
                isMulti
                options={userOptions}
                value={userOptions.filter((option: OptionType) =>
                  field.value?.includes(option.value),
                )}
                onChange={(options) =>
                  field.onChange(options.map((option) => option.value))
                }
              />
            )}
          />
          {errors.assignees && (
            <FieldError>{errors.assignees.message}</FieldError>
          )}
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
            {errors.status && <FieldError>{errors.status.message}</FieldError>}
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

        <Field>
          <FieldLabel>Attachment(s)</FieldLabel>

          <Input
            type="file"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              setValue("attachments", files, { shouldValidate: true });
            }}
          />

          <FieldDescription>Select one or more files.</FieldDescription>
        </Field>

        <Button type="submit" disabled={isPending}>
          {isCreating ? "Creating..." : "Create Task"}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default TaskForm;
