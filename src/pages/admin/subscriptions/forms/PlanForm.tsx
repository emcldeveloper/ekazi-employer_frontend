import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type { Feature, Plan, PlanPayload } from "@/@types/subscriptions";
import { useCreatePlan, useUpdatePlan } from "@/hooks/subscription-plans";
import { getErrorMessage } from "@/utils/axios-helpers";
import { useFeatures } from "@/hooks/subscription-features";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const roles = [
  { label: "Employer", value: "employer" },
  { label: "Job Seeker", value: "applicant" },
];

const activeStates = [
  { label: "True", value: "true" },
  { label: "False", value: "false" },
];

interface PlanFormProps {
  plan?: Plan;
}

const PlanForm = ({ plan }: PlanFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<PlanPayload>({
    defaultValues: {
      features: [],
    },
  });

  const { mutate: createPlan, isPending: isCreating } = useCreatePlan();

  const { mutate: updatePlan, isPending: isUpdating } = useUpdatePlan();

  const isPending = isCreating || isUpdating;

  const { data: featuresData } = useFeatures();
  const features = featuresData?.data ?? [];

  const selectedFeatures = watch("features") ?? [];

  const handleFeatureChange = (feature: Feature, checked: boolean) => {
    const featureId = Number(feature.id);
    const currentFeatures = getValues("features") ?? [];

    if (checked) {
      if (currentFeatures.includes(featureId)) {
        return;
      }

      setValue("features", [...currentFeatures, featureId], {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    } else {
      setValue(
        "features",
        currentFeatures.filter((id) => id !== featureId),
        {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        },
      );
    }
  };

  useEffect(() => {
    if (plan) {
      reset({
        name: plan.name,
        price: plan.price,
        role: plan.role,
        current_type: plan.current_type,
        duration_days: plan.duration_days,
        job_post_limit: plan.job_post_limit,
        cv_download_limit: plan.cv_download_limit,
        cv_builder_limit: plan.cv_builder_limit,
        popular: plan.popular,
        is_active: plan.is_active,
        features: plan.features?.map((item) => Number(item.id)) ?? [],
      });
    }
  }, [plan, reset]);

  const onSubmit = (data: PlanPayload) => {
    console.log(data);

    if (plan) {
      updatePlan(
        {
          id: plan.id,
          payload: data,
        },
        {
          onSuccess: (res) => {
            toast.success(res?.message || "Plan updated successfully");
          },
          onError: (error) => {
            getErrorMessage(error || "Failed to update plan");
          },
        },
      );
    } else {
      createPlan(data, {
        onSuccess: () => {
          toast.success("Plan created successfully");
          reset();
        },
        onError: (error) => {
          getErrorMessage(error || "Failed to create plan");
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            {...register("name", {
              required: "Plan name is required",
            })}
          />
          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="price">Price</FieldLabel>
          <Input
            type="number"
            {...register("price", {
              required: "Plan price is required",
              valueAsNumber: true,
            })}
          />
          {errors.price && <FieldError>{errors.price.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="role">Role</FieldLabel>
          <Controller
            name="role"
            control={control}
            rules={{
              required: "Role is required",
            }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="role" className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>

                    {roles.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.role && <FieldError>{errors.role.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="duration_days">Duration(Days)</FieldLabel>
          <Input
            type="number"
            {...register("duration_days", {
              required: "Duration is required",
              valueAsNumber: true,
            })}
          />
          {errors.duration_days && (
            <FieldError>{errors.duration_days.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="job_post_limit">Job Post Limit</FieldLabel>
          <Input
            type="number"
            {...register("job_post_limit", { valueAsNumber: true })}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="cv_download_limit">CV Download Limit</FieldLabel>
          <Input
            type="number"
            {...register("cv_download_limit", { valueAsNumber: true })}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="cv_builder_limit">CV Builder Limit</FieldLabel>
          <Input
            type="number"
            {...register("cv_builder_limit", { valueAsNumber: true })}
          />
        </Field>

        {/*  */}
        <Field>
          <FieldLabel htmlFor="popular">Popular</FieldLabel>

          <Controller
            name="popular"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value === undefined ? "" : String(field.value)}
                onValueChange={(value) => field.onChange(value === "true")}
              >
                <SelectTrigger id="popular" className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Popular</SelectLabel>

                    {activeStates.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          {errors.popular && <FieldError>{errors.popular.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="is_active">Active</FieldLabel>

          <Controller
            name="is_active"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value === undefined ? "" : String(field.value)}
                onValueChange={(value) => field.onChange(value === "true")}
              >
                <SelectTrigger id="is_active" className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Active Status</SelectLabel>

                    {activeStates.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          {errors.is_active && (
            <FieldError>{errors.is_active.message}</FieldError>
          )}
        </Field>
      </FieldGroup>

      <FieldGroup className="grid grid-cols-2 gap-3">
        {features.map((feature: Feature) => (
          <Field key={feature.id} orientation="horizontal">
            <Checkbox
              checked={selectedFeatures.includes(Number(feature.id))}
              onCheckedChange={(checked) =>
                handleFeatureChange(feature, checked === true)
              }
            />

            <FieldLabel>
              {feature.name.replace(/^emp-/, "").replace(/-/g, " ")}
            </FieldLabel>
          </Field>
        ))}
      </FieldGroup>

      <FieldGroup>
        <Button type="submit" disabled={isPending}>
          {isPending
            ? plan
              ? "Updating..."
              : "Creating..."
            : plan
              ? "Update"
              : "Create"}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default PlanForm;
