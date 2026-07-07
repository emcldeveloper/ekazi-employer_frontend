import type { ChangePasswordForm } from "@/@types/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useChangePassword } from "@/hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Security = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ChangePasswordForm>();

  const { mutate: changePassword, isPending: isChanging } = useChangePassword();

  const onSubmit = (data: ChangePasswordForm) => {
    const payload = {
      currentPassword: data.password,
      newPassword: data.newPassword,
    };

    changePassword(payload, {
      onSuccess: () => {
        toast.success("Password changed successfully");
        reset();
      },
      onError: (err: any) => {
        const message =
          err?.response?.data?.message || "Failed to change password";

        toast.error(message);
      },
    });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg text-muted-foreground font-semibold">
        Change password
      </h3>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field className="sm:flex-row">
                <FieldLabel>Current Password</FieldLabel>
                <div>
                  <Input
                    type="password"
                    placeholder="******"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.password && (
                    <FieldError>{errors.password.message}</FieldError>
                  )}
                </div>
              </Field>

              <Field className="sm:flex-row">
                <FieldLabel>New password</FieldLabel>
                <div>
                  <Input
                    type="password"
                    placeholder="******"
                    {...register("newPassword", {
                      required: "New password is required",
                    })}
                  />
                  {errors.newPassword && (
                    <FieldError>{errors.newPassword.message}</FieldError>
                  )}
                </div>
              </Field>

              <Field className="sm:flex-row">
                <FieldLabel>Confirm Password</FieldLabel>
                <div>
                  <Input
                    type="password"
                    placeholder="******"
                    {...register("confirmNewPassword", {
                      required: "Please confirm your new password",
                      validate: (value) =>
                        value === getValues("newPassword") ||
                        "Passwords do not match.",
                    })}
                  />
                  {errors.confirmNewPassword && (
                    <FieldError>{errors.confirmNewPassword.message}</FieldError>
                  )}
                </div>
              </Field>
            </FieldGroup>

            <div className="mt-4 text-end">
              <Button
                disabled={isChanging}
                className="bg-Blue hover:bg-blue-600 text-white"
              >
                {isChanging ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Security;
