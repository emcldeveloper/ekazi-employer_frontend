import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import SearchSelect from "react-select";

import { Field, FieldGroup } from "@/components/ui/field";

import { useAddMetaData } from "@/hooks/jobs";
import type { OptionType } from "@/@types/jobs";
import { useEffect, useState } from "react";
import type { Job } from "@/@types/job";
import { useMetaKeywords } from "@/hooks/universals";
import type { JobMetaForm } from "@/@types/job-forms";
import type { MetaKeywordData } from "@/@types/universals";

interface MetaFormProps {
  createdJobId?: number;
  job?: Job;
  onSuccess?: () => void;
  onBack?: () => void;
  onLoadingChange?: (loading: boolean) => void;
}

const MetaForm = ({
  createdJobId,
  job,
  onSuccess: closeModal,
  onLoadingChange,
}: MetaFormProps) => {
  const jobId = job?.id ?? createdJobId;
  const keyword_id = job?.meta_keywords?.[0]?.keyword?.id;

  const [keywordSearch, setKeywordSearch] = useState("");

  const { control, reset, handleSubmit } = useForm<JobMetaForm>();

  const { data: keywords } = useMetaKeywords(keywordSearch);

  const { mutate: createMetaData, isPending } = useAddMetaData();

  useEffect(() => {
    onLoadingChange?.(isPending);
  }, [isPending, onLoadingChange]);

  const keywordOptions: OptionType[] =
    keywords?.map((item: MetaKeywordData) => ({
      value: item.id,
      label: item.name,
    })) ?? [];

  // Pre fill data for editing
  useEffect(() => {
    if (keyword_id) {
      reset({
        meta_keyword_id: keyword_id,
      });
    }
  }, [keyword_id, reset]);

  const onSubmit = (data: JobMetaForm) => {
    if (!jobId) {
      return;
    }

    createMetaData(
      { ...data, job_id: jobId },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Metadata Added Succesfully");
          reset();
          closeModal?.();
        },
      },
    );
  };

  return (
    <form id="meta-form" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <Controller
            name="meta_keyword_id"
            control={control}
            rules={{
              required: "SEO Keywords is required",
            }}
            render={({ field }) => (
              <SearchSelect
                {...field}
                isClearable
                options={keywordOptions}
                value={keywordOptions.find(
                  (option: OptionType) => option.value === field.value,
                )}
                onChange={(option) => field.onChange(option?.value ?? null)}
                onInputChange={setKeywordSearch}
              />
            )}
          />
        </Field>
      </FieldGroup>

      {/* <Button type="submit" disabled={isPending} className="mt-4">
        {isPending ? "Saving..." : "Save"}
      </Button> */}
    </form>
  );
};

export default MetaForm;
