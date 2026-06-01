import type { JobLanguageData } from "@/@types/jobs";
import type {
  Language,
  Read,
  Speak,
  Understand,
  Write,
} from "@/@types/language";

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

import { useAddLanguage } from "@/hooks/jobs/useAddLanguage";
import {
  useLanguage,
  useLanguageRead,
  useLanguageSpeak,
  useLanguageUnderstand,
  useLanguageWrite,
} from "@/hooks/universals";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface LanguageFormProps {
  onSuccess: () => void;
}

const LanguageForm = ({ onSuccess: nextStep }: LanguageFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<JobLanguageData>();

  const { mutate: createJobLanguage } = useAddLanguage();

  // Get Data
  const { data: languages } = useLanguage();
  const { data: reads } = useLanguageRead();
  const { data: speaks } = useLanguageSpeak();
  const { data: writes } = useLanguageWrite();
  const { data: understands } = useLanguageUnderstand();

  const onSubmit = (data: JobLanguageData) => {
    createJobLanguage(data, {
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
            <FieldLabel htmlFor="education_level_id">Language</FieldLabel>
            <Controller
              name="language_id"
              control={control}
              rules={{
                required: "Language is required",
              }}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {languages?.map((item: Language) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.language_name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select ability" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {writes?.map((items: Write) => (
                        <SelectItem key={items.id} value={items.id.toString()}>
                          {items.write_ability}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select ability" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {reads?.map((item: Read) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.read_ability}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select ability" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {speaks?.map((item: Speak) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.speak_ability}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                required: "Understan ability is required",
              }}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select ability" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {understands?.map((item: Understand) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.understand_ability}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.understand_id && (
              <FieldError>{errors.understand_id.message}</FieldError>
            )}
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

export default LanguageForm;
