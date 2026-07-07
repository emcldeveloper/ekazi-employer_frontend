export type Industry = {
  id: number;
  name: string;
};

export type CompanySize = {
  id: number;
  name: string;
};

export type CompanyType = {
  id: number;
  type_name: string;
};

export type JobType = {
  id: number;
  type_name: string;
};

export type PositionType = {
  id: number;
  position_name: string;
};

export type PositionLevel = {
  id: number;
  position_name: string;
};

export type SalaryRange = {
  id: number;
  low: number;
  high: number;
};

export type Country = {
  id: number;
  name: string;
};

export type Region = {
  id: number;
  country_id: number;
  name: string;
  country?: Country;
};

export type EducationLevel = {
  id: number;
  education_level: string;
};

export type Course = {
  id: number;
  course_name: string;
};

export type Major = {
  id: number;
  name: string;
};

export type Gender = {
  id: number;
  gender_name: string;
};

export type Culture = {
  id: number;
  culture_name: string;
};

export type Personality = {
  id: number;
  personality_name: string;
};

export type Knowledge = {
  id: number;
  knowledge_name: string;
};

export type Tool = {
  id: number;
  tool_name: string;
};

export type Software = {
  id: number;
  software_name: string;
};

export type Proficiency = {
  id: number;
  proficiency_name: string;
};
