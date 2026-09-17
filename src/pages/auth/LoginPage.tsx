import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type { LoginPayload } from "@/@types/auth";
import { useLogin } from "@/hooks/auth";
import { useState } from "react";
import { getErrorMessage } from "@/utils/axios-helpers";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/components/logo";

const LoginPage = () => {
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
        const role = res.data?.role_id;

        // Check if the user's role is allowed before storing login data
        if (role === 9 || role === 5) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("verified", String(res.data?.verified));

          toast.success(res?.message || "Logged in successfully");
          reset();
          navigate("/app/dashboard", { replace: true });
        } else if (role === 2) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("verified", res.data?.verified);

          toast.success(res?.message || "Logged in successfully");
          reset();
          navigate("/admin/dashboard", { replace: true });
        } else {
          toast.error("You do not have permission to access this application.");
        }
      },

      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-lg space-y-4">
        <Logo />

        <Card>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    {...register("username", {
                      required: "Email is required",
                    })}
                  />
                  {errors.username && (
                    <FieldError>{errors.username.message}</FieldError>
                  )}
                </Field>

                <Field>
                  <div className="flex items-center justify-between">
                    <FieldLabel>Password</FieldLabel>
                    <Link to={"/forgot-password"}>
                      <span className="text-xs text-Blue font-semibold">
                        forgot password?
                      </span>
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="6 or more characters"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeOffIcon size={16} />
                      ) : (
                        <EyeIcon size={16} />
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

                <FieldSeparator>Or</FieldSeparator>

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/register"
                    className="text-Blue hover:text-blue-600"
                  >
                    Register
                  </Link>
                </FieldDescription>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>

        <div className="px-6 text-sm text-center">
          By clicking login, you agree to our{" "}
          <a href="#" className="text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary">
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
