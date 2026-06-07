import type { AllRequirementsData, JobRequirementData } from "@/@types/jobs";

import type {
  Culture,
  Gender,
  Knowledge,
  Personality,
  Proficiency,
  Software,
  Tool,
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
import { Textarea } from "@/components/ui/textarea";
import { useAddOtherRequirement } from "@/hooks/jobs/useAddOtherRequirement";

import { useAddRequirement } from "@/hooks/jobs/useAddRequirement";
import {
  useCultures,
  useGenders,
  useKnowledges,
  usePersonalities,
  useProficiencies,
  useSoftwares,
  useTools,
} from "@/hooks/universals";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface RequirementsFormProps {
  jobId: number;
  onSuccess: () => void;
}

const RequirementsForm = ({
  jobId,
  onSuccess: nextStep,
}: RequirementsFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<AllRequirementsData>();

  const { mutate: createJobRequirement } = useAddRequirement();
  const { mutate: createOtherRequirement, isPending } =
    useAddOtherRequirement();

  // Get Data
  const { data: genders } = useGenders();
  const { data: cultures } = useCultures();
  const { data: personalities } = usePersonalities();
  const { data: knowledges } = useKnowledges();
  const { data: softwares } = useSoftwares();
  const { data: tools } = useTools();
  const { data: proficiencies } = useProficiencies();

  const onSubmit = (data: AllRequirementsData) => {
    const payload: JobRequirementData = {
      years_experience: data.years_experience,
      applicant_min_age: data.applicant_min_age,
      applicant_max_age: data.applicant_max_age,
      gender_id: data.gender_id,
      position_experiences: data.position_experiences,
      culture: data.culture,
      knowledge: data.knowledge,
      personality: data.personality,
      software: data.software,
      proficiency_id: data.proficiency_id,
      tool: data.tool,
    };

    createJobRequirement(
      {
        jobId,
        payload,
      },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Requirements Added Succesfully");
          reset();
        },
      },
    );

    createOtherRequirement(
      { job_id: jobId, other_requirement: data.other_requirement },
      {
        onSuccess: () => {
          nextStep();
          reset();
        },
      },
    );
  };

  //   job_id: number;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-heading text-base leading-normal font-semibold">
          Candidate Qualifications
        </h2>
        <p className="text-sm text-muted-foreground">
          Please add the candidate qualifications for the job.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel>Experience</FieldLabel>
            <Input
              type="number"
              {...register("years_experience", {
                valueAsNumber: true,
                required: "Experience is required",
              })}
            />
            {errors.years_experience && (
              <FieldError>{errors.years_experience.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Age Group</FieldLabel>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                {...register("applicant_min_age", {
                  valueAsNumber: true,
                  required: "Age group is required",
                })}
              />
              <Input
                type="number"
                {...register("applicant_max_age", {
                  valueAsNumber: true,
                  required: "Age group is required",
                })}
              />
            </div>
            {errors.applicant_min_age && (
              <FieldError>{errors.applicant_min_age.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Gender</FieldLabel>
            <Controller
              name="gender_id"
              control={control}
              rules={{
                required: "Gender is required",
              }}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select geneder" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {genders?.map((item: Gender) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.gender_name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender_id && (
              <FieldError>{errors.gender_id.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Culture</FieldLabel>
            <Controller
              name="culture"
              control={control}
              rules={{
                required: "Culture is required",
              }}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select culture" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {cultures?.map((items: Culture) => (
                        <SelectItem key={items.id} value={items.id.toString()}>
                          {items.culture_name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.culture && (
              <FieldError>{errors.culture.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Personality</FieldLabel>
            <Controller
              name="personality"
              control={control}
              rules={{
                required: "Personality is required",
              }}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select personality" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {personalities?.map((item: Personality) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.personality_name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.personality && (
              <FieldError>{errors.personality.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Knowledge</FieldLabel>
            <Controller
              name="knowledge"
              control={control}
              rules={{
                required: "Knowledge is required",
              }}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select knowledge" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {knowledges?.map((item: Knowledge) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.knowledge_name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.knowledge && (
              <FieldError>{errors.knowledge.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Software</FieldLabel>
            <Controller
              name="software"
              control={control}
              rules={{
                required: "Software is required",
              }}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select software" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {softwares?.map((item: Software) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.software_name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.software && (
              <FieldError>{errors.software.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Proficiency</FieldLabel>
            <Controller
              name="proficiency_id"
              control={control}
              rules={{
                required: "Proficiency is required",
              }}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select proficiency" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {proficiencies?.map((item: Proficiency) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.proficiency_name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.proficiency_id && (
              <FieldError>{errors.proficiency_id.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Tools</FieldLabel>
            <Controller
              name="tool"
              control={control}
              rules={{
                required: "Tool is required",
              }}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select tool" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {tools?.map((item: Tool) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.tool_name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.tool && <FieldError>{errors.tool.message}</FieldError>}
          </Field>
        </FieldGroup>

        {/* other requirements */}
        <FieldGroup className="mt-5">
          <Field>
            <FieldLabel>Other Requirements</FieldLabel>
            <Textarea
              placeholder="Enter other requirements..."
              {...register("other_requirement", {
                required: "Other requirements are required",
              })}
            />
          </Field>
        </FieldGroup>

        <Button type="submit" disabled={isPending} className="mt-4">
          {isPending ? "Adding..." : "Add Requirements"}
        </Button>
      </form>
    </div>
  );
};

export default RequirementsForm;
