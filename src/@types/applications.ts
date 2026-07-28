export interface Application {
  id: number;
  applicant_id: number;
  job_id: number;

  letter: string;
  status?: string;

  created_at: string;
  updated_at: string;
  moved_at: string;

  applicant: Applicant;
  job: Job;
  stage: Stage;
  current_stage: Stage;
}

export interface Stage {
  id: number;
  name: string;
}

export interface ApplicationsByStageResponse {
  data: Application[];
  statistics: StageStatistics;
}

export interface StageStatistics {
  Applied: number;
  Shortlisted: number;
  Screening: number;
  Interview: number;
  Selection: number;
  "Background Check": number;
  Employed: number;
  Offer: number;
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

export interface InterviewType {
  id: number;
  name: string;
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

export interface ShortlistPayload {
  stage_id: number;
  applicant_id: number[];
}

export interface ScreeningPayload {
  stage_id: number;
  applicant_id: number[];
  test_date: Date;
  test_deadline: Date;
  test_duration: number;
}

export interface ScreeningFormData {
  test_date: Date;
  test_deadline: Date;
  test_duration: number;
}

export interface InterviewPayload {
  stage_id: number;
  applicant_id: number[];
  interview_type: number;
  region_id?: number;
  online_link?: string;
  interviewer: number[];
  interviewer_participant?: string[];
  address?: string;
  message_body: string;
  invite_date: string;
  duration_test: string;
}

export interface InterviewFormData {
  invite_date: string;
  interview_type: number;
  online_link?: string;
  country_id?: number;
  region_id?: number;
  address?: string;
  interviewer: number[];
  interviewer_participant?: string[];
  message_body: string;
  duration_test: string;
}

export interface SelectionPayload {
  stage_id: number;
  applicant_id: number[];
  message_body: string;
}

export interface BackgroundCheckPayload {
  stage_id: number;
  applicant_id: number[];
  message_body: string;
}

export interface EmployedPayload {
  stage_id: number;
  applicant_id: number[];
  message_body: string;
}

export interface OfferPayload {
  stage_id: number;
  applicant_id: number[];
  message_body: string;
}

export interface MessageFormData {
  message_body: string;
}
