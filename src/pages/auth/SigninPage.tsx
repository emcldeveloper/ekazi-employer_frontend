import { EyeIcon, EyeOffIcon } from "lucide-react";
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
import { useState } from "react";

const SigninPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

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
      <div className="flex flex-col flex-1 w-full">
        <div className="flex flex-col flex-1 w-full max-w-lg mx-auto">
          <div className="space-y-5">
            <h1 className=" font-semibold text-Blue text-center text-2xl">
              Log in to ekazi
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    {...register("username", { required: "Email is required" })}
                    className="border-Blue"
                  />
                  {errors.username && (
                    <p className="text-xs text-red-500">
                      {errors.username.message}
                    </p>
                  )}
                </Field>

                <Field>
                  <div className="flex items-center justify-between">
                    <FieldLabel>Password</FieldLabel>
                    <Link to={"/forgot-password"}>
                      <span className="text-xs text-Blue font-semibold">
                        forgot your password?
                      </span>
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="8 or more characters"
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
