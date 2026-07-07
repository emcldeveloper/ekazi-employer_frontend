import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";

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
import { useState } from "react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      <div className="flex flex-col flex-1 w-full">
        <div className="flex flex-col justify-center flex-1 w-full max-w-lg mx-auto">
          <div className="space-y-5">
            <h1 className="font-semibold text-Blue text-center text-2xl">
              Reset Password
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <Field>
                  <FieldLabel>New Password</FieldLabel>
                  <div className="relative">
                    <Input
                      placeholder="8 or more characters"
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                      className="border-Blue"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon size={16} />
                      ) : (
                        <EyeOffIcon size={16} />
                      )}
                    </span>
                  </div>
                  {errors.password && (
                    <FieldError>{errors.password.message}</FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel>Confirm Password</FieldLabel>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("password_confirmation", {
                        required: "Confirm password is required",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                      className="border-Blue"
                    />
                    <span
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeIcon size={16} />
                      ) : (
                        <EyeOffIcon size={16} />
                      )}
                    </span>
                  </div>
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
