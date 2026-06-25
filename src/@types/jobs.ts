export type JobCreateForm = {
  title: string | number;
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

export type OptionType = {
  value: number;
  label: string;
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

export type JobRequirementFormValues = {
  years_experience?: number | null;
  applicant_min_age?: number | null;
  applicant_max_age?: number | null;
  gender_id?: number | null;
  position_experiences?: number[] | null;
  culture?: OptionType[] | null;
  knowledge?: OptionType[] | null;
  personality?: OptionType[] | null;
  software?: OptionType[] | null;
  proficiency_id?: OptionType[] | null;
  tool?: OptionType[] | null;
};

export type JobOtherRequirementData = {
  job_id: number;

  other_requirement: string;
};

export type JobMainDutiesData = {
  job_id: number;
  main_duties: string;
};

export type JobMetaKeywords = {
  job_id: number;
  seo_keyword: string;
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

//
export type JobFilters = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string; //published
  deadline?: string; // active, expired, expire_today
};

//
// WELL ARRANGED
//

export type Job = {
  id: number;
  assigned_to: number | null;
  assigned_by: number | null;
  subscription_id: number | null;
  client_id: number;
  creator_id: number;
  updator_id: number;
  gender_id: number;
  position_id: number;
  category_id: number;
  industry_id: number;
  country_id: number;
  region_id: number;
  stage_id: number;
  type_id: number;
  position_level_id: number;
  title: string;
  years_experience: string;
  applicant_min_age: number;
  applicant_max_age: number;
  status: string;
  published: string;
  featured: number;
  hide: number;
  created_at: string;
  updated_at: string;
  applied_count: number;
  dead_line: Date;
  quantity: number;

  client: Client;
  industry: null;
  job_position: JobPosition;
  job_gender: JobGender;
  job_education: JobEducation[];
  job_report_to: JobReportTo;
  job_duties: JobDuties;
  job_other_requirement: JobOtherRequirement;
  job_language: JobLanguage[];
  job_addresses: JobAddress[];
  job_type: JobType;

  job_category: null;
  job_culture: [];
  job_knowledge: [];
  job_personality: [];
  indirect_applicant: [];
};

export type Client = {
  id: number;
  logo: string;
  featured: number;
  client_name: string;
};

export type JobPosition = {
  id: number;
  position_name: string;
};

export type JobType = {
  id: number;
  type_name: string;
};

export type JobGender = {
  id: number;
  gender_name: string;
  hide: number;
};

export type JobEducation = {
  id: number;
  programme_category_id: number;
  course_id: number;
  education_level_id: number;
  major_id: number;
  job_id: number;
  course: {
    id: number;
    course_name: string;
  };
  education_level: {
    id: number;
    education_level: string;
  };
  major: {
    id: number;
    name: string;
    creator_id: number;
    updator_id: number;
    created_at: string;
    updated_at: string;
  };
};

export type JobReportTo = {
  id: number;
  job_id: number;
  supervises: string;
  interacts_with: string;
  report_to: string;
  created_at: string;
  updated_at: string;
};

export type JobDuties = {
  id: number;
  job_id: number;
  main_duties: string;
  created_at: string;
  updated_at: string;
};

export type JobOtherRequirement = {
  id: number;
  job_id: number;
  other_requirement: string;
  created_at: string;
  updated_at: string;
};

export type JobLanguage = {
  id: number;
  job_id: number;
  language_id: number;
  read_id: number;
  write_id: number;
  speak_id: number;
  understand_id: number;
  language: {
    id: number;
    language_name: string;
  };
  language_write: {
    id: number;
    write_ability: string;
  };
  language_understand: {
    id: number;
    understand_ability: string;
  };
  language_speak: {
    id: number;
    speak_ability: string;
  };
  language_read: {
    id: number;
    read_ability: string;
  };
};

export type JobAddress = {
  id: number;
  job_id: number;
  region_id: number;
  sub_location: string | null;
  region: unknown | null;
  created_at: string;
  updated_at: string;
};
