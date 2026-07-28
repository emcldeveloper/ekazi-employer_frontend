import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
} from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { MessageFormData } from "@/@types/applications";
import { useOffer } from "@/hooks/jobs";
import { Textarea } from "@/components/ui/textarea";

interface ScreeningFormProps {
  jobId: number;
  selectedApplications: number[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OfferForm = ({
  jobId,
  selectedApplications,
  setOpen,
}: ScreeningFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageFormData>();

  // Creating Job
  const { mutate: screenCandidates, isPending } = useOffer();

  const onSubmit = async (data: MessageFormData) => {
    const payload = {
      stage_id: 93,
      applicant_id: selectedApplications,
      message_body: data.message_body,
    };

    screenCandidates(
      { jobId, payload },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Moved stage succesfully");
          setOpen(false);
          reset();
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      <Button type="submit" disabled={isPending}>
        {isPending ? "Moving..." : `Move Candidate(s)`}
      </Button>
    </form>
  );
};

export default OfferForm;
