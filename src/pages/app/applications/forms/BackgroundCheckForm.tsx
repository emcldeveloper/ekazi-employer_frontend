import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

import type { MessageFormData } from "@/@types/applications";
import { useBackgroundCheck } from "@/hooks/jobs";
import { getErrorMessage } from "@/utils/axios-helpers";

interface ScreeningFormProps {
  jobId: number;
  selectedApplications: number[];
  onSuccess?: () => void;
  onLoadingChange?: (loading: boolean) => void;
}

const BackgroundCheckForm = ({
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
  } = useForm<MessageFormData>();

  // Creating Job
  const { mutate: screenCandidates, isPending } = useBackgroundCheck();

  useEffect(() => {
    onLoadingChange?.(isPending);
  }, [isPending, onLoadingChange]);

  const onSubmit = async (data: MessageFormData) => {
    const payload = {
      stage_id: 6,
      applicant_id: selectedApplications,
      message_body: data.message_body,
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
      id="background-check-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <FieldGroup>
        <Field>
          <FieldLabel>Message</FieldLabel>
          <Textarea
            {...register("message_body", {
              required: "Message is required",
            })}
          />
          {errors.message_body && (
            <FieldError>{errors.message_body.message}</FieldError>
          )}
        </Field>
      </FieldGroup>
    </form>
  );
};

export default BackgroundCheckForm;
