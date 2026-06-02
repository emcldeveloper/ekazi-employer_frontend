import type { JobEducationData } from "@/@types/jobs";
import type { Course, EducationLevel, Major } from "@/@types/universals";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

import { useAddEducation } from "@/hooks/jobs/useAddEducation";
import { useCourses, useEducationLevels, useMajors } from "@/hooks/universals";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface EducationFormProps {
  jobId: number;
  onSuccess: () => void;
}

const EducationForm = ({ jobId, onSuccess: nextStep }: EducationFormProps) => {
  const [courseSearch, setCourseSearch] = useState("");
  const [majorSearch, setMajorSearch] = useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<JobEducationData>();

  const { mutate: createJobEducation, isPending } = useAddEducation();

  // Get Data
  const { data: levels } = useEducationLevels();
  const { data: coursesResponse } = useCourses(courseSearch);
  const { data: majorsResponse } = useMajors(majorSearch);

  const courses = coursesResponse?.data ?? [];
  const majors = majorsResponse?.data ?? [];

  const onSubmit = (data: JobEducationData) => {
    createJobEducation(
      { ...data, job_id: jobId },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Education Added Succesfully");
          nextStep();
          reset();
        },
      },
    );
  };

  //   job_id: number;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="education_level_id">
              Education Level
            </FieldLabel>
            <Controller
              name="education_level_id"
              control={control}
              rules={{
                required: "Education level is required",
              }}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {levels?.map((level: EducationLevel) => (
                        <SelectItem key={level.id} value={level.id.toString()}>
                          {level.education_level}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                <Combobox
                  items={courses ?? []}
                  value={
                    courses?.find((course: Course) => course.id === field.value)
                      ?.course_name ?? ""
                  }
                  onValueChange={(value) => {
                    const selectedCourse = courses?.find(
                      (course: Course) => course.course_name === value,
                    );

                    field.onChange(selectedCourse?.id);
                  }}
                >
                  <ComboboxInput
                    placeholder="Search course..."
                    onChange={(e) => setCourseSearch(e.target.value)}
                  />

                  <ComboboxContent>
                    <ComboboxEmpty>No course found.</ComboboxEmpty>

                    <ComboboxList>
                      {courses?.map((course: Course) => (
                        <ComboboxItem
                          key={course.id}
                          value={course.course_name}
                        >
                          {course.course_name}
                        </ComboboxItem>
                      ))}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
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
                <Combobox
                  items={majors ?? []}
                  value={
                    majors?.find((major: Major) => major.id === field.value)
                      ?.name ?? ""
                  }
                  onValueChange={(value) => {
                    const selectedMajor = majors?.find(
                      (major: Major) => major.name === value,
                    );

                    field.onChange(selectedMajor?.id);
                  }}
                >
                  <ComboboxInput
                    placeholder="Search major..."
                    onChange={(e) => setMajorSearch(e.target.value)}
                  />

                  <ComboboxContent>
                    <ComboboxEmpty>No major found.</ComboboxEmpty>

                    <ComboboxList>
                      {majors?.map((major: Major) => (
                        <ComboboxItem key={major.id} value={major.name}>
                          {major.name}
                        </ComboboxItem>
                      ))}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              )}
            />

            {errors.major_id && (
              <FieldError>{errors.major_id.message}</FieldError>
            )}
          </Field>
        </FieldGroup>

        <Button type="submit" disabled={isPending} className="mt-4">
          {isPending ? "Adding..." : "Add Job"}
        </Button>
      </form>
    </div>
  );
};

export default EducationForm;
