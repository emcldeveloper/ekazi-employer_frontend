import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useResetPassword } from "@/hooks/auth";
import type { ResetForm } from "@/@types/auth";
import { toast } from "sonner";
import AuthLayout from "./AuthLayout";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = String(searchParams.get("token"));
  const email = String(searchParams.get("email"));

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ResetForm>();

  const { mutate, isPending } = useResetPassword();

  const password = watch("password");

  const onSubmit = (data: ResetForm) => {
    const payload = {
      token,
      email,
      newPassword: data.password,
    };

    mutate(payload, {
      onSuccess: (response) => {
        toast.success(response?.message || "Password reset successful");

        reset();

        navigate("/login");
      },

      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Failed to reset password");
      },
    });
  };

  return (
    <AuthLayout>
      <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
        <div className="w-full max-w-lg mx-auto sm:pt-10">
          <Link
            to="/login"
            className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <ChevronLeftIcon size={20} />
            Back
          </Link>
        </div>

        <div className="flex flex-col justify-center flex-1 w-full max-w-lg mx-auto">
          <div className="space-y-4">
            <h1 className="font-semibold text-Blue text-3xl">Reset Password</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <Field>
                  <FieldLabel className="text-muted-foreground">
                    New Password
                  </FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <FieldError>{errors.password.message}</FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel className="text-muted-foreground">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id="password_confirmation"
                    type="password"
                    {...register("password_confirmation", {
                      required: "Confirm password is required",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                  />
                  {errors.password_confirmation && (
                    <FieldError>
                      {errors.password_confirmation.message}
                    </FieldError>
                  )}
                </Field>

                <Field>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-Blue hover:bg-blue-600"
                  >
                    {isPending ? "Resetting..." : "Reset Password"}
                  </Button>
                </Field>
              </FieldGroup>
            </form>

            <div>
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Remember your password? {""}
                <Link
                  to="/login"
                  className="text-Blue hover:text-blue-600 dark:text-brand-400"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
