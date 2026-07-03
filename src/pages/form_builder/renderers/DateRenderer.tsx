import { Input } from "@/components/ui/input";

import type { QuestionRendererProps } from "./types";

export function DateRenderer({ readonly = true }: QuestionRendererProps) {
  return <Input type="date" disabled={readonly} />;
}
