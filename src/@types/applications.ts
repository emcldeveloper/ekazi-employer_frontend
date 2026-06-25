export interface Application {
  id: number;
  applicant_id: number;

  letter: string;
  status?: string;

  created_at: string;
  updated_at: string;

  applicant: Applicant;
  job: Job;
  stage: Stage;
}

export interface Stage {
  id: number;
  stage_name: string;
}

export interface Job {
  id: number;
  position_id: number;
  job_position: JobPosition;
}

export interface JobPosition {
  id: number;
  position_name: string;
}

export interface Applicant {
  id: number;
  user_id: number;
  marital_id: number;
  gender_id: number;
  picture: string;

  first_name: string;
  middle_name: string;
  last_name: string;

  email?: string;
  phone?: string;
}
