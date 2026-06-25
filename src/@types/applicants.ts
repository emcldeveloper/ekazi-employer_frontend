import type { Industry, Region } from "./universals";

export type EducationLevel = {
  id: number;
  education_level: string;
};

export type College = {
  id: number;
  college_name: string;
  town: string | null;
  reg: string | null;
  status: string;
  region: Region;
};

export type Course = {
  id: number;
  course_name: string;
};

export type Major = {
  id: number;
  name: string;
};

export type Education = {
  id: number;
  started: Date;
  ended: Date;
  name: string | null;
  attachment: string;

  level: EducationLevel;
  college: College;
  course: Course;
  major: Major;
};

export type Employer = {
  id: number;
  employer_name: string;
  sub_location: string;
};

export type Position = {
  id: number;
  position_name: string;
};

export type Experience = {
  id: number;
  applicant_employer_id: number;
  start_date: string;
  end_date: string | null;
  responsibility: string;
  remark: string | null;

  employer: Employer;
  region: Region;
  position: Position;
  industry?: Industry;
};

export type Applicant = {
  experience: Experience[];
  education: Education[];
};

export type ExperienceGroup = {
  employer: Employer;
  region: Region;
  positions: Experience[];
};
