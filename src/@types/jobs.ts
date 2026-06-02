export type JobCreateForm = {
  title: string;
  type_id: number;
  quantity: number;
  dead_line: Date;

  industry_id?: number | null;
  category_id?: number | null;

  country_id?: number | null;
  region?: number | null;
  sub_location?: string | null;

  currency_id?: number | null;
  position_level_id?: number | null;
  contact_id?: number | null;

  from_salary_id?: number | null;
  to_salary_id?: number | null;
};

export type JobEducationData = {
  job_id: number;

  education_level_id: number;
  major_id: number;
  programme_id: number;
};

export type JobLanguageData = {
  job_id: number;

  language_id: number;
  write_id: number;
  understand_id: number;
  speak_id: number;
  read_id: number;
};

export type JobRequirementData = {
  years_experience?: number | null;
  applicant_min_age?: number | null;
  applicant_max_age?: number | null;
  gender_id?: number | null;

  position_experiences?: number[] | null;
  culture?: string[] | null;
  knowledge?: string[] | null;
  personality?: string[] | null;
  software?: string[] | null;
  proficiency_id?: number[] | null;
  tool?: string[] | null;
};

export type JobOtherRequirementData = {
  job_id: number;

  other_requirement: string;
};

export type AllRequirementsData = JobRequirementData & JobOtherRequirementData;

export type JobMainDutiesData = {
  job_id: number;
  main_duties: string;
};

export type JobReportingData = {
  job_id: number;

  report_to?: string;
  supervises?: string;
  interacts_with?: string;
};

export type JobLocationData = {
  job_id: number;
  regions: number[];
  sub_locations?: number[] | null;
};

export type JobMetaData = {
  job_id: number;
  seo_keyword: string;
};
