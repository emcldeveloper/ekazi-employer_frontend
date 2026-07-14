import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import SearchSelect from "react-select";
import CreatableSelect from "react-select/creatable";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
import type {
  CultureItem,
  Job,
  KnowledgeItem,
  PersonalityItem,
  ProficiencyItem,
  SoftwareItem,
  ToolItem,
} from "@/@types/job";
import type { OptionType } from "@/@types/jobs";
import type {
  Culture,
  Gender,
  Knowledge,
  Personality,
  Proficiency,
  Software,
  Tool,
} from "@/@types/universals";
import type {
  JobRequirementForm,
  JobRequirementPayload,
} from "@/@types/job-forms";

interface RequirementsFormProps {
  job: Job;
  onSuccess?: () => void;
}

const RequirementsForm = ({
  job,
  onSuccess: closeModal,
}: RequirementsFormProps) => {
  const jobId = job?.id;

  const [personalitySearch, setPersonalitySearch] = useState("");
  const [skillSearch, setSkillSearch] = useState("");
  const [softwareSearch, setSoftwareSearch] = useState("");
  const [toolsSearch, setToolsSearch] = useState("");
  const [prociencySearch, setProficiencySearch] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<JobRequirementForm>();

  const { mutate: createJobRequirement, isPending } = useAddRequirement();

  // fetch genders
  const { data: genders } = useGenders();
  const genderOptions: OptionType[] =
    genders?.map((gender: Gender) => ({
      value: gender.id,
      label: gender.name,
    })) ?? [];

  // fetch cultures
  const { data: cultures } = useCultures();
  const cultureOptions: OptionType[] =
    cultures?.map((culture: Culture) => ({
      value: culture.id,
      label: culture.culture_name,
    })) ?? [];

  // fetch personalities
  const { data: personalities } = usePersonalities(personalitySearch);
  const personalityOptions: OptionType[] =
    personalities?.map((personality_ids: Personality) => ({
      value: personality_ids.id,
      label: personality_ids.name,
    })) ?? [];

  // fetch skills
  const { data: knowledges } = useKnowledges(skillSearch);
  const skillOptions: OptionType[] =
    knowledges?.map((skill: Knowledge) => ({
      value: skill.id,
      label: skill.name,
    })) ?? [];

  // fetch softwares
  const { data: softwares } = useSoftwares(softwareSearch);
  const softwareOptions: OptionType[] =
    softwares?.map((software: Software) => ({
      value: software.id,
      label: software.software_name,
    })) ?? [];

  // fetch tools
  const { data: tools } = useTools(toolsSearch);
  const toolOptions: OptionType[] =
    tools?.map((tool: Tool) => ({
      value: tool.id,
      label: tool.tool_name,
    })) ?? [];

  // fetch proficiencies
  const { data: proficiencies } = useProficiencies(prociencySearch);
  const proficiencyOptions: OptionType[] =
    proficiencies?.map((proficiency: Proficiency) => ({
      value: proficiency.id,
      label: proficiency.name,
    })) ?? [];

  // Pre fill data for editing
  useEffect(() => {
    reset({
      years_experience: job?.years_experience,
      applicant_min_age: job?.applicant_min_age,
      applicant_max_age: job?.applicant_max_age,
      gender_id: job?.gender?.id,
      culture_ids:
        job?.cultures?.map((item: CultureItem) => ({
          value: item.culture?.id,
          label: item.culture?.name,
        })) ?? [],
      personality_ids:
        job?.personalities?.map((item: PersonalityItem) => ({
          value: item.personality?.id,
          label: item.personality?.name,
        })) ?? [],
      knowledge_ids:
        job?.knowledge?.map((item: KnowledgeItem) => ({
          value: item.knowledge?.id,
          label: item.knowledge?.name,
        })) ?? [],
      software_ids:
        job?.softwares?.map((item: SoftwareItem) => ({
          value: item.software?.id,
          label: item.software?.name,
        })) ?? [],
      proficiency_ids:
        job?.proficiencies?.map((item: ProficiencyItem) => ({
          value: item.proficiency?.id,
          label: item.proficiency?.name,
        })) ?? [],
      tool_ids:
        job?.tools?.map((item: ToolItem) => ({
          value: item.tool?.id,
          label: item.tool?.name,
        })) ?? [],
    });
  }, [job, reset]);

  // Handlers
  const onSubmit = (data: JobRequirementForm) => {
    const payload: JobRequirementPayload = {
      years_experience: data.years_experience,
      applicant_min_age: data.applicant_min_age,
      applicant_max_age: data.applicant_max_age,
      gender_id: data.gender_id,

      culture_ids: data.culture_ids?.map((o) => o.value) ?? [],
      personality_ids: data.personality_ids?.map((o) => o.value) ?? [],
      knowledge_ids: data.knowledge_ids?.map((o) => o.value) ?? [],
      software_ids: data.software_ids?.map((o) => o.value) ?? [],
      proficiency_ids: data.proficiency_ids?.map((o) => o.value) ?? [],
      tool_ids: data.tool_ids?.map((o) => o.value) ?? [],
    };

    createJobRequirement(
      {
        job_id: jobId,
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
              type="text"
              {...register("years_experience", {
                required: "Experience is required",
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
              name="culture_ids"
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
            {errors.culture_ids && (
              <FieldError>{errors.culture_ids.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Personality</FieldLabel>
            <Controller
              name="personality_ids"
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
            {errors.personality_ids && (
              <FieldError>{errors.personality_ids.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Skills</FieldLabel>
            <Controller
              name="knowledge_ids"
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
            {errors.knowledge_ids && (
              <FieldError>{errors.knowledge_ids.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Software</FieldLabel>
            <Controller
              name="software_ids"
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
            {errors.software_ids && (
              <FieldError>{errors.software_ids.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Proficiency</FieldLabel>
            <Controller
              name="proficiency_ids"
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
            {errors.proficiency_ids && (
              <FieldError>{errors.proficiency_ids.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Tools</FieldLabel>
            <Controller
              name="tool_ids"
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
            {errors.tool_ids && (
              <FieldError>{errors.tool_ids.message}</FieldError>
            )}
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
