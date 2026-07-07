import { Checkbox } from "@/components/ui/checkbox";

import { Label } from "@/components/ui/label";

import type { QuestionRendererProps } from "./types";

export function CheckboxRenderer({
  question,
  readonly = true,
}: QuestionRendererProps) {
  return (
    <div className="space-y-3">
      {question?.options?.map((option) => (
        <div key={option.id} className="flex items-center space-x-3">
          <Checkbox disabled={readonly} />

          <Label>{option.value}</Label>
        </div>
      ))}
    </div>
  );
}
