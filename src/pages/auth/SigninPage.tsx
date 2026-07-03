import { ChevronLeftIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type { LoginPayload } from "@/@types/auth";
import { useLogin } from "@/hooks/auth";
import AuthLayout from "./AuthLayout";

const SigninPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginPayload>();

  const { mutate: loginUser, isPending } = useLogin();

  const onSubmit = (data: LoginPayload) => {
    loginUser(data, {
      onSuccess: (res) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user_id", res.data?.id);
        localStorage.setItem("role_id", res.data?.role_id);
        localStorage.setItem("verified", res.data?.verified);

        const role = res.data?.role_id;

        // 9 as Recruiter, 5 as Employer
        if (role === 9 || role === 5) {
          navigate("/dashboard", { replace: true });
        }

        toast.success(res?.message || "Logged in successfully");
        reset();
      },
      onError: (err: any) => {
        const message = err?.response?.data?.message;
        toast.error(message || "Login Failed");
      },
    });
  };

  return (
    <AuthLayout>
      <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
        <div className="w-full max-w-lg mx-auto sm:pt-10">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <ChevronLeftIcon size={20} />
            Back
          </Link>
        </div>

        <div className="flex flex-col justify-center flex-1 w-full max-w-lg mx-auto">
          <div className="space-y-4">
            <h1 className=" font-semibold text-Blue text-3xl">Login</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <Field>
                  <FieldLabel className="text-muted-foreground">
                    Email
                  </FieldLabel>
                  <Input
                    type="email"
                    placeholder="example@gmail.com"
                    {...register("username", { required: "Email is required" })}
                  />
                  {errors.username && (
                    <p className="text-xs text-red-500">
                      {errors.username.message}
                    </p>
                  )}
                </Field>

                <Field>
                  <div className="flex items-center justify-between">
                    <FieldLabel className="text-muted-foreground">
                      Password
                    </FieldLabel>
                    <Link to={"/forgot-password"}>
                      <span className="text-xs text-Blue font-semibold">
                        forgot your password?
                      </span>
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="******"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.password && (
                    <FieldError>{errors.password.message}</FieldError>
                  )}
                </Field>
                <Field>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-Blue hover:bg-blue-600"
                  >
                    {isPending ? "Logging in..." : "Login"}
                  </Button>
                </Field>
              </FieldGroup>
            </form>

            <div>
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  to="/register"
                  className="text-Blue hover:text-blue-600 dark:text-brand-400"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SigninPage;
