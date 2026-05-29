import type { JobCreateForm } from "@/@types/jobs";
import type {
  Country,
  Industry,
  JobType,
  PositionLevel,
  Region,
  SalaryRange,
} from "@/@types/universals";
import { Button } from "@/components/ui/button";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateJob } from "@/hooks/jobs";
import {
  useCountries,
  useIndustries,
  useJobTypes,
  useRegions,
  useSalaryRange,
} from "@/hooks/universals";
import { usePositionLevels } from "@/hooks/universals/usePositionLevels";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const BasicInfoForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<JobCreateForm>();

  const { mutate: createJob, isPending } = useCreateJob();

  const { data: jobTypes } = useJobTypes();
  const { data: positionLevels } = usePositionLevels();
  const { data: industries } = useIndustries();
  const { data: salaryRanges } = useSalaryRange();
  const { data: countries } = useCountries();
  const { data: regions } = useRegions();

  const selectedCountry = watch("country_id");
  const selectedRegion = watch("region");

  const filteredRegions =
    regions?.filter(
      (region: Region) => region.country_id === selectedCountry,
    ) || [];

  useEffect(() => {
    setValue("region", undefined);
    setValue("sub_location", "");
  }, [selectedCountry, setValue]);

  const onSubmit = (data: JobCreateForm) => {
    createJob(data, {
      onSuccess: (res) => {
        const jobId = res.data.id;

        navigate(`/jobs/${jobId}`);

        toast.success(res?.message || "Job created succesfully");
        reset();
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="title">Job Title</FieldLabel>
            <Input
              id="title"
              {...register("title", {
                required: "Job title is required",
              })}
            />
            {errors.title && (
              <FieldError className="">{errors.title.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="type_id">Job Type</FieldLabel>
            <Controller
              name="type_id"
              control={control}
              rules={{
                required: "Job type is required",
              }}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {jobTypes?.map((size: JobType) => (
                        <SelectItem key={size.id} value={size.id.toString()}>
                          {size.type_name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type_id && (
              <FieldError>{errors.type_id.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="quantity">Number of Positions</FieldLabel>
            <Input
              id="quantity"
              type="number"
              placeholder="1"
              {...register("quantity", {
                required: "Number of positions is required",
                valueAsNumber: true,
              })}
            />
            {errors.quantity && (
              <FieldError>{errors.quantity.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="position_level_id">Position Level</FieldLabel>
            <Controller
              name="position_level_id"
              control={control}
              rules={{
                required: "Position level is required",
              }}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select position level" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {positionLevels?.map((level: PositionLevel) => (
                        <SelectItem key={level.id} value={level.id.toString()}>
                          {level.position_name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.position_level_id && (
              <FieldError>{errors.position_level_id.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="category_id"> Category</FieldLabel>
            <Controller
              name="category_id"
              control={control}
              rules={{
                required: "Category is required",
              }}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {industries?.map((category: Industry) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.industry_name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category_id && (
              <FieldError>{errors.category_id.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="industry_id">Industry</FieldLabel>
            <Controller
              name="industry_id"
              control={control}
              rules={{
                required: "Industry is required",
              }}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select position level" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {industries?.map((level: Industry) => (
                        <SelectItem key={level.id} value={level.id.toString()}>
                          {level.industry_name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.industry_id && (
              <FieldError>{errors.industry_id.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="from_salary_id">Minimum Salary</FieldLabel>
            <Controller
              name="from_salary_id"
              control={control}
              rules={{
                required: "Minimum salary is required",
              }}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select salary" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {salaryRanges?.map((range: SalaryRange) => (
                        <SelectItem key={range.id} value={range.id.toString()}>
                          {range.low}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select salary" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {salaryRanges?.map((range: SalaryRange) => (
                        <SelectItem key={range.id} value={range.id.toString()}>
                          {range.low}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.to_salary_id && (
              <FieldError>{errors.to_salary_id.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="contact_id">Contact Person</FieldLabel>
            <Input
              id="contact_id"
              placeholder="John Doe"
              {...register("contact_id")}
            />
          </Field>

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

          <Field>
            <FieldLabel>Country</FieldLabel>
            <Controller
              name="country_id"
              control={control}
              rules={{
                required: "Country is required",
              }}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {countries?.map((country: Country) => (
                        <SelectItem
                          key={country.id}
                          value={country.id.toString()}
                        >
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.country_id && (
              <p className="text-xs text-red-500">
                {errors.country_id.message}
              </p>
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
                <Select
                  disabled={!selectedCountry}
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {filteredRegions?.map((region: Region) => (
                        <SelectItem
                          key={region.id}
                          value={region.id.toString()}
                        >
                          {region.region_name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.region && (
              <p className="text-xs text-red-500">{errors.region.message}</p>
            )}
          </Field>

          <Field>
            <FieldLabel>Sub Location</FieldLabel>
            <Input disabled={!selectedRegion} {...register("sub_location")} />
          </Field>
        </FieldGroup>

        <Button type="submit" disabled={isPending} className="mt-4">
          {isPending ? "Creating..." : "Create Job"}
        </Button>
      </form>
    </div>
  );
};

export default BasicInfoForm;
