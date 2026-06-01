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
import { useAddEducation } from "@/hooks/jobs/useAddEducation";
import { useCourses, useEducationLevels, useMajors } from "@/hooks/universals";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface EducationFormProps {
  onSuccess: () => void;
}

const EducationForm = ({ onSuccess: nextStep }: EducationFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<JobEducationData>();

  const { mutate: createJobEducation } = useAddEducation();

  // Get Data
  const { data: levels } = useEducationLevels();
  const { data: courses } = useCourses();
  const { data: majors } = useMajors();

  const onSubmit = (data: JobEducationData) => {
    createJobEducation(data, {
      onSuccess: (res) => {
        nextStep();

        toast.success(res?.message || "Education Added Succesfully");
        reset();
      },
    });
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
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {courses?.map((course: Course) => (
                        <SelectItem
                          key={course.id}
                          value={course.id.toString()}
                        >
                          {course.course_name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select major" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {majors?.map((major: Major) => (
                        <SelectItem key={major.id} value={major.id.toString()}>
                          {major.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.major_id && (
              <FieldError>{errors.major_id.message}</FieldError>
            )}
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

export default EducationForm;
