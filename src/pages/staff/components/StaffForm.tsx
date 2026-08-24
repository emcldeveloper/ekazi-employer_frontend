import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { getErrorMessage } from "@/utils/axios-helpers";
import { useCreateStaff, useUpdateStaff } from "@/hooks/staff";
import type { ClientStaff, Permission, StaffPayload } from "@/@types/staff";
import { usePermissions } from "@/hooks/universals";

type UserFormProps = {
  staff?: ClientStaff;
};

const StaffForm = ({ staff }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<StaffPayload>({
    defaultValues: {
      user_permissions: [],
    },
  });

  const { mutate: createUser, isPending: isCreating } = useCreateStaff();

  const { mutate: updateUser, isPending: isUpdating } = useUpdateStaff();

  const isPending = isCreating || isUpdating;

  const { data: permissionsData } = usePermissions();
  const permissions = permissionsData?.data ?? [];

  const selectedPermissions = watch("user_permissions") ?? [];

  const handlePermissionChange = (permission: Permission, checked: boolean) => {
    const permissionId = Number(permission.id);
    const currentPermissions = getValues("user_permissions") ?? [];

    if (checked) {
      if (
        currentPermissions.some((item) => item.permission_id === permissionId)
      ) {
        return;
      }

      setValue(
        "user_permissions",
        [
          ...currentPermissions,
          {
            permission_id: permissionId,
            type: "allow",
          },
        ],
        {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        },
      );
    } else {
      setValue(
        "user_permissions",
        currentPermissions.filter(
          (item) => item.permission_id !== permissionId,
        ),
        {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        },
      );
    }
  };

  useEffect(() => {
    if (staff) {
      reset({
        client_staff_position_id: 1,
        first_name: staff.first_name,
        middle_name: staff.middle_name,
        last_name: staff.last_name,
        phone_number: staff.phone_number,
        email: staff.user?.username,
        username: staff.user?.username,
        user_permissions:
          staff.user?.userPermissions?.map((permission) => ({
            permission_id: Number(permission.id),
            type: permission.type,
          })) ?? [],
      });
    }
  }, [staff, reset]);

  const onSubmit = (data: StaffPayload) => {
    const payload = {
      client_staff_position_id: 1,
      prefix_id: 1,
      first_name: data.first_name,
      middle_name: data.middle_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      email: data.email,
      password: data.password,
      username: data.username,
      user_permissions: data.user_permissions,
    };

    console.log(
      data.user_permissions,
      data.user_permissions.map((p) => ({
        value: p.permission_id,
        type: typeof p.permission_id,
      })),
    );

    if (staff) {
      updateUser(
        {
          id: staff.id,
          payload,
        },
        {
          onSuccess: (res) => {
            toast.success(res?.message || "User updated successfully");
          },
          onError: (error) => {
            getErrorMessage(error || "Failed to update user");
          },
        },
      );
    } else {
      createUser(payload, {
        onSuccess: () => {
          toast.success("User created successfully");
          reset();
        },
        onError: (error) => {
          getErrorMessage(error || "Failed to create user");
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
      <FieldGroup className="mb-4 grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>First Name</FieldLabel>
          <Input
            {...register("first_name", {
              required: "Username is required",
            })}
          />
          {errors.first_name && (
            <FieldError>{errors.first_name.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Middle Name</FieldLabel>
          <Input {...register("middle_name")} />
        </Field>

        <Field>
          <FieldLabel>Last Name</FieldLabel>
          <Input
            {...register("last_name", {
              required: "Username is required",
            })}
          />
          {errors.last_name && (
            <FieldError>{errors.last_name.message}</FieldError>
          )}
        </Field>
      </FieldGroup>

      <FieldGroup className="mb-4 grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>Username</FieldLabel>
          <Input
            {...register("username", {
              required: "Username is required",
            })}
          />
          {errors.username && (
            <FieldError>{errors.username.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Phone</FieldLabel>
          <Input
            {...register("phone_number", {
              required: "Phone is required",
            })}
          />
          {errors.phone_number && (
            <FieldError>{errors.phone_number.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel>Password</FieldLabel>
          <Input
            type="password"
            {...register("password", {
              required: staff ? false : "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </Field>
      </FieldGroup>

      <FieldGroup className="grid grid-cols-2 gap-3">
        {permissions.map((permission: Permission) => (
          <Field key={permission.id} orientation="horizontal">
            <Checkbox
              checked={selectedPermissions.some(
                (selected) => selected.permission_id === Number(permission.id),
              )}
              onCheckedChange={(checked) =>
                handlePermissionChange(permission, checked === true)
              }
            />

            <FieldLabel>
              {permission.name.replace(/^emp-/, "").replace(/-/g, " ")}
            </FieldLabel>
          </Field>
        ))}
      </FieldGroup>

      <Button type="submit" disabled={isPending}>
        {isPending
          ? staff
            ? "Updating..."
            : "Creating..."
          : staff
            ? "Update"
            : "Create"}
      </Button>
    </form>
  );
};

export default StaffForm;
