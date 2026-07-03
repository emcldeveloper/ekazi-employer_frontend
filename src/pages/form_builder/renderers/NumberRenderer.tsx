import { Input } from "@/components/ui/input";

import type { QuestionRendererProps } from "./types";

export function NumberRenderer({
  question,
  readonly = true,
}: QuestionRendererProps) {
  return (
    <Input
      type="number"
      disabled={readonly}
      placeholder={question.placeholder || "Enter a number"}
    />
  );
}
