import { Controller, useForm } from "react-hook-form";
import SearchSelect from "react-select";
import { toast } from "sonner";

import type {
  Language,
  Read,
  Speak,
  Understand,
  Write,
} from "@/@types/language";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { useAddLanguage } from "@/hooks/jobs/useAddLanguage";
import {
  useLanguage,
  useLanguageRead,
  useLanguageSpeak,
  useLanguageUnderstand,
  useLanguageWrite,
} from "@/hooks/universals";
import type { JobLanguageData, OptionType } from "@/@types/jobs";

interface LanguageFormProps {
  job: any;
  onSuccess?: () => void;
}

const LanguageForm = ({ job, onSuccess: closeModal }: LanguageFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<JobLanguageData>();

  const { mutate: createJobLanguage, isPending } = useAddLanguage();

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
    reads?.map((read: Read) => ({
      value: read.id,
      label: read.read_ability,
    })) ?? [];

  // fetch speak abilities
  const { data: speaks } = useLanguageSpeak();
  const speakOptions: OptionType[] =
    speaks?.map((read: Speak) => ({
      value: read.id,
      label: read.speak_ability,
    })) ?? [];

  // fetch write abilities
  const { data: writes } = useLanguageWrite();
  const writeOptions: OptionType[] =
    writes?.map((write: Write) => ({
      value: write.id,
      label: write.write_ability,
    })) ?? [];

  // fetch understand abilities
  const { data: understands } = useLanguageUnderstand();
  const understandOptions: OptionType[] =
    understands?.map((read: Understand) => ({
      value: read.id,
      label: read.understand_ability,
    })) ?? [];

  const onSubmit = (data: JobLanguageData) => {
    createJobLanguage(
      { ...data, job_id: job?.id },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Language Added Succesfully");
          reset();
          closeModal?.();
        },
      },
    );
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

        <Button type="submit" disabled={isPending} className="mt-4">
          {isPending ? "Adding..." : "Add Language"}
        </Button>
      </form>
    </div>
  );
};

export default LanguageForm;
