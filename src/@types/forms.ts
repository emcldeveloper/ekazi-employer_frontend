export type FormStatus = "DRAFT" | "PUBLISHED";

export interface QuestionOption {
  id: string;
  value: string;
  order: number;
}

export interface Question {
  id: string;
  title: string;
  description?: string;
  placeholder?: string;
  type: string;
  required: boolean;
  order: number;
  options?: QuestionOption[];
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  status: FormStatus;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateQuestionOptionDto {
  value: string;
  order: number;
}

export interface CreateQuestionDto {
  title: string;
  description?: string;
  type: string;
  required?: boolean;
  order: number;
  options?: CreateQuestionOptionDto[];
}

export interface CreateFormDto {
  title: string;
  description?: string;
  questions: CreateQuestionDto[];
}

export interface UpdateQuestionOptionDto {
  id?: string;
  value: string;
  order: number;
}

export interface UpdateQuestionDto {
  id?: string;
  title: string;
  description?: string;
  type: string;
  required?: boolean;
  order: number;
  options?: UpdateQuestionOptionDto[];
}

export interface UpdateFormDto {
  title?: string;
  description?: string;
  questions?: UpdateQuestionDto[];
}
