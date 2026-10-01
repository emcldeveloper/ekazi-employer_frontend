import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import RichTextEditor from "@/components/RichTextEditor";

import { useAddMainDuties, useEditMainDuties } from "@/hooks/jobs";
import type { Job } from "@/@types/job";
import type { JobMainDutiesForm } from "@/@types/job-forms";

interface MainDutiesFormProps {
  createdJobId?: number;
  job?: Job;
  onSuccess?: () => void;
  onBack?: () => void;
  onLoadingChange?: (loading: boolean) => void;
}

const MainDutiesForm = ({
  createdJobId,
  job,
  onSuccess: closeModal,
  onLoadingChange,
}: MainDutiesFormProps) => {
  const jobId = job?.id ?? createdJobId;
  const dutiesId = job?.requirements?.[0]?.id;
  const mainDuties = job?.requirements?.[0]?.main_duties;

  // const isEditMode = Boolean(dutiesId);

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
  const { mutate: updateMainDuties, isPending: isUpdating } =
    useEditMainDuties();

  const isPending = isCreating || isUpdating;

  useEffect(() => {
    onLoadingChange?.(isPending);
  }, [isPending, onLoadingChange]);

  // Pre fill data for editing
  useEffect(() => {
    reset({
      main_duties: mainDuties ?? "",
    });
  }, [mainDuties, reset]);

  const onSubmit = (data: JobMainDutiesForm) => {
    if (!jobId) {
      toast.error("Job ID is missing");
      return;
    }

    const payload = {
      ...data,
      job_id: jobId,
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
      <form id="main-duties-form" onSubmit={handleSubmit(onSubmit)}>
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

        {/* <Button
          type="submit"
          disabled={isCreating || isUpdating}
          className="mt-4"
        >
          {isCreating || isUpdating
            ? isEditMode
              ? "Updating..."
              : "Adding..."
            : isEditMode
              ? "Update Duties"
              : "Add Duties"}
        </Button> */}
      </form>
    </div>
  );
};

export default MainDutiesForm;
