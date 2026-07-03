import { useState } from "react";
import AuthLayout from "./AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { useCompanyTypes } from "@/hooks/universals";
import { useRegister } from "@/hooks/auth";
import type { RegisterForm } from "@/@types/auth";
import type { CompanyType } from "@/@types/universals";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<RegisterForm>();

  const password = watch("password");

  const { mutate: registerEmployer, isPending } = useRegister();

  const { data: types = [] } = useCompanyTypes();

  const onSubmit = (data: RegisterForm) => {
    const payload = {
      email: data.email,
      phone: data.phone,
      password: data.password,
      name: data.name,
      type: Number(data.type),
    };

    registerEmployer(payload, {
      onSuccess: () => {
        toast.success("Registered successfully");
        navigate("/login");
        reset();
      },

      onError: (err: any) => {
        const message = err.response?.data?.message;

        toast.error(message || "Registration Failed");
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

        <div className="flex flex-col justify-center flex-1 w-full max-w-lg mx-auto sm:mb-10">
          <div className="space-y-4">
            <h1 className=" font-semibold text-Blue text-3xl">Register</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Field>
                <FieldLabel className="text-muted-foreground">
                  Company Name *
                </FieldLabel>
                <Input
                  type="text"
                  {...register("name", {
                    required: "Company name is required",
                  })}
                />
                {errors.name && <FieldError>{errors.name.message}</FieldError>}
              </Field>

              <FieldGroup className="grid md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel className="text-muted-foreground">
                    Company Type *
                  </FieldLabel>
                  <Controller
                    name="type"
                    control={control}
                    rules={{ required: "Select company type" }}
                    render={({ field }) => (
                      <Select
                        value={String(field.value) || ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            {types.map((item: CompanyType) => (
                              <SelectItem key={item.id} value={String(item.id)}>
                                {item.type_name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.type && (
                    <FieldError>{errors.type.message}</FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel className="text-muted-foreground">
                    Phone Number *
                  </FieldLabel>
                  <Input
                    type="tel"
                    placeholder="+255..."
                    {...register("phone", {
                      required: "Phone number is required",
                    })}
                  />
                  {errors.phone && (
                    <FieldError>{errors.phone.message}</FieldError>
                  )}
                </Field>
              </FieldGroup>

              <Field>
                <FieldLabel className="text-muted-foreground">
                  Email *
                </FieldLabel>
                <Input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                {errors.email && (
                  <FieldError>{errors.email.message}</FieldError>
                )}
              </Field>

              <FieldGroup className="grid md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel className="text-muted-foreground">
                    Password *
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
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

                {/* Confirm Password */}
                <Field>
                  <FieldLabel className="text-muted-foreground">
                    Confirm Password *
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("confirmPassword", {
                        required: "Please confirm your password",

                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
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

                  {errors.confirmPassword && (
                    <p className="text-xs text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </Field>
              </FieldGroup>

              <div className="flex items-center gap-3 text-xs">
                <Checkbox
                  className="w-5 h-5"
                  checked={isChecked}
                  onCheckedChange={(checked) => setIsChecked(checked === true)}
                />
                <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                  By creating an account means you agree to the{" "}
                  <span className="text-gray-800 dark:text-white/90">
                    Terms and Conditions,
                  </span>{" "}
                  and our{" "}
                  <span className="text-gray-800 dark:text-white">
                    Privacy Policy
                  </span>
                </p>
              </div>

              <Field>
                <Button
                  type="submit"
                  disabled={!isChecked || isPending}
                  className="bg-Blue hover:bg-blue-800"
                >
                  {isPending ? "Registering..." : "Register"}
                </Button>
              </Field>
            </form>

            <div>
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Already have an account? {""}
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

export default RegisterPage;
