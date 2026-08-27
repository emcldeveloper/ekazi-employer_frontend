import { Controller, useForm } from "react-hook-form";
import SearchSelect from "react-select";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useJobs, useShortlist } from "@/hooks/jobs";
import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";
import type { Job } from "@/@types/job";
import type { OptionType } from "@/@types/jobs";
import { getErrorMessage } from "@/utils/axios-helpers";
import type { ShortlistJobForm } from "@/@types/jobseekers";
import { toast } from "sonner";

interface ShortlistJobseekerProps {
  jobseekerId: number;
}

const ShortlistJobseeker = ({ jobseekerId }: ShortlistJobseekerProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ShortlistJobForm>();

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const { data: jobsData } = useJobs({
    search: debouncedSearch,
  });

  const jobs = jobsData?.data ?? [];

  const jobOptions =
    jobs?.map((type: Job) => ({
      value: type.id,
      label: type.position.position_name,
    })) ?? [];

  const { mutate: shortlistCandidate, isPending } = useShortlist();

  const onSubmit = (data: ShortlistJobForm) => {
    const payload = {
      stage_id: 2,
      applicant_id: [jobseekerId],
    };

    shortlistCandidate(
      { jobId: data.job_id, payload },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Job seeker shortlisted successfully");
          reset();
          setSearch("");
        },
        onError: (error) => {
          getErrorMessage(error || "Failed to shortlist candidate");
        },
      },
    );
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Shortlist Jobseeker</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Shortlist Job Sekeer</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="job_id">Select Job</FieldLabel>
                <Controller
                  name="job_id"
                  control={control}
                  rules={{
                    required: "Job is required",
                  }}
                  render={({ field }) => (
                    <SearchSelect
                      {...field}
                      isClearable
                      options={jobOptions}
                      value={jobOptions.find(
                        (option: OptionType) => option.value === field.value,
                      )}
                      onChange={(option) =>
                        field.onChange(option?.value ?? null)
                      }
                      onInputChange={setSearch}
                    />
                  )}
                />
                {errors.job_id && (
                  <FieldError>{errors.job_id.message}</FieldError>
                )}
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Shortlisting..." : "Shortlist"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShortlistJobseeker;
