import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Building2, EyeIcon, EyeOffIcon, User } from "lucide-react";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";

import { useCompanyTypes } from "@/hooks/universals";

import type { CompanyType } from "@/@types/universals";

import type { OnboardingFormData } from "@/schema/auth.schema";

const accountTypes = [
  {
    id: "employer",
    name: "Employer",
  },
  {
    id: "recruiter",
    name: "Recruiter",
  },
];

const AccountForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<OnboardingFormData>();

  const { data: types = [] } = useCompanyTypes();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-primary/10">
          <Building2 size={20} className="text-primary" />
        </div>
        <div>
          <FieldLegend>Company Details</FieldLegend>
          <FieldDescription>
            Provide your company details to get started.
          </FieldDescription>
        </div>
      </div>

      <Field>
        <FieldLabel>Company Name *</FieldLabel>

        <Input
          type="text"
          {...register("companyName")}
          placeholder="e.g. Acme Technologies Ltd"
        />

        {errors.companyName && (
          <FieldError>{errors.companyName.message}</FieldError>
        )}
      </Field>

      <FieldGroup className="grid gap-4 md:grid-cols-2">
        <Field>
          <FieldLabel>Company Type *</FieldLabel>

          <Controller
            name="companyType"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select company type" />
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

          {errors.companyType && (
            <FieldError>{errors.companyType.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Account Type *</FieldLabel>

          <Controller
            name="accountType"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {accountTypes.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          {errors.accountType && (
            <FieldError>{errors.accountType.message}</FieldError>
          )}
        </Field>
      </FieldGroup>

      <Separator />

      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-primary/10">
          <User size={20} className="text-primary" />
        </div>
        <div>
          <FieldLegend>Account Details</FieldLegend>
          <FieldDescription>
            Provide the administrator's account details.
          </FieldDescription>
        </div>
      </div>

      <FieldGroup className="grid gap-4 md:grid-cols-2">
        <Field>
          <FieldLabel>First Name *</FieldLabel>
          <Input type="text" {...register("firstName")} />
          {errors.firstName && (
            <FieldError>{errors.firstName.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Last Name *</FieldLabel>
          <Input type="text" {...register("lastName")} />
          {errors.lastName && (
            <FieldError>{errors.lastName.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Phone Number *</FieldLabel>
          <Input type="tel" {...register("phone")} />
          {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel>Email *</FieldLabel>
          <Input type="email" {...register("email")} />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel>Password *</FieldLabel>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword((previous) => !previous)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
            </button>
          </div>

          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Confirm Password *</FieldLabel>

          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className="pr-10"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((previous) => !previous)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <EyeOffIcon size={16} />
              ) : (
                <EyeIcon size={16} />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <FieldError>{errors.confirmPassword.message}</FieldError>
          )}
        </Field>
      </FieldGroup>
    </div>
  );
};

export default AccountForm;
