import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { useForm } from "@/hooks/forms/useForm";

import { FormRenderer } from "./renderers/FormRenderer";
import { PreviewToolbar } from "./renderers/PreviewToolbar";

export default function PreviewFormPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data: form, isLoading, isError } = useForm(id!);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl space-y-6">
        <Skeleton className="h-12 w-full" />

        <Skeleton className="h-40 w-full" />

        <Skeleton className="h-52 w-full" />

        <Skeleton className="h-52 w-full" />
      </div>
    );
  }

  if (isError || !form) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Form not found</h2>

          <p className="mt-2 text-muted-foreground">
            The requested form could not be loaded.
          </p>

          <Button className="mt-6" onClick={() => navigate("/forms")}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-4 space-y-4">
      <PreviewToolbar formId={form.id} />

      <FormRenderer form={form} />
    </div>
  );
}
