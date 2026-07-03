import { Input } from "@/components/ui/input";

import type { QuestionRendererProps } from "./types";

export function TextRenderer({
  question,
  readonly = true,
}: QuestionRendererProps) {
  return (
    <Input
      type="text"
      disabled={readonly}
      placeholder={question.placeholder || "Short answer..."}
    />
  );
}
