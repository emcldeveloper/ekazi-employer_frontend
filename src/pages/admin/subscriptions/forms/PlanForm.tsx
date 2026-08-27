import { useEffect } from "react";
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

import type { Plan, PlanPayload } from "@/@types/subscriptions";
import { useCreatePlan, useUpdatePlan } from "@/hooks/subscription-plans";
import { getErrorMessage } from "@/utils/axios-helpers";

interface PlanFormProps {
  plan?: Plan;
}

const PlanForm = ({ plan }: PlanFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PlanPayload>();

  const { mutate: createPlan, isPending: isCreating } = useCreatePlan();

  const { mutate: updatePlan, isPending: isUpdating } = useUpdatePlan();

  const isPending = isCreating || isUpdating;

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
        features: [],
      });
    }
  }, [plan, reset]);

  const onSubmit = (data: PlanPayload) => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
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
          <FieldLabel htmlFor="price">Name</FieldLabel>
          <Input
            {...register("price", {
              required: "Plan price is required",
            })}
          />
          {errors.price && <FieldError>{errors.price.message}</FieldError>}
        </Field>

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
