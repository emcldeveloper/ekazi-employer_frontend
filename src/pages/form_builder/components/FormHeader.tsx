import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useBuilder } from "../hooks/useBuilder";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

export function FormHeader() {
  const title = useBuilder((state) => state.title);
  const description = useBuilder((state) => state.description);

  const patchForm = useBuilder((state) => state.patchForm);

  return (
    <FieldGroup>
      <Field>
        <FieldLabel>Form Title *</FieldLabel>
        <Input
          id="title"
          placeholder="e.g. Frontend Developer Technical Interview"
          value={title}
          onChange={(e) =>
            patchForm({
              title: e.target.value,
            })
          }
        />
      </Field>

      <Field>
        <FieldLabel>Description</FieldLabel>

        <Textarea
          id="description"
          rows={3}
          placeholder="Provide a short description for recruiters or applicants..."
          value={description}
          onChange={(e) =>
            patchForm({
              description: e.target.value,
            })
          }
        />
      </Field>
    </FieldGroup>
  );
}
