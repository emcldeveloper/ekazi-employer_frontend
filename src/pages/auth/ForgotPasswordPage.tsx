import { Link, useNavigate } from "react-router-dom";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import AuthLayout from "./AuthLayout";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useForgotPassword } from "@/hooks/auth";
import type { ForgotPayload } from "@/@types/auth";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPayload>();

  // reset password
  const { mutate: resetPassword, isPending } = useForgotPassword();

  const onSubmit = (data: ForgotPayload) => {
    resetPassword(data, {
      onSuccess: (res) => {
        toast.success(res?.message || "Link sent succesfully");
        navigate("/login");
        reset();
      },
      onError: (err: any) => {
        const message = err?.response?.data?.message;
        toast.error(message || "Failed to send link");
      },
    });
  };

  return (
    <AuthLayout>
      <div className="flex flex-col flex-1 w-full">
        <div className="flex flex-col justify-center flex-1 w-full max-w-lg mx-auto">
          <div className="space-y-5">
            <div>
              <h1 className="mb-3 font-semibold text-Blue text-center text-2xl">
                Forgot Password?
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter the email address linked to your account, and we’ll send
                you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    {...register("email", { required: "Email is required" })}
                    className="border-Blue"
                  />
                  {errors.email && (
                    <FieldError>{errors.email.message}</FieldError>
                  )}
                </Field>
                <Field>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-Blue hover:bg-blue-600"
                  >
                    {isPending ? "Sending..." : "Send Reset Link"}
                  </Button>
                </Field>
              </FieldGroup>
            </form>

            <div className="mt-5">
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

export default ForgotPasswordPage;
