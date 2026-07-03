import type {
  CreateFormDto,
  CreateQuestionDto,
  CreateQuestionOptionDto,
} from "@/@types/forms";

export type QuestionType =
  | "TEXT"
  | "TEXTAREA"
  | "EMAIL"
  | "NUMBER"
  | "DATE"
  | "SELECT"
  | "RADIO"
  | "CHECKBOX";

export interface BuilderOption {
  id: string;
  value: string;
}

export interface BuilderQuestion {
  id: string;

  title: string;

  description: string;

  placeholder?: string;

  helpText?: string;

  type: QuestionType;

  required: boolean;

  options: BuilderOption[];
}

export interface BuilderState {
  title: string;

  description: string;

  selectedQuestionId: string | null;

  questionOrder: string[];

  questions: Record<string, BuilderQuestion>;
}

export interface BuilderStore extends BuilderState {
  patchForm(patch: Partial<Pick<BuilderState, "title" | "description">>): void;

  addQuestion(type?: QuestionType): void;

  patchQuestion(id: string, patch: Partial<BuilderQuestion>): void;

  deleteQuestion(id: string): void;

  duplicateQuestion(id: string): void;

  moveQuestion(activeId: string, overId: string): void;

  selectQuestion(id: string): void;

  addOption(questionId: string): void;

  patchOption(
    questionId: string,
    optionId: string,
    patch: Partial<BuilderOption>,
  ): void;

  removeOption(questionId: string, optionId: string): void;

  reset(): void;

  load(form: BuilderState): void;
}

export type BuilderFormDto = CreateFormDto;
export type BuilderQuestionDto = CreateQuestionDto;
export type BuilderOptionDto = CreateQuestionOptionDto;
