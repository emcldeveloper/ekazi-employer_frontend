import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { QuestionType } from "../types/builder.types";

const QUESTION_TYPES: {
  label: string;
  value: QuestionType;
}[] = [
  {
    label: "Short Text",
    value: "TEXT",
  },
  {
    label: "Paragraph",
    value: "TEXTAREA",
  },
  {
    label: "Email",
    value: "EMAIL",
  },
  {
    label: "Number",
    value: "NUMBER",
  },
  {
    label: "Date",
    value: "DATE",
  },
  {
    label: "Dropdown",
    value: "SELECT",
  },
  {
    label: "Checkbox",
    value: "CHECKBOX",
  },
  {
    label: "Radio",
    value: "RADIO",
  },
];

interface Props {
  value: QuestionType;

  onChange(value: QuestionType): void;
}

export function QuestionTypeSelect({ value, onChange }: Props) {
  return (
    <Select
      value={value}
      onValueChange={(value) => onChange(value as QuestionType)}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {QUESTION_TYPES.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
