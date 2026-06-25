import type { JobReportingData } from "@/@types/jobs";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { useAddReporting } from "@/hooks/jobs";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface ReportingFormProps {
  job: any;
  onSuccess?: () => void;
}

const ReportingForm = ({ job, onSuccess: closeModal }: ReportingFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JobReportingData>();

  const { mutate: createMainDuties, isPending } = useAddReporting();

  useEffect(() => {
    reset({
      report_to: job?.job_report_to?.report_to || "",
      supervises: job?.job_report_to?.supervises || "",
      interacts_with: job?.job_report_to?.interacts_with || "",
    });
  }, [job, reset]);

  const onSubmit = (data: JobReportingData) => {
    createMainDuties(
      { ...data, job_id: job?.id },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Requirements Added Succesfully");
          reset();
          closeModal?.();
        },
      },
    );
  };

  //   job_id: number;

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel>Report to</FieldLabel>
            <Input
              {...register("report_to", {
                required: "Report to is required",
              })}
            />
            {errors.report_to && (
              <FieldError>{errors.report_to.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Supervises</FieldLabel>
            <Input
              {...register("supervises", {
                required: "Supervise is required",
              })}
            />
            {errors.supervises && (
              <FieldError>{errors.supervises.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Interacts with</FieldLabel>
            <Input
              {...register("interacts_with", {
                required: "Interact with is required",
              })}
            />
            {errors.interacts_with && (
              <FieldError>{errors.interacts_with.message}</FieldError>
            )}
          </Field>
        </FieldGroup>

        <Button type="submit" disabled={isPending} className="mt-4">
          {isPending ? "Adding..." : "Add Reporting"}
        </Button>
      </form>
    </div>
  );
};

export default ReportingForm;
