import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Label } from "@/components/ui/label";

import type { QuestionRendererProps } from "./types";

export function RadioRenderer({
  question,
  readonly = true,
}: QuestionRendererProps) {
  return (
    <RadioGroup>
      {question?.options?.map((option) => (
        <div key={option.id} className="flex items-center space-x-3">
          <RadioGroupItem disabled={readonly} value={option.id} />

          <Label>{option.value}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}
