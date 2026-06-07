import type { JobMainDutiesData } from "@/@types/jobs";
import { Button } from "@/components/ui/button";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Textarea } from "@/components/ui/textarea";
import { useAddMainDuties } from "@/hooks/jobs";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface LocationFormProps {
  jobId: number;
  onSuccess: () => void;
}

const LocationForm = ({ jobId, onSuccess: nextStep }: LocationFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JobMainDutiesData>();

  const { mutate: createMainDuties, isPending } = useAddMainDuties();

  const onSubmit = (data: JobMainDutiesData) => {
    createMainDuties(
      { ...data, job_id: jobId },
      {
        onSuccess: (res) => {
          nextStep();
          toast.success(res?.message || "Main Duties Added Succesfully");
          reset();
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel>Main Duties</FieldLabel>
          <Textarea
            placeholder="Enter other requirements..."
            {...register("main_duties", {
              required: "Other requirements are required",
            })}
          />
          {errors.main_duties && (
            <FieldError>{errors.main_duties.message}</FieldError>
          )}
        </Field>
      </FieldGroup>

      <Button type="submit" disabled={isPending} className="mt-4">
        {isPending ? "Saving..." : "Save"}
      </Button>
    </form>
  );
};

export default LocationForm;
