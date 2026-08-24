import SearchSelect from "react-select";
import CreatableSelect from "react-select/creatable";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { InterviewFormData, InterviewType } from "@/@types/applications";
import { useInterview } from "@/hooks/jobs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInterviewTypes } from "@/hooks/universals/useInterviewTypes";
import { useCountries, useRegions } from "@/hooks/universals";
import type { Country, Region } from "@/@types/universals";
import type { OptionType } from "@/@types/jobs";
import { Textarea } from "@/components/ui/textarea";
import { useStaffs } from "@/hooks/staff";

interface InterviewFormProps {
  jobId: number;
  selectedApplications: number[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InterviewForm = ({
  jobId,
  selectedApplications,
  setOpen,
}: InterviewFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<InterviewFormData>();

  // universal data
  const { data: types = [] } = useInterviewTypes();

  const interviewType = watch("interview_type");

  const { data: staffs = [] } = useStaffs();
  const staffOptions = staffs?.map((staff: any) => ({
    value: staff.id,
    label: staff.first_name,
  }));

  const { data: countries = [] } = useCountries();
  const countryOptions = countries?.map((country: Country) => ({
    value: country.id,
    label: country.name,
  }));

  const { data: regions = [] } = useRegions();

  const selectedCountry = watch("country_id");

  const filteredRegions = regions
    ?.filter((region: Region) => region.country?.id === selectedCountry)
    .map((region: Region) => ({
      value: region.id,
      label: region.name,
    }));

  // Creating Job
  const { mutate: screenCandidates, isPending } = useInterview();

  const onSubmit = async (data: InterviewFormData) => {
    const payload = {
      stage_id: 4,
      applicant_id: selectedApplications,
      region_id: data.region_id,
      interview_type: data.interview_type,
      interviewer: data.interviewer,
      interviewer_participant: data.interviewer_participant,
      address: data.address,
      message_body: data.message_body,
      invite_date: data.invite_date,
      duration_test: data.duration_test,
      online_link: data.online_link,
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
      <FieldGroup className="grid grid-cols-2">
        <Field>
          <FieldLabel>Interview Date*</FieldLabel>
          <Input
            type="date"
            {...register("invite_date", {
              required: "Invite is required",
            })}
          />
          {errors.invite_date && (
            <FieldError>{errors.invite_date.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Interview Type</FieldLabel>
          <Controller
            name="interview_type"
            control={control}
            rules={{ required: "Interview type is required" }}
            render={({ field }) => (
              <Select
                value={field.value ? String(field.value) : ""}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select interview type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Types</SelectLabel>

                    {types.map((item: InterviewType) => (
                      <SelectItem key={item.id} value={String(item.id)}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          {errors.interview_type && (
            <FieldError>{errors.interview_type.message}</FieldError>
          )}
        </Field>

        {interviewType === 2 && (
          <Field>
            <FieldLabel>Interview Link</FieldLabel>
            <Input
              type="url"
              {...register("online_link", {
                required: "Interview link is required",
              })}
            />
            {errors.online_link && (
              <FieldError>{errors.online_link.message}</FieldError>
            )}
          </Field>
        )}

        {interviewType === 1 && (
          <>
            <Field>
              <FieldLabel>Country</FieldLabel>
              <Controller
                name="country_id"
                control={control}
                rules={{ required: "Country is required" }}
                render={({ field }) => (
                  <SearchSelect
                    {...field}
                    isClearable
                    options={countryOptions}
                    value={countryOptions.find(
                      (option: OptionType) => option.value === field.value,
                    )}
                    onChange={(option) => field.onChange(option?.value ?? null)}
                  />
                )}
              />
              {errors.country_id && (
                <FieldError>{errors.country_id.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel>Region</FieldLabel>
              <Controller
                name="region_id"
                control={control}
                rules={{ required: "Region is required" }}
                render={({ field }) => (
                  <SearchSelect
                    {...field}
                    isClearable
                    isDisabled={!selectedCountry}
                    options={filteredRegions}
                    value={filteredRegions.find(
                      (option: OptionType) => option.value === field.value,
                    )}
                    onChange={(option) => field.onChange(option?.value ?? null)}
                  />
                )}
              />
              {errors.region_id && (
                <FieldError>{errors.region_id.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel>Address</FieldLabel>
              <Input
                {...register("address", {
                  required: "Address is required",
                })}
              />
              {errors.address && (
                <FieldError>{errors.address.message}</FieldError>
              )}
            </Field>
          </>
        )}

        <Field>
          <FieldLabel>Duration</FieldLabel>
          <Input
            type="text"
            {...register("duration_test", {
              required: "Duration is required",
            })}
          />
          {errors.duration_test && (
            <FieldError>{errors.duration_test.message}</FieldError>
          )}
        </Field>
      </FieldGroup>

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

        <Field>
          <FieldLabel>Interviewer(s)</FieldLabel>
          <Controller
            name="interviewer"
            control={control}
            rules={{ required: "Enter at least one interviewer" }}
            render={({ field }) => (
              <SearchSelect
                {...field}
                isClearable
                isMulti
                options={staffOptions}
                value={staffOptions.filter((option: OptionType) =>
                  field.value?.includes(option.value),
                )}
                onChange={(selectedOptions) =>
                  field.onChange(
                    selectedOptions
                      ? selectedOptions.map((option) => option.value)
                      : [],
                  )
                }
              />
            )}
          />
          {errors.interviewer && (
            <FieldError>{errors.interviewer.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Interviewer Participant(s)</FieldLabel>
          <Controller
            name="interviewer_participant"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <CreatableSelect
                isMulti
                placeholder="Type an email and press Enter..."
                options={[]}
                value={(field.value ?? []).map((email: string) => ({
                  label: email,
                  value: email,
                }))}
                onChange={(selected) =>
                  field.onChange(selected.map((option) => option.value))
                }
              />
            )}
          />
          {errors.interviewer && (
            <FieldError>{errors.interviewer.message}</FieldError>
          )}
        </Field>
      </FieldGroup>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Moving..." : `Move Candidate(s)`}
      </Button>
    </form>
  );
};

export default InterviewForm;
