import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import RichTextEditor from "@/components/RichTextEditor";

import { useAddMainDuties } from "@/hooks/jobs";
import type { JobMainDutiesData } from "@/@types/jobs";

interface MainDutiesFormProps {
  job: any;
  onSuccess?: () => void;
}

const MainDutiesForm = ({
  job,
  onSuccess: closeModal,
}: MainDutiesFormProps) => {
  const mainDuties = job?.job_duties?.main_duties;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JobMainDutiesData>();

  const { mutate: createMainDuties, isPending } = useAddMainDuties();

  // Pre fill data for editing
  useEffect(() => {
    if (mainDuties) {
      reset({
        main_duties: mainDuties || "",
      });
    }
  }, [mainDuties, reset]);

  const onSubmit = (data: JobMainDutiesData) => {
    createMainDuties(
      { ...data, job_id: job?.id },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Main Duties Added Succesfully");
          reset();
          closeModal?.();
        },
      },
    );
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
                <RichTextEditor
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              )}
            />

            {errors.main_duties && (
              <FieldError>{errors.main_duties.message}</FieldError>
            )}
          </Field>
        </FieldGroup>

        <Button type="submit" disabled={isPending} className="mt-4">
          {isPending ? "Adding..." : "Add Duties"}
        </Button>
      </form>
    </div>
  );
};

export default MainDutiesForm;
