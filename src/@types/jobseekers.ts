export type JobseekerPayload = {
  page?: number;
  limit?: number;
  search?: string;
  position?: string;
  education_level_id?: number;
  industry_id?: number;
  position_level_id?: number;
};

export interface JobseekerFilters {
  position?: string;
  positionLevelId?: number;
  industryId?: number;
  educationLevelId?: number;
}

export type Jobseeker = {
  id: number;
  picture: string;
  background_picture: string | null;
  first_name: string;
  middle_name: string;
  last_name: string;
  created_at: string;
  applicant_position: string | null;
  profile_completion: ProfileCompletion;
};

export type ProfileCompletion = {
  total_percentage: number;
  sections: ProfileCompletionSections;
};

export type ProfileCompletionSections = {
  basic_information: number;
  contact_information: number;
  career_summary: number;
  objective: number;
  education: number;
  experience: number;
  tools: number;
  software: number;
  knowledge: number;
  languages: number;
  culture: number;
  proficiency: number;
  training: number;
  referees: number;
};

export type ShortlistJobForm = {
  job_id: number;
};
