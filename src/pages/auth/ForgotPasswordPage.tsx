import { Link, useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";

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
      onSuccess: () => {
        reset();
        toast.success("Link sent succesfully");
        navigate("/login");
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
            <div>
              <h1 className="mb-2 font-semibold text-Blue text-3xl">
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
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <FieldError>{errors.email.message}</FieldError>
                  )}
                </Field>
                <Field>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-Blue hover:bg-blue-800"
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
