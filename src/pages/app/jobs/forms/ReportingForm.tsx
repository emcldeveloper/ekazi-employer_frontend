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
import { useEffect } from "react";
import type { Job } from "@/@types/job";

interface ReportingFormProps {
  createdJobId?: number;
  job?: Job;
  onSuccess?: () => void;
  onBack?: () => void;
  onLoadingChange?: (loading: boolean) => void;
}

const ReportingForm = ({
  createdJobId,
  job,
  onSuccess: closeModal,
  onLoadingChange,
}: ReportingFormProps) => {
  const jobId = job?.id ?? createdJobId;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JobReportingData>();

  const { mutate: createMainDuties, isPending } = useAddReporting();

  useEffect(() => {
    onLoadingChange?.(isPending);
  }, [isPending, onLoadingChange]);

  useEffect(() => {
    reset({
      report_to: job?.report_to?.[0]?.report_to || "",
      supervises: job?.report_to?.[0]?.supervises || "",
      interacts_with: job?.report_to?.[0]?.interacts_with || "",
    });
  }, [job, reset]);

  const onSubmit = (data: JobReportingData) => {
    if (!jobId) {
      return;
    }

    createMainDuties(
      { ...data, job_id: jobId },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Requirements Added Succesfully");
          reset();
          closeModal?.();
        },
      },
    );
  };

  return (
    <form id="reporting-form" onSubmit={handleSubmit(onSubmit)}>
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

      {/* <Button type="submit" disabled={isPending} className="mt-4">
          {isPending ? "Adding..." : "Add Reporting"}
        </Button> */}
    </form>
  );
};

export default ReportingForm;
