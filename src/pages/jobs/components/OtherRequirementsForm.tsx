import type { JobOtherRequirementData } from "@/@types/jobs";
import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { useAddOtherRequirement } from "@/hooks/jobs";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface OtherRequirementsFormProps {
  job: any;
  onSuccess?: () => void;
}

const OtherRequirementsForm = ({
  job,
  onSuccess: closeModal,
}: OtherRequirementsFormProps) => {
  // Variables
  const otherRequirements = job?.job_other_requirement?.other_requirement;

  const { control, handleSubmit, reset } = useForm<JobOtherRequirementData>();

  const { mutate: createOtherRequirement, isPending } =
    useAddOtherRequirement();

  // Pre fill data for editing
  useEffect(() => {
    if (otherRequirements) {
      reset({
        other_requirement: otherRequirements || "",
      });
    }
  }, [otherRequirements, reset]);

  const onSubmit = (data: JobOtherRequirementData) => {
    createOtherRequirement(
      { ...data, job_id: job?.id },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Other requiremwnts added succesfully");
          reset();
          closeModal?.();
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="mt-5">
          <Field>
            <Controller
              name="other_requirement"
              control={control}
              rules={{
                required: "Main duties are required",
              }}
              render={({ field }) => (
                <RichTextEditor
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              )}
            />
          </Field>
        </FieldGroup>

        <Button type="submit" disabled={isPending} className="mt-4">
          {isPending ? "Saving..." : "Save Requirements"}
        </Button>
      </form>
    </div>
  );
};

export default OtherRequirementsForm;
