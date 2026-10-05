export type EvaluationQuestionPayload = {
  name: string;
  description: string;
  priority?: string;
  group?: string;
};

export type EvaluationQuestion = {
  id: number;
  name: string;
  description: string;
  priority?: string;
  group?: string;
};

export type QuestionCriteriaPayload = {
  evaluation_id: number;
  name: string;
};

export type QuestionCriteria = {
  id: number;
  evaluation_id: number;
  name: string;
};
