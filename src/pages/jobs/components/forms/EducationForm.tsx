import { useEffect, useState } from "react";
import SearchSelect from "react-select";
import CreatableSelect from "react-select/creatable";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import type { OptionType } from "@/@types/jobs";
import type { CourseData, EducationLevel, Major } from "@/@types/universals";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";

import {
  useAddEducation,
  useEditEducation,
} from "@/hooks/jobs/useAddEducation";
import { useCourses, useEducationLevels, useMajors } from "@/hooks/universals";
import type { JobEducationForm } from "@/@types/job-forms";
import type { Education } from "@/@types/job";

interface EducationFormProps {
  jobId: number;
  education?: Education;
  onSuccess?: () => void;
}

const EducationForm = ({
  jobId,
  education,
  onSuccess: closeModal,
}: EducationFormProps) => {
  const [courseSearch, setCourseSearch] = useState("");
  const [majorSearch, setMajorSearch] = useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<JobEducationForm>();

  const { mutate: createJobEducation, isPending: isCreating } =
    useAddEducation();
  const { mutate: editJobEducation, isPending: isEditing } = useEditEducation();

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
    courses?.map((course: CourseData) => ({
      value: course.id,
      label: course.name,
    })) ?? [];

  // fetch majors
  const { data: majors } = useMajors(majorSearch);
  const majorOptions: OptionType[] =
    majors?.map((major: Major) => ({
      value: major.id,
      label: major.name,
    })) ?? [];

  // Filling Update Values
  useEffect(() => {
    if (education) {
      reset({
        education_level_id: education?.education_level?.id,
        programme_category_id: education?.course?.id,
        major_id: education?.major?.id,
      });
    }
  }, [education, reset]);

  const onSubmit = (data: JobEducationForm) => {
    const payload = {
      ...data,
      job_id: jobId,
      course_id: data.programme_category_id,
    };

    if (education) {
      editJobEducation(
        {
          id: education.id,
          payload,
        },
        {
          onSuccess: (res) => {
            toast.success(res.message);
            closeModal?.();
          },
          onError: () => {
            toast.error("Failed to edit job education");
          },
        },
      );
    } else {
      createJobEducation(payload, {
        onSuccess: (res) => {
          toast.success(res.message);
          reset();
          closeModal?.();
        },
        onError: () => {
          toast.error("Failed to create job education");
        },
      });
    }
  };

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
          <FieldLabel htmlFor="programme_category_id">
            Course/Programme
          </FieldLabel>
          <Controller
            name="programme_category_id"
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

          {errors.programme_category_id && (
            <FieldError>{errors.programme_category_id.message}</FieldError>
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

      <Button type="submit" disabled={isCreating || isEditing} className="mt-4">
        {isCreating || isEditing ? "Saving..." : "Save"}
      </Button>
    </form>
  );
};

export default EducationForm;
