import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
} from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { ScreeningFormData } from "@/@types/applications";
import { useScreening } from "@/hooks/jobs";
import { getErrorMessage } from "@/utils/axios-helpers";
import { useEffect } from "react";

interface ScreeningFormProps {
  jobId: number;
  selectedApplications: number[];
  onSuccess?: () => void;
  onLoadingChange?: (loading: boolean) => void;
}

const ScreeningForm = ({
  jobId,
  selectedApplications,
  onLoadingChange,
  onSuccess: closeModal,
}: ScreeningFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ScreeningFormData>();

  // Screening candidate
  const { mutate: screenCandidates, isPending } = useScreening();

  useEffect(() => {
    onLoadingChange?.(isPending);
  }, [isPending, onLoadingChange]);

  const onSubmit = async (data: ScreeningFormData) => {
    const payload = {
      stage_id: 3,
      applicant_id: selectedApplications,
      test_date: data.test_date,
      test_duration: data.test_duration,
      test_deadline: data.test_deadline,
    };

    screenCandidates(
      { jobId, payload },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Moved stage succesfully");
          closeModal?.();
          reset();
        },
        onError: (err) => {
          toast.error(getErrorMessage(err));
        },
      },
    );
  };

  return (
    <form
      id="screening-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <FieldGroup className="grid grid-cols-2">
        <Field>
          <FieldLabel>Test Date*</FieldLabel>
          <Input
            type="date"
            {...register("test_date", {
              required: "Date is required",
            })}
          />
          {errors.test_date && (
            <FieldError>{errors.test_date.message}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel>Deadline*</FieldLabel>
          <Input
            type="date"
            {...register("test_deadline", {
              required: "Deadline is required",
            })}
          />
          {errors.test_deadline && (
            <FieldError>{errors.test_deadline.message}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel>Duration(Min)*</FieldLabel>
          <Input
            type="number"
            {...register("test_duration", {
              required: "Test duration is required",
              valueAsNumber: true,
            })}
          />
          {errors.test_duration && (
            <FieldError>{errors.test_duration.message}</FieldError>
          )}
        </Field>
      </FieldGroup>
    </form>
  );
};

export default ScreeningForm;
