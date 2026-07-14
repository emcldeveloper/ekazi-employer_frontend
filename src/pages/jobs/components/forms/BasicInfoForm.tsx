import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import SearchSelect from "react-select";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import type { OptionType } from "@/@types/jobs";
import type {
  Country,
  Industry,
  JobType,
  Position,
  PositionLevel,
  Region,
  SalaryRange,
} from "@/@types/universals";
import { useCreateJob, useEditJob } from "@/hooks/jobs";
import {
  useCountries,
  useIndustries,
  useJobTypes,
  useRegions,
  useSalaryRange,
} from "@/hooks/universals";
import { usePositionLevels } from "@/hooks/universals/usePositionLevels";
import { usePositions } from "@/hooks/universals/usePositions";
import { useNavigate } from "react-router-dom";
import type { Job } from "@/@types/job";
import type { JobCreateForm } from "@/@types/job-forms";

interface BasicInfoFormProps {
  job?: Job;
  onSuccess?: () => void;
}

const BasicInfoForm = ({ job, onSuccess: closeModal }: BasicInfoFormProps) => {
  const jobId = job?.id;
  const navigate = useNavigate();

  const [positionSearch, setPositionSearch] = useState("");
  const [industrySearch, setIndustrySearch] = useState("");

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<JobCreateForm>();

  // Creating Job
  const { mutate: createJob, isPending: isCreating } = useCreateJob();

  // Editing Job
  const { mutate: updateJob, isPending: isUpdating } = useEditJob();

  // fetch job types
  const { data: jobTypes } = useJobTypes();
  const jobTypeOptions =
    jobTypes?.map((type: JobType) => ({
      value: type.id,
      label: type.type_name,
    })) ?? [];

  // fetch positions
  const { data: positions } = usePositions(positionSearch);
  const positionOptions: OptionType[] =
    positions?.data?.map((position: Position) => ({
      value: position.id,
      label: position.name,
    })) ?? [];

  // fetch position levels
  const { data: positionLevels } = usePositionLevels();
  const positionLevelOptions =
    positionLevels?.map((level: PositionLevel) => ({
      value: level.id,
      label: level.name,
    })) ?? [];

  // fetch industries
  const { data: industries } = useIndustries(industrySearch);
  const industryOptions =
    industries?.map((industry: Industry) => ({
      value: industry.id,
      label: industry.name,
    })) ?? [];

  // fetch salary ranges
  const { data: salaryRanges } = useSalaryRange();
  const salaryOptions =
    salaryRanges?.map((range: SalaryRange) => ({
      value: range.id,
      label: Number(range.low).toLocaleString(),
    })) ?? [];

  // fetch countries
  const { data: countries } = useCountries();
  const countryOptions =
    countries?.map((country: Country) => ({
      value: country.id,
      label: country.name,
    })) ?? [];

  // fetch regions
  const { data: regions } = useRegions();

  // PRE FILL DATA FOR EDITING
  useEffect(() => {
    if (job) {
      reset({
        position_id: job?.position?.id,
        type_id: job?.job_type?.id,
        dead_line: job?.dead_line,
        quantity: job?.quantity,
        country_id: job?.country?.id,
        category_id: job?.category?.id,
        position_level_id: job?.position_level?.id,
        region_id: job?.region?.id,
        industry_id: job?.industry?.id,
        from_salary: job?.salaries?.[0]?.from_salary?.id,
        to_salary: job?.salaries?.[0]?.to_salary?.id,
        sub_location: job?.addresses?.[0]?.sub_location,
      });
    }
  }, [job, reset]);

  const selectedCountry = watch("country_id");
  const selectedRegion = watch("region_id");

  useEffect(() => {
    if (!job) {
      setValue("region_id", null);
    }
  }, [selectedCountry, setValue, job]);

  const filteredRegions =
    regions
      ?.filter((region: Region) => region.country?.id === selectedCountry)
      .map((region: Region) => ({
        value: region.id,
        label: region.name,
      })) ?? [];

  const onSubmit = async (data: JobCreateForm) => {
    if (jobId) {
      await updateJob(
        {
          id: jobId,
          payload: data,
        },
        {
          onSuccess: (res) => {
            toast.success(res?.message || "Job updated succesfully");
            reset();
            closeModal?.();
          },
        },
      );
    } else {
      createJob(data, {
        onSuccess: (res) => {
          const jobId = res.data.id;
          toast.success(res?.message || "Job created succesfully");
          navigate(`/jobs/${jobId}`);
          reset();
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Job title */}
        <Field>
          <FieldLabel htmlFor="title">Job Title</FieldLabel>
          <Controller
            name="position_id"
            rules={{ required: "Title is required" }}
            control={control}
            render={({ field }) => (
              <CreatableSelect
                options={positionOptions}
                value={positionOptions.find(
                  (option: OptionType) => option.value === field.value,
                )}
                onChange={(option) => field.onChange(option?.value)}
                onInputChange={setPositionSearch}
                isClearable
              />
            )}
          />
          {errors.position_id && (
            <FieldError className="">{errors.position_id.message}</FieldError>
          )}
        </Field>

        {/* Job Type */}
        <Field>
          <FieldLabel htmlFor="type_id">Job Type</FieldLabel>
          <Controller
            name="type_id"
            control={control}
            rules={{
              required: "Job type is required",
            }}
            render={({ field }) => (
              <SearchSelect
                {...field}
                isClearable
                options={jobTypeOptions}
                value={jobTypeOptions.find(
                  (option: OptionType) => option.value === field.value,
                )}
                onChange={(option) => field.onChange(option?.value ?? null)}
              />
            )}
          />
          {errors.type_id && <FieldError>{errors.type_id.message}</FieldError>}
        </Field>

        {/* Number of positions */}
        <Field>
          <FieldLabel htmlFor="quantity">Number of Positions</FieldLabel>
          <Input
            id="quantity"
            type="number"
            min={1}
            placeholder="1"
            {...register("quantity", {
              required: "Number of positions is required",
              valueAsNumber: true,
              min: {
                value: 1,
                message: "Number of positions must be greater than 0",
              },
            })}
          />
          {errors.quantity && (
            <FieldError>{errors.quantity.message}</FieldError>
          )}
        </Field>

        {/* Position levels */}
        <Field>
          <FieldLabel htmlFor="position_level_id">Position Level</FieldLabel>
          <Controller
            name="position_level_id"
            control={control}
            rules={{
              required: "Position level is required",
            }}
            render={({ field }) => (
              <SearchSelect
                {...field}
                isClearable
                options={positionLevelOptions}
                value={positionLevelOptions.find(
                  (option: OptionType) => option.value === field.value,
                )}
                onChange={(option) => field.onChange(option?.value ?? null)}
              />
            )}
          />
          {errors.position_level_id && (
            <FieldError>{errors.position_level_id.message}</FieldError>
          )}
        </Field>

        {/* Job Category */}
        <Field>
          <FieldLabel htmlFor="category_id">Category</FieldLabel>
          <Controller
            name="category_id"
            control={control}
            rules={{
              required: "Category is required",
            }}
            render={({ field }) => (
              <SearchSelect
                {...field}
                isClearable
                options={industryOptions}
                value={industryOptions.find(
                  (option: OptionType) => option.value === field.value,
                )}
                onChange={(option) => field.onChange(option?.value ?? null)}
                onInputChange={setIndustrySearch}
              />
            )}
          />
          {errors.category_id && (
            <FieldError>{errors.category_id.message}</FieldError>
          )}
        </Field>

        {/* Industries */}
        <Field>
          <FieldLabel htmlFor="industry_id">Industry</FieldLabel>
          <Controller
            name="industry_id"
            control={control}
            rules={{
              required: "Industry is required",
            }}
            render={({ field }) => (
              <SearchSelect
                {...field}
                isClearable
                options={industryOptions}
                value={industryOptions.find(
                  (option: OptionType) => option.value === field.value,
                )}
                onChange={(option) => field.onChange(option?.value ?? null)}
                onInputChange={setIndustrySearch}
              />
            )}
          />
          {errors.industry_id && (
            <FieldError>{errors.industry_id.message}</FieldError>
          )}
        </Field>

        {/* Salary range */}
        <Field>
          <FieldLabel htmlFor="from_salary_id">Minimum Salary</FieldLabel>
          <Controller
            name="from_salary"
            control={control}
            rules={{
              required: "Minimum salary is required",
            }}
            render={({ field }) => (
              <SearchSelect
                {...field}
                isClearable
                options={salaryOptions}
                value={salaryOptions.find(
                  (option: OptionType) => option.value === field.value,
                )}
                onChange={(option) => field.onChange(option?.value ?? null)}
              />
            )}
          />
          {errors.from_salary && (
            <FieldError>{errors.from_salary.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="to_salary_id">Maximum Salary</FieldLabel>
          <Controller
            name="to_salary"
            control={control}
            rules={{
              required: "Maximum salary is required",
            }}
            render={({ field }) => (
              <SearchSelect
                {...field}
                isClearable
                options={salaryOptions}
                value={salaryOptions.find(
                  (option: OptionType) => option.value === field.value,
                )}
                onChange={(option) => field.onChange(option?.value ?? null)}
              />
            )}
          />
          {errors.to_salary && (
            <FieldError>{errors.to_salary.message}</FieldError>
          )}
        </Field>

        {/* Location */}
        <Field>
          <FieldLabel>Country</FieldLabel>
          <Controller
            name="country_id"
            control={control}
            rules={{
              required: "Country is required",
            }}
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
            <p className="text-xs text-red-500">{errors.country_id.message}</p>
          )}
        </Field>

        <Field>
          <FieldLabel>Region</FieldLabel>
          <Controller
            name="region_id"
            control={control}
            rules={{
              required: "Region is required",
            }}
            render={({ field }) => (
              <SearchSelect
                {...field}
                isClearable
                options={filteredRegions}
                value={filteredRegions.find(
                  (option: OptionType) => option.value === field.value,
                )}
                onChange={(option) => field.onChange(option?.value ?? null)}
                isDisabled={!selectedCountry}
              />
            )}
          />
          {errors.region_id && (
            <p className="text-xs text-red-500">{errors.region_id.message}</p>
          )}
        </Field>

        <Field>
          <FieldLabel>Sub Location</FieldLabel>
          <Input
            disabled={!selectedRegion}
            {...register("sub_location", {
              required: "Sub location is required",
            })}
          />
        </Field>

        {/* Deadline */}
        <Field>
          <FieldLabel htmlFor="dead_line">Deadline</FieldLabel>
          <Input
            id="dead_line"
            type="date"
            {...register("dead_line", {
              required: "Deadline is required",
            })}
          />
          {errors.dead_line && (
            <FieldError>{errors.dead_line.message}</FieldError>
          )}
        </Field>
      </FieldGroup>

      <Button
        type="submit"
        disabled={isCreating || isUpdating}
        className="mt-4"
      >
        {isCreating || isUpdating ? "Saving..." : jobId ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default BasicInfoForm;
