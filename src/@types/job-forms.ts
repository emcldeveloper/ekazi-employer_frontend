import type { OptionType } from "./jobs";

export type JobCreateForm = {
  position_id: string | number;
  type_id: number;
  quantity: number;
  dead_line: string;

  industry_id?: number | null;
  category_id?: number | null;

  country_id?: number | null;
  region_id?: number | null;
  sub_location?: string | null;

  currency_id?: number | null;
  position_level_id?: number | null;
  contact_id?: number | null;

  from_salary?: number | null;
  to_salary?: number | null;
};

export type JobMetaForm = {
  job_id: number;
  meta_keyword_id: number;
};

export type JobEducationForm = {
  id?: number;
  job_id: number;
  course_id: number;
  education_level_id: number;
  major_id: number;
  programme_category_id: number;
};

export type JobLanguageForm = {
  job_id: number;
  language_id: number;
  write_id: number;
  understand_id: number;
  speak_id: number;
  read_id: number;
};

export interface JobRequirementForm {
  years_experience?: string;
  applicant_min_age?: number;
  applicant_max_age?: number;
  gender_id?: number;

  culture_ids?: OptionType[];
  personality_ids?: OptionType[];
  software_ids?: OptionType[];
  tool_ids?: OptionType[];
  knowledge_ids?: OptionType[];
  proficiency_ids?: OptionType[];
}

export type JobRequirementPayload = {
  years_experience?: string;
  applicant_min_age?: number;
  applicant_max_age?: number;
  gender_id?: number;

  position_experiences?: number[];
  culture_ids?: number[];
  personality_ids?: number[];
  software_ids?: number[];
  tool_ids?: number[];
  knowledge_ids?: number[];
  proficiency_ids?: number[];
};

export type JobMainDutiesForm = {
  id?: number;
  job_id: number;
  main_duties: string;
};

export type JobOtherRequirementForm = {
  id?: number;
  job_id: number;
  other_requirement: string;
};
