import { Input } from "@/components/ui/input";

import type { QuestionRendererProps } from "./types";

export function EmailRenderer({
  question,
  readonly = true,
}: QuestionRendererProps) {
  return (
    <Input
      type="email"
      disabled={readonly}
      placeholder={question.placeholder || "example@email.com"}
    />
  );
}
