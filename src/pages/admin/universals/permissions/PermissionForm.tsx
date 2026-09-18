import type {
  Permission,
  PermissionPayload,
} from "@/@types/universals/permissions";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  useCreatePermission,
  useUpdatePermission,
} from "@/hooks/universals/permissions";
import { getErrorMessage } from "@/utils/axios-helpers";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface PermissionFormProps {
  permission?: Permission;
}

const PermissionForm = ({ permission }: PermissionFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PermissionPayload>();

  const { mutate: createPermission, isPending: isCreating } =
    useCreatePermission();

  const { mutate: updatePermission, isPending: isUpdating } =
    useUpdatePermission();

  useEffect(() => {
    if (permission) {
      reset({
        name: permission?.name,
      });
    }
  }, [permission, reset]);

  const onSubmit = async (data: PermissionPayload) => {
    if (permission) {
      await updatePermission(
        {
          id: permission.id,
          payload: data,
        },
        {
          onSuccess: (res) => {
            toast.success(res?.message || "Permission updated");
            reset();
          },
          onError: (err) => {
            toast.error(getErrorMessage(err));
          },
        },
      );
    } else {
      createPermission(data, {
        onSuccess: (res) => {
          toast.success(res?.message || "Permission created");
          reset();
        },
        onError: (err) => {
          toast.error(getErrorMessage(err));
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Permission name</FieldLabel>
          <Input
            id="name"
            {...register("name", {
              required: "Number of positions is required",
            })}
          />
          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </Field>
      </FieldGroup>

      <div className="mt-4 flex justify-end">
        <Button type="submit" disabled={isCreating || isUpdating}>
          {isCreating || isUpdating
            ? "Creating..."
            : permission
              ? "Update"
              : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default PermissionForm;
