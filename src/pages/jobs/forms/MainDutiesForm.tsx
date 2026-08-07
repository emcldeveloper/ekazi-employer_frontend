import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import RichTextEditor from "@/components/RichTextEditor";

import { useAddMainDuties, useEditMainDuties } from "@/hooks/jobs";
import type { Job } from "@/@types/job";
import type { JobMainDutiesForm } from "@/@types/job-forms";

interface MainDutiesFormProps {
  job: Job;
  onSuccess?: () => void;
}

const MainDutiesForm = ({
  job,
  onSuccess: closeModal,
}: MainDutiesFormProps) => {
  const dutiesId = job?.requirements?.[0]?.id;
  const mainDuties = job?.requirements?.[0]?.main_duties;

  const isEditMode = Boolean(dutiesId);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JobMainDutiesForm>({
    defaultValues: {
      main_duties: "",
    },
  });

  const { mutate: createMainDuties, isPending: isCreating } =
    useAddMainDuties();
  const { mutate: updateMainDuties, isPending: isEditing } =
    useEditMainDuties();

  // Pre fill data for editing
  useEffect(() => {
    reset({
      main_duties: mainDuties ?? "",
    });
  }, [mainDuties, reset]);

  const onSubmit = (data: JobMainDutiesForm) => {
    const payload = {
      ...data,
      job_id: job.id,
    };

    if (dutiesId) {
      updateMainDuties(
        { id: dutiesId, payload },
        {
          onSuccess: (res) => {
            toast.success(res?.message || "Main duties updated successfully");
            closeModal?.();
          },
          onError: () => {
            toast.error("Failed to update");
          },
        },
      );
    } else {
      createMainDuties(payload, {
        onSuccess: (res) => {
          toast.success(res?.message || "Main duties added successfully");
          reset();
          closeModal?.();
        },
        onError: () => {
          toast.error("Failed to add main duties");
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field>
            <Controller
              name="main_duties"
              control={control}
              rules={{
                required: "Main duties are required",
              }}
              render={({ field }) => (
                <RichTextEditor value={field.value} onChange={field.onChange} />
              )}
            />

            {errors.main_duties && (
              <FieldError>{errors.main_duties.message}</FieldError>
            )}
          </Field>
        </FieldGroup>

        <Button
          type="submit"
          disabled={isCreating || isEditing}
          className="mt-4"
        >
          {isCreating || isEditing
            ? isEditMode
              ? "Updating..."
              : "Adding..."
            : isEditMode
              ? "Update Duties"
              : "Add Duties"}
        </Button>
      </form>
    </div>
  );
};

export default MainDutiesForm;
