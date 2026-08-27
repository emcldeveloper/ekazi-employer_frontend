import type { Feature, FeaturePayload } from "@/@types/subscriptions";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  useCreateFeature,
  useUpdateFeature,
} from "@/hooks/subscription-features";
import { getErrorMessage } from "@/utils/axios-helpers";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FeatureFormProps {
  feature?: Feature;
}

const FeatureForm = ({ feature }: FeatureFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeaturePayload>();

  const { mutate: createFeature, isPending: isCreating } = useCreateFeature();

  const { mutate: updateFeature, isPending: isUpdating } = useUpdateFeature();

  const isPending = isCreating || isUpdating;

  useEffect(() => {
    if (feature) {
      reset({
        feature_name: feature.name,
      });
    }
  }, [feature, reset]);

  const onSubmit = (data: FeaturePayload) => {
    if (feature) {
      updateFeature(
        {
          id: feature.id,
          payload: data,
        },
        {
          onSuccess: (res) => {
            toast.success(res?.message || "Feature updated successfully");
          },
          onError: (error) => {
            getErrorMessage(error || "Failed to update feature");
          },
        },
      );
    } else {
      createFeature(data, {
        onSuccess: () => {
          toast.success("Feature created successfully");
          reset();
        },
        onError: (error) => {
          getErrorMessage(error || "Failed to create feature");
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="feature_name">Name</FieldLabel>
          <Input
            {...register("feature_name", {
              required: "Feature name is required",
            })}
          />
          {errors.feature_name && (
            <FieldError>{errors.feature_name.message}</FieldError>
          )}
        </Field>

        <Button type="submit" disabled={isPending}>
          {isPending
            ? feature
              ? "Updating..."
              : "Creating..."
            : feature
              ? "Update"
              : "Create"}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default FeatureForm;
