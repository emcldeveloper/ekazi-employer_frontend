import type { LoginPayload } from "@/@types/auth";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginPage = () => {
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
    <div className="min-h-svh flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <Card>
          <CardHeader>
            <Logo />
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <Field>
                  <FieldLabel>Email</FieldLabel>
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
                    <FieldLabel htmlFor="password">Password</FieldLabel>
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
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Logging in..." : "Login"}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
            <FieldDescription className="text-center">
              Don&apos;t have an account? <Link to={"/register"}>Register</Link>
            </FieldDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
