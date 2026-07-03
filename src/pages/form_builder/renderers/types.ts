import type { Question } from "@/@types/forms";

export interface QuestionRendererProps {
  question: Question;

  readonly?: boolean;
}
