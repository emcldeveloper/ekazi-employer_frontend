// evaluation questions
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

// evaluation question criterias
export type QuestionCriteriaPayload = {
  evaluation_id: number;
  name: string;
};

export type QuestionCriteria = {
  id: number;
  evaluation_id: number;
  name: string;
};

// candidate evaluation
export type Evaluation = {
  evaluation_id: number;
  total_score: number;
};

export type EvaluationPayload = {
  applicant_id: number;
  job_id: number;
  evaluations: Evaluation[];
  comment: string;
};
