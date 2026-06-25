import SearchSelect from "react-select";
import CreatableSelect from "react-select/creatable";

import type { JobEducationData, OptionType } from "@/@types/jobs";
import type { Course, EducationLevel, Major } from "@/@types/universals";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { useAddEducation } from "@/hooks/jobs/useAddEducation";
import { useCourses, useEducationLevels, useMajors } from "@/hooks/universals";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface EducationFormProps {
  job: any;
  onSuccess?: () => void;
}

const EducationForm = ({ job, onSuccess: closeModal }: EducationFormProps) => {
  const [courseSearch, setCourseSearch] = useState("");
  const [majorSearch, setMajorSearch] = useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<JobEducationData>();

  const { mutate: createJobEducation, isPending } = useAddEducation();

  // Fetch education levels
  const { data: levels } = useEducationLevels();
  const levelOptions: OptionType[] =
    levels?.map((level: EducationLevel) => ({
      value: level.id,
      label: level.education_level,
    })) ?? [];

  // fetch courses
  const { data: courses } = useCourses(courseSearch);
  const courseOptions: OptionType[] =
    courses?.map((course: Course) => ({
      value: course.id,
      label: course.course_name,
    })) ?? [];

  // fetch majors
  const { data: majors } = useMajors(majorSearch);
  const majorOptions: OptionType[] =
    majors?.map((major: Major) => ({
      value: major.id,
      label: major.name,
    })) ?? [];

  const onSubmit = (data: JobEducationData) => {
    createJobEducation(
      { ...data, job_id: job?.id },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Education Added Succesfully");
          reset();
          closeModal?.();
        },
      },
    );
  };

  //   job_id: number;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="education_level_id">Education Level</FieldLabel>
          <Controller
            name="education_level_id"
            control={control}
            rules={{
              required: "Education level is required",
            }}
            render={({ field }) => (
              <SearchSelect
                {...field}
                isClearable
                options={levelOptions}
                value={levelOptions.find(
                  (option: OptionType) => option.value === field.value,
                )}
                onChange={(option) => field.onChange(option?.value ?? null)}
              />
            )}
          />
          {errors.education_level_id && (
            <FieldError>{errors.education_level_id.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="programme_id">Course/Programme</FieldLabel>
          <Controller
            name="programme_id"
            control={control}
            rules={{
              required: "Course/Programme is required",
            }}
            render={({ field }) => (
              <CreatableSelect
                options={courseOptions}
                value={courseOptions.find(
                  (option: OptionType) => option.value === field.value,
                )}
                onChange={(option) => field.onChange(option?.value)}
                onInputChange={setCourseSearch}
                isClearable
              />
            )}
          />

          {errors.programme_id && (
            <FieldError>{errors.programme_id.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="major_id">Major / Specialized In</FieldLabel>
          <Controller
            name="major_id"
            control={control}
            rules={{
              required: "Major is required",
            }}
            render={({ field }) => (
              <CreatableSelect
                options={majorOptions}
                value={majorOptions.find(
                  (option: OptionType) => option.value === field.value,
                )}
                onChange={(option) => field.onChange(option?.value)}
                onInputChange={setMajorSearch}
                isClearable
              />
            )}
          />

          {errors.major_id && (
            <FieldError>{errors.major_id.message}</FieldError>
          )}
        </Field>
      </FieldGroup>

      <Button type="submit" disabled={isPending} className="mt-4">
        {isPending ? "Saving..." : "Save"}
      </Button>
    </form>
  );
};

export default EducationForm;
