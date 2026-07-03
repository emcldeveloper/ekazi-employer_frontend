import { Textarea } from "@/components/ui/textarea";

import type { QuestionRendererProps } from "./types";

export function TextareaRenderer({
  question,
  readonly = true,
}: QuestionRendererProps) {
  return (
    <Textarea
      rows={5}
      disabled={readonly}
      placeholder={question.placeholder || "Long answer..."}
    />
  );
}
