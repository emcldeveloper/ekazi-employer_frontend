import type { Job } from "@/@types/job";
import type { JobSettingsForm } from "@/@types/job-forms";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useJobSettings } from "@/hooks/jobs";
import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

const items = [
  { label: "Email", value: "email" },
  { label: "Link", value: "external_url" },
];

interface JobSettingsProps {
  job: Job;
}

const JobSettings = ({ job }: JobSettingsProps) => {
  const jobId = job?.id;

  const [open, setOpen] = useState(false);

  const { register, handleSubmit, control, reset, setValue } =
    useForm<JobSettingsForm>({
      defaultValues: {
        show_client_name: false,
        apply_condition: false,
        apply_type: "",
        email: "",
        external_url: "",
      },
    });

  const { mutate: updateJobSettings, isPending } = useJobSettings();

  const applyCondition = useWatch({
    control,
    name: "apply_condition",
  });

  const applyType = useWatch({
    control,
    name: "apply_type",
  });

  useEffect(() => {
    if (!applyCondition) {
      setValue("apply_type", "");
      setValue("email", "");
      setValue("external_url", "");
    }
  }, [applyCondition, setValue]);

  useEffect(() => {
    if (applyType === "email") {
      setValue("external_url", "");
    }

    if (applyType === "external_url") {
      setValue("email", "");
    }
  }, [applyType, setValue]);

  // PRE FILL FORM DATA FOR EXISTING JOB SETTINGS
  useEffect(() => {
    if (!job) return;

    const hasEmail = !!job.job_email;
    const hasExternalUrl = !!job.job_externalUrl;

    reset({
      show_client_name: job.show_client_name,
      apply_condition: hasEmail || hasExternalUrl,
      apply_type: hasEmail ? "email" : hasExternalUrl ? "external_url" : "",
      email: job.job_email?.name ?? "",
      external_url: job.job_externalUrl?.name ?? "",
    });
  }, [job, reset]);

  const onSubmit = (data: JobSettingsForm) => {
    const payload = {
      show_client_name: data.show_client_name,
      apply_condition: data.apply_condition,
      apply_type: data.apply_condition ? data.apply_type : "",
      email: data.apply_type === "email" ? data.email : "",
      external_url: data.apply_type === "external_url" ? data.external_url : "",
    };

    updateJobSettings(
      {
        jobId,
        payload,
      },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Job settings updated succesfully");
          reset();
          setOpen(false);
        },
        onError: () => {
          toast.error("Failed to update job settings");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => {}}
          className="w-full justify-between"
        >
          Job Settings
          <Settings size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Job Settings</DialogTitle>
        </DialogHeader>
        <div className="-mx-4 scrollbar-auto max-h-[70vh] overflow-y-auto px-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <FieldLabel>
                <Field orientation="horizontal">
                  <Controller
                    name="show_client_name"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <FieldContent>
                    <FieldTitle>Client Information</FieldTitle>
                    <FieldDescription>
                      Display client name and logo on ekazi job post.
                    </FieldDescription>
                  </FieldContent>
                </Field>
              </FieldLabel>

              <FieldLabel>
                <Field orientation="horizontal">
                  <Controller
                    name="apply_condition"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <FieldContent>
                    <FieldTitle>Application Goes To</FieldTitle>
                    <FieldDescription>
                      Select additional ways to receive applications.
                    </FieldDescription>
                  </FieldContent>
                </Field>
              </FieldLabel>

              {applyCondition && (
                <Field>
                  <FieldLabel>Select Way</FieldLabel>

                  <Controller
                    name="apply_type"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Type</SelectLabel>

                            {items.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>
              )}

              {applyCondition && applyType === "email" && (
                <Field>
                  <FieldLabel>Email Address</FieldLabel>

                  <Input type="email" {...register("email")} />
                </Field>
              )}

              {applyCondition && applyType === "external_url" && (
                <Field>
                  <FieldLabel>External URL</FieldLabel>

                  <Input type="url" {...register("external_url")} />
                </Field>
              )}

              <Button disabled={isPending}>
                {isPending ? "Submitting" : "Submit"}
              </Button>
            </FieldGroup>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobSettings;
