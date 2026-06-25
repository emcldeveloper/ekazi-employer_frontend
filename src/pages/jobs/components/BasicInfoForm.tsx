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

import type { Job, JobCreateForm, OptionType } from "@/@types/jobs";
import type {
  Country,
  Industry,
  JobType,
  PositionLevel,
  PositionType,
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

interface BasicInfoFormProps {
  jobId?: number;
  initialData?: any;
  onSuccess?: () => void;
}

const BasicInfoForm = ({
  jobId,
  initialData,
  onSuccess: closeModal,
}: BasicInfoFormProps) => {
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
    positions?.data?.map((position: PositionType) => ({
      value: position.id,
      label: position.position_name,
    })) ?? [];

  // fetch position levels
  const { data: positionLevels } = usePositionLevels();
  const positionLevelOptions =
    positionLevels?.map((level: PositionLevel) => ({
      value: level.id,
      label: level.position_name,
    })) ?? [];

  // fetch industries
  const { data: industries } = useIndustries(industrySearch);
  const industryOptions =
    industries?.map((industry: Industry) => ({
      value: industry.id,
      label: industry.industry_name,
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
    if (initialData) {
      reset({
        title: initialData?.position_id,
        type_id: initialData?.type_id,
        dead_line: initialData?.dead_line,
        quantity: initialData?.quantity,
        country_id: initialData?.country_id,
        category_id: initialData?.category_id,
        position_level_id: initialData?.position_level_id,
        region: initialData?.job_addresses?.[0]?.region_id,
        industry_id: initialData?.industry_id,
        from_salary_id: initialData?.entry_salary,
        to_salary_id: initialData?.exit_salary,
        sub_location: initialData?.job_addresses?.[0]?.sub_location,
      });
    }
  }, [initialData, reset]);

  const selectedCountry = watch("country_id");
  const selectedRegion = watch("region");

  useEffect(() => {
    if (!initialData) {
      setValue("region", null);
    }
  }, [selectedCountry, setValue, initialData]);

  const filteredRegions =
    regions
      ?.filter((region: Region) => region.country_id === selectedCountry)
      .map((region: Region) => ({
        value: region.id,
        label: region.region_name,
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
            name="title"
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
          {errors.title && (
            <FieldError className="">{errors.title.message}</FieldError>
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
            name="from_salary_id"
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
          {errors.from_salary_id && (
            <FieldError>{errors.from_salary_id.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="to_salary_id">Maximum Salary</FieldLabel>
          <Controller
            name="to_salary_id"
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
          {errors.to_salary_id && (
            <FieldError>{errors.to_salary_id.message}</FieldError>
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
            name="region"
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
          {errors.region && (
            <p className="text-xs text-red-500">{errors.region.message}</p>
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
