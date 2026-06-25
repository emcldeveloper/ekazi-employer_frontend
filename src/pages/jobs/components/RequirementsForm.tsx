import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { JobRequirementData, OptionType } from "@/@types/jobs";
import SearchSelect from "react-select";
import CreatableSelect from "react-select/creatable";

import type {
  Culture,
  Gender,
  Knowledge,
  Personality,
} from "@/@types/universals";
import { Button } from "@/components/ui/button";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useAddRequirement } from "@/hooks/jobs/useAddRequirement";
import {
  useCultures,
  useGenders,
  useKnowledges,
  usePersonalities,
} from "@/hooks/universals";
import { useEffect, useState } from "react";

interface RequirementsFormProps {
  job: any;
  onSuccess?: () => void;
}

const RequirementsForm = ({
  job,
  onSuccess: closeModal,
}: RequirementsFormProps) => {
  const [personalitySearch, setPersonalitySearch] = useState("");
  const [skillSearch, setSkillSearch] = useState("");
  // const [softwareSearch, setSoftwareSearch] = useState("");
  // const [toolsSearch, setToolsSearch] = useState("");
  // const [prociencySearch, setProficiencySearch] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<JobRequirementData>({
    defaultValues: {
      gender_id: null,
      culture: [],
      personality: [],
      knowledge: [],
      software: [],
      proficiency_id: [],
      tool: [],
    },
  });

  const { mutate: createJobRequirement, isPending } = useAddRequirement();

  // fetch genders
  const { data: genders } = useGenders();
  const genderOptions: OptionType[] =
    genders?.map((gender: Gender) => ({
      value: gender.id,
      label: gender.gender_name,
    })) ?? [];

  // fetch cultures
  const { data: cultures } = useCultures();
  const cultureOptions: string[] =
    cultures?.map((culture: Culture) => ({
      value: culture.id,
      label: culture.culture_name,
    })) ?? [];

  // fetch personalities
  const { data: personalities } = usePersonalities(personalitySearch);
  const personalityOptions: string[] =
    personalities?.map((personality: Personality) => ({
      value: personality.id,
      label: personality.personality_name,
    })) ?? [];

  // fetch skills
  const { data: knowledges } = useKnowledges(skillSearch);
  const skillOptions: string[] =
    knowledges?.map((skill: Knowledge) => ({
      value: skill.id,
      label: skill.knowledge_name,
    })) ?? [];

  // fetch softwares
  // const { data: softwares } = useSoftwares(softwareSearch);
  // const softwareOptions: string[] =
  //   softwares?.map((software: Software) => ({
  //     value: software.id,
  //     label: software.software_name,
  //   })) ?? [];

  // fetch tools
  // const { data: tools } = useTools(toolsSearch);
  // const toolOptions: string[] =
  //   tools?.map((tool: Tool) => ({
  //     value: tool.id,
  //     label: tool.tool_name,
  //   })) ?? [];

  // fetch proficiencies
  // const { data: proficiencies } = useProficiencies(prociencySearch);
  // const proficiencyOptions: number[] =
  //   proficiencies?.map((proficiency: Proficiency) => ({
  //     value: proficiency.id,
  //     label: proficiency.proficiency_name,
  //   })) ?? [];

  // Pre fill data for editing
  useEffect(() => {
    reset({
      years_experience: job?.years_experience || "",
      applicant_min_age: job?.applicant_min_age || "",
      applicant_max_age: job?.applicant_max_age || "",
      gender_id: job?.gender_id || "",
      culture:
        job?.job_culture?.map((item: any) => ({
          value: item.culture?.id,
          label: item.culture?.culture_name,
        })) ?? [],
      personality:
        job?.job_personality?.map((item: any) => ({
          value: item.personality?.id,
          label: item.personality?.personality_name,
        })) ?? [],
      knowledge:
        job?.job_knowledge?.map((item: any) => ({
          value: item.knowledge?.id,
          label: item.knowledge?.knowledge_name,
        })) ?? [],
    });
  }, [job, reset]);

  // Handlers
  const onSubmit = (data: JobRequirementData) => {
    const payload = {
      ...data,
      // @ts-expect-error TS cannot infer custom select option type here
      culture: data.culture?.map((option) => option.value) ?? [],
      // @ts-expect-error TS cannot infer custom select option type here
      knowledge: data.knowledge?.map((option) => option.value) ?? [],
      // @ts-expect-error TS cannot infer custom select option type here
      personality: data.personality?.map((option) => option.value) ?? [],
      // software: data.software?.map((option) => option.value) ?? [],
      // proficiency_id: data.proficiency_id?.map((option) => option.value) ?? [],
      // tool: data.tool?.map((option) => option.value) ?? [],
    };

    createJobRequirement(
      {
        jobId: job?.id,
        payload,
      },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Requirements Added Succesfully");
          reset();
          closeModal?.();
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel>Experience years</FieldLabel>
            <Input
              min={1}
              type="number"
              {...register("years_experience", {
                valueAsNumber: true,
                required: "Experience is required",
                min: 1,
              })}
            />
            {errors.years_experience && (
              <FieldError>{errors.years_experience.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Age Group (min - max)</FieldLabel>
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
                <SearchSelect
                  {...field}
                  isClearable
                  options={genderOptions}
                  value={genderOptions.find(
                    (option: OptionType) => option.value === field.value,
                  )}
                  onChange={(option) => field.onChange(option?.value ?? null)}
                />
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
                <SearchSelect
                  {...field}
                  isClearable
                  isMulti
                  options={cultureOptions}
                  value={field.value}
                  onChange={(selected) => field.onChange(selected ?? [])}
                />
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
                <CreatableSelect
                  {...field}
                  options={personalityOptions}
                  value={field.value}
                  onChange={(selected) => field.onChange(selected ?? [])}
                  onInputChange={setPersonalitySearch}
                  isClearable
                  isMulti
                />
              )}
            />
            {errors.personality && (
              <FieldError>{errors.personality.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Skills</FieldLabel>
            <Controller
              name="knowledge"
              control={control}
              rules={{
                required: "Knowledge is required",
              }}
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  options={skillOptions}
                  value={field.value}
                  onChange={(selected) => field.onChange(selected ?? [])}
                  onInputChange={setSkillSearch}
                  isClearable
                  isMulti
                />
              )}
            />
            {errors.knowledge && (
              <FieldError>{errors.knowledge.message}</FieldError>
            )}
          </Field>

          {/* <Field>
            <FieldLabel>Software</FieldLabel>
            <Controller
              name="software"
              control={control}
              rules={{
                required: "Software is required",
              }}
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  options={softwareOptions}
                  value={field.value}
                  onChange={(selected) => field.onChange(selected ?? [])}
                  onInputChange={setSoftwareSearch}
                  isClearable
                  isMulti
                />
              )}
            />
            {errors.software && (
              <FieldError>{errors.software.message}</FieldError>
            )}
          </Field> */}

          {/* <Field>
            <FieldLabel>Proficiency</FieldLabel>
            <Controller
              name="proficiency_id"
              control={control}
              rules={{
                required: "Proficiency is required",
              }}
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  options={proficiencyOptions}
                  value={field.value}
                  onChange={(selected) => field.onChange(selected ?? [])}
                  onInputChange={setProficiencySearch}
                  isClearable
                  isMulti
                />
              )}
            />
            {errors.proficiency_id && (
              <FieldError>{errors.proficiency_id.message}</FieldError>
            )}
          </Field> */}

          {/* <Field>
            <FieldLabel>Tools</FieldLabel>
            <Controller
              name="tool"
              control={control}
              rules={{
                required: "Tool is required",
              }}
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  options={toolOptions}
                  value={field.value}
                  onChange={(selected) => field.onChange(selected ?? [])}
                  onInputChange={setToolsSearch}
                  isMulti
                />
              )}
            />
            {errors.tool && <FieldError>{errors.tool.message}</FieldError>}
          </Field> */}
        </FieldGroup>

        <Button type="submit" disabled={isPending} className="mt-4">
          {isPending ? "Adding..." : "Add Requirements"}
        </Button>
      </form>
    </div>
  );
};

export default RequirementsForm;
