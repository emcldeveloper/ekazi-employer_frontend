import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";

import type { Job } from "@/@types/job";
import { useAddOtherRequirement, useEditOtherRequirement } from "@/hooks/jobs";
import type { JobOtherRequirementForm } from "@/@types/job-forms";

interface OtherRequirementsFormProps {
  job: Job;
  onSuccess?: () => void;
}

const OtherRequirementsForm = ({
  job,
  onSuccess: closeModal,
}: OtherRequirementsFormProps) => {
  // Variables
  const requirementsId = job?.other_requirements?.[0]?.id;
  const otherRequirements = job?.other_requirements?.[0]?.other_requirement;

  const isEditMode = Boolean(requirementsId);

  const { control, handleSubmit, reset } = useForm<JobOtherRequirementForm>();

  const { mutate: createOtherRequirement, isPending: isCreating } =
    useAddOtherRequirement();
  const { mutate: updateOtherRequirement, isPending: isUpdating } =
    useEditOtherRequirement();

  // Pre fill data for editing
  useEffect(() => {
    reset({
      other_requirement: otherRequirements || "",
    });
  }, [otherRequirements, reset]);

  const onSubmit = (data: JobOtherRequirementForm) => {
    const payload = { ...data, job_id: job?.id };

    if (requirementsId) {
      updateOtherRequirement(
        { id: requirementsId, payload },
        {
          onSuccess: (res) => {
            toast.success(res?.message || "Updates successfully");
            closeModal?.();
          },
          onError: () => {
            toast.error("Failed to update");
          },
        },
      );
    } else {
      createOtherRequirement(payload, {
        onSuccess: (res) => {
          toast.success(res?.message || "Other requirements added succesfully");
          reset();
          closeModal?.();
        },
        onError: () => {
          toast.error("Failed to add other requirements");
        },
      });
    }
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

        <Button
          type="submit"
          disabled={isCreating || isUpdating}
          className="mt-4"
        >
          {isCreating || isUpdating
            ? isEditMode
              ? "Updating..."
              : "Adding..."
            : isEditMode
              ? "Update Requirements"
              : "Add Requirements"}
        </Button>
      </form>
    </div>
  );
};

export default OtherRequirementsForm;
