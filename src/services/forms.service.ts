import type {
  EvaluationPayload,
  EvaluationQuestionPayload,
  QuestionCriteriaPayload,
} from "@/@types/forms";
import api from "@/lib/axios";

/**
 *  Evaluation questions APIs
 */
export const createEvaluationQuestion = async (
  payload: EvaluationQuestionPayload,
) => {
  const res = await api.post("/evaluations", payload);
  return res.data;
};

export const evaluationQuestions = async ({
  search,
  page,
  limit,
}: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const res = await api.get("/evaluations", {
    params: {
      page,
      limit,
      search,
    },
  });
  return res.data;
};

export const evaluationQuestion = async (id: number) => {
  const res = await api.get(`/evaluations/${id}`);
  return res.data?.data;
};

export const updateEvaluationQuestion = async ({
  id,
  payload,
}: {
  id: number;
  payload: EvaluationQuestionPayload;
}) => {
  const res = await api.patch(`/evaluations/${id}`, payload);
  return res.data;
};

export const deleteEvaluationQuestion = async (id: number) => {
  const res = await api.delete(`/evaluations/${id}`);
  return res.data;
};

/**
 *  Evaluation question criterias APIs
 */
export const createQuestionCriteria = async (
  payload: QuestionCriteriaPayload,
) => {
  const res = await api.post("/evaluation-criterias", payload);
  return res.data;
};

export const questionCriterias = async () => {
  const res = await api.get("/evaluation-criterias");
  return res.data;
};

export const questionCriteria = async (id: number) => {
  const res = await api.get(`/evaluation-criterias/${id}`);
  return res.data?.data;
};

export const updateQuestionCriteria = async ({
  id,
  payload,
}: {
  id: number;
  payload: QuestionCriteriaPayload;
}) => {
  const res = await api.patch(`/evaluation-criterias/${id}`, payload);
  return res.data;
};

export const deleteQuestionCriteria = async (id: number) => {
  const res = await api.delete(`/evaluation-criterias/${id}`);
  return res.data;
};

/**
 * Evaluation
 */
export const evaluateCandidate = async (payload: EvaluationPayload) => {
  const res = await api.post("/evaluations/results", payload);
  return res.data;
};

export const evaluationResult = async (
  applicant_id: number,
  job_id: number,
) => {
  const res = await api.get(`/evaluations/results/${applicant_id}/${job_id}`);
  return res.data?.data;
};
