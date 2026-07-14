import { Controller, useForm } from "react-hook-form";
import SearchSelect from "react-select";
import { toast } from "sonner";

import type { Language } from "@/@types/language";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { useAddLanguage, useEditLanguage } from "@/hooks/jobs";
import {
  useLanguage,
  useLanguageRead,
  useLanguageSpeak,
  useLanguageUnderstand,
  useLanguageWrite,
} from "@/hooks/universals";
import type { OptionType } from "@/@types/jobs";
import type { LanguageRequirement } from "@/@types/job";
import type { JobLanguageForm } from "@/@types/job-forms";
import { useEffect } from "react";
import type { SkillLevel } from "@/@types/universals";

interface LanguageFormProps {
  jobId: number;
  language?: LanguageRequirement;
  onSuccess?: () => void;
}

const LanguageForm = ({
  jobId,
  language,
  onSuccess: closeModal,
}: LanguageFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<JobLanguageForm>();

  const { mutate: createJobLanguage, isPending: isCreating } = useAddLanguage();
  const { mutate: editJobLanguage, isPending: isEditing } = useEditLanguage();

  // Fetch Languages
  const { data: languages } = useLanguage();
  const languageOptions: OptionType[] =
    languages?.map((language: Language) => ({
      value: language.id,
      label: language.language_name,
    })) ?? [];

  // fetch read abilities
  const { data: reads } = useLanguageRead();
  const readOptions: OptionType[] =
    reads?.map((read: SkillLevel) => ({
      value: read.id,
      label: read.name,
    })) ?? [];

  // fetch speak abilities
  const { data: speaks } = useLanguageSpeak();
  const speakOptions: OptionType[] =
    speaks?.map((read: SkillLevel) => ({
      value: read.id,
      label: read.name,
    })) ?? [];

  // fetch write abilities
  const { data: writes } = useLanguageWrite();
  const writeOptions: OptionType[] =
    writes?.map((write: SkillLevel) => ({
      value: write.id,
      label: write.name,
    })) ?? [];

  // fetch understand abilities
  const { data: understands } = useLanguageUnderstand();
  const understandOptions: OptionType[] =
    understands?.map((read: SkillLevel) => ({
      value: read.id,
      label: read.name,
    })) ?? [];

  // Filling Update Values
  useEffect(() => {
    if (language) {
      reset({
        language_id: language?.language?.id,
        speak_id: language?.speak?.id,
        write_id: language?.write?.id,
        read_id: language?.read?.id,
        understand_id: language?.understand?.id,
      });
    }
  }, [language, reset]);

  const onSubmit = (data: JobLanguageForm) => {
    const payload = {
      ...data,
      job_id: jobId,
    };

    if (language) {
      editJobLanguage(
        {
          id: language.id,
          payload,
        },
        {
          onSuccess: (res) => {
            toast.success(res.message);
            closeModal?.();
          },
          onError: () => {
            toast.error("Failed to edit job language");
          },
        },
      );
    } else {
      createJobLanguage(payload, {
        onSuccess: (res) => {
          toast.success(res?.message || "Language Added Succesfully");
          reset();
          closeModal?.();
        },
      });
    }
  };

  //   job_id: number;

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="education_level_id">Language</FieldLabel>
            <Controller
              name="language_id"
              control={control}
              rules={{
                required: "Language is required",
              }}
              render={({ field }) => (
                <SearchSelect
                  {...field}
                  isClearable
                  options={languageOptions}
                  value={languageOptions.find(
                    (option: OptionType) => option.value === field.value,
                  )}
                  onChange={(option) => field.onChange(option?.value ?? null)}
                />
              )}
            />
            {errors.language_id && (
              <FieldError>{errors.language_id.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="programme_id">Write Ability</FieldLabel>
            <Controller
              name="write_id"
              control={control}
              rules={{
                required: "Write ability is required",
              }}
              render={({ field }) => (
                <SearchSelect
                  {...field}
                  isClearable
                  options={writeOptions}
                  value={writeOptions.find(
                    (option: OptionType) => option.value === field.value,
                  )}
                  onChange={(option) => field.onChange(option?.value ?? null)}
                />
              )}
            />
            {errors.write_id && (
              <FieldError>{errors.write_id.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="major_id">Read Ability</FieldLabel>
            <Controller
              name="read_id"
              control={control}
              rules={{
                required: "Read ability is required",
              }}
              render={({ field }) => (
                <SearchSelect
                  {...field}
                  isClearable
                  options={readOptions}
                  value={readOptions.find(
                    (option: OptionType) => option.value === field.value,
                  )}
                  onChange={(option) => field.onChange(option?.value ?? null)}
                />
              )}
            />
            {errors.read_id && (
              <FieldError>{errors.read_id.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="major_id">Speak Ability</FieldLabel>
            <Controller
              name="speak_id"
              control={control}
              rules={{
                required: "Speak ability is required",
              }}
              render={({ field }) => (
                <SearchSelect
                  {...field}
                  isClearable
                  options={speakOptions}
                  value={speakOptions.find(
                    (option: OptionType) => option.value === field.value,
                  )}
                  onChange={(option) => field.onChange(option?.value ?? null)}
                />
              )}
            />
            {errors.speak_id && (
              <FieldError>{errors.speak_id.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="major_id">Understand Ability</FieldLabel>
            <Controller
              name="understand_id"
              control={control}
              rules={{
                required: "Understand ability is required",
              }}
              render={({ field }) => (
                <SearchSelect
                  {...field}
                  isClearable
                  options={understandOptions}
                  value={understandOptions.find(
                    (option: OptionType) => option.value === field.value,
                  )}
                  onChange={(option) => field.onChange(option?.value ?? null)}
                />
              )}
            />
            {errors.understand_id && (
              <FieldError>{errors.understand_id.message}</FieldError>
            )}
          </Field>
        </FieldGroup>

        <Button
          type="submit"
          disabled={isCreating || isEditing}
          className="mt-4"
        >
          {isCreating || isEditing ? "Adding..." : "Add Language"}
        </Button>
      </form>
    </div>
  );
};

export default LanguageForm;
