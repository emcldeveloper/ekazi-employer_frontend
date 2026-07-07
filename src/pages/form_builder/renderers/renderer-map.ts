import { TextRenderer } from "./TextRenderer";
import { TextareaRenderer } from "./TextareaRenderer";
import { EmailRenderer } from "./EmailRenderer";
import { NumberRenderer } from "./NumberRenderer";
import { DateRenderer } from "./DateRenderer";
import { SelectRenderer } from "./SelectRenderer";
import { CheckboxRenderer } from "./CheckboxRenderer";
import { RadioRenderer } from "./RadioRenderer";

export const QUESTION_RENDERERS = {
  TEXT: TextRenderer,
  TEXTAREA: TextareaRenderer,
  EMAIL: EmailRenderer,
  NUMBER: NumberRenderer,
  DATE: DateRenderer,
  SELECT: SelectRenderer,
  CHECKBOX: CheckboxRenderer,
  RADIO: RadioRenderer,
} as const;

export type QuestionType = keyof typeof QUESTION_RENDERERS;
