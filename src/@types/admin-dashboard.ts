export type JobseekerProfile = {
  complete: string;
  count: string;
  month_number: number;
  period: string;
  uncomplete: string;
};

export type JobsByMonth = {
  period: string;
  count: string;
};

export type JobsByStage = {
  stage_id: number;
  stage_name: string;
  count: string;
};
