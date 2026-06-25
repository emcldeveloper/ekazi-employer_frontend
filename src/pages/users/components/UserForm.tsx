import SearchSelect from "react-select";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useUserSettings } from "@/hooks/users/useUserSettings";
import type { OptionType } from "@/@types/jobs";

type FormValues = {
  username: string;
  email: string;
  password: string;
  role: OptionType | null;
  permissions: string[];
};

type UserFormProps = {
  defaultValues?: Partial<FormValues>;
  onSubmit: (data: FormValues) => void;
  isPending?: boolean;
  submitLabel?: string;
};

const UserForm = ({
  defaultValues,
  onSubmit,
  isPending,
  submitLabel = "Save",
}: UserFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: null,
      permissions: [],
      ...defaultValues,
    },
  });

  const { data: settingsData } = useUserSettings();

  const rolesOptions =
    settingsData?.data?.roles?.map((role: any) => ({
      value: role.id,
      label: role.name,
    })) ?? [];

  const permissionGroups = settingsData?.data?.permissions ?? {};

  const selectedPermissions = watch("permissions") || [];

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="-mx-4 scrollbar max-h-[50vh] overflow-y-auto px-4 py-4">
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
                  {...field}
                  isClearable
                  options={rolesOptions}
                  value={field.value}
                  onChange={(option) => field.onChange(option)}
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
                ([groupName, permissions]: [string, any]) => (
                  <div key={groupName}>
                    <h4 className="mb-3 text-sm font-semibold text-primary capitalize">
                      {groupName}
                    </h4>

                    <FieldGroup className="grid grid-cols-2 gap-3">
                      {permissions.map((permission: any) => (
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
      </div>

      <DialogFooter className="mt-4">
        <DialogClose asChild>
          <Button variant="outline" type="button">
            Cancel
          </Button>
        </DialogClose>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : submitLabel}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default UserForm;
