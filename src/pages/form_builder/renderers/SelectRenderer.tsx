import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { QuestionRendererProps } from "./types";

export function SelectRenderer({
  question,
  readonly = true,
}: QuestionRendererProps) {
  return (
    <Select disabled={readonly}>
      <SelectTrigger>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>

      <SelectContent>
        {question?.options?.map((option) => (
          <SelectItem key={option.id} value={option.id}>
            {option.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
