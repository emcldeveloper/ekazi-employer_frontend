import SearchSelect from "react-select";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useUserSettings } from "@/hooks/users/useUserSettings";

import { useCreateUser, useUpdateUser } from "@/hooks/users";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/axios-helpers";
import type { CreateUserFormData, Role, Permission } from "@/@types/users";

type UserFormProps = {
  userId?: number;
};

const CreateUserForm = ({ userId }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: null,
      permissions: [],
    },
  });

  const { data: settingsData } = useUserSettings();

  const rolesOptions =
    settingsData?.data?.roles?.map((role: Role) => ({
      value: role.id,
      label: role.name,
    })) ?? [];

  const permissionGroups = settingsData?.data?.permissions ?? {};

  const selectedPermissions = watch("permissions") ?? [];

  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (checked) {
      setValue("permissions", [...selectedPermissions, permission]);
    } else {
      setValue(
        "permissions",
        selectedPermissions.filter((item) => item !== permission),
      );
    }
  };

  const { mutate: createUser, isPending: isCreating } = useCreateUser();

  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

  const isPending = isCreating || isUpdating;

  const onSubmit = (data: CreateUserFormData) => {
    const payload = {
      email: data.email,
      password: data.password,
      permissions: data.permissions,
      role: data.role?.label,
      role_id: data.role?.value,
      username: data.username,
    };

    if (userId) {
      updateUser(
        {
          id: userId,
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup className="mb-4 grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>Username</FieldLabel>

          <Input
            {...register("username", {
              required: "Username is required",
            })}
          />

          {errors.username && (
            <p className="text-sm text-destructive">
              {errors.username.message}
            </p>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="role">Role</FieldLabel>

          <Controller
            name="role"
            control={control}
            rules={{
              required: "Role is required",
            }}
            render={({ field }) => (
              <SearchSelect
                options={rolesOptions}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                isClearable
              />
            )}
          />

          {errors.role && <FieldError>{errors.role.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel>Email</FieldLabel>

          <Input
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
          />

          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </Field>

        <Field>
          <FieldLabel>Password</FieldLabel>

          <Input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </Field>
      </FieldGroup>

      <Card>
        <CardHeader>Permissions</CardHeader>

        <CardContent>
          <div className="space-y-6">
            {Object.entries(permissionGroups).map(
              ([groupName, permissions]) => (
                <div key={groupName}>
                  <h4 className="mb-3 text-sm font-semibold text-primary capitalize">
                    {groupName}
                  </h4>

                  <FieldGroup className="grid grid-cols-2 gap-3">
                    {(permissions as Permission[]).map((permission) => (
                      <Field key={permission.id} orientation="horizontal">
                        <Checkbox
                          checked={selectedPermissions.includes(
                            permission.name,
                          )}
                          onCheckedChange={(checked) =>
                            handlePermissionChange(
                              permission.name,
                              checked === true,
                            )
                          }
                        />

                        <FieldLabel>
                          {permission.name
                            .replace(/^emp-/, "")
                            .replace(/-/g, " ")}
                        </FieldLabel>
                      </Field>
                    ))}
                  </FieldGroup>
                </div>
              ),
            )}
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={isPending}>
        {isPending
          ? userId
            ? "Updating..."
            : "Creating..."
          : userId
            ? "Update"
            : "Create"}
      </Button>
    </form>
  );
};

export default CreateUserForm;
