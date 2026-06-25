import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import SearchSelect from "react-select";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";

import { useAddMetaData } from "@/hooks/jobs";
import type { JobMetaKeywords } from "@/@types/jobs";
import { useEffect } from "react";

interface MetaFormProps {
  job: any;
  onSuccess?: () => void;
}

const MetaForm = ({ job, onSuccess: closeModal }: MetaFormProps) => {
  const metaData = job?.job_meta_keywords?.meta_keyword?.name;

  const { control, reset, handleSubmit } = useForm<JobMetaKeywords>();

  const { mutate: createMetaData, isPending } = useAddMetaData();

  // Pre fill data for editing
  useEffect(() => {
    if (metaData) {
      reset({
        seo_keyword: metaData || "",
      });
    }
  }, [metaData, reset]);

  const onSubmit = (data: JobMetaKeywords) => {
    createMetaData(
      { ...data, job_id: job?.id },
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <Controller
            name="seo_keyword"
            control={control}
            rules={{
              required: "SEO Keywords is required",
            }}
            render={({ field }) => (
              <SearchSelect {...field} isClearable options={[]} />
            )}
          />
        </Field>
      </FieldGroup>

      <Button type="submit" disabled={isPending} className="mt-4">
        {isPending ? "Saving..." : "Save"}
      </Button>
    </form>
  );
};

export default MetaForm;
