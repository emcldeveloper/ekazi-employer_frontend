// Applicant Profile
export type ApplicantProfile = {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  dob: string;
  nationality_id: string | null;
  picture: string | null;
  background_picture: string | null;
  email: string;
  marital_status: string;
  gender: string;
};

// Phone
export type Phone = {
  id: number;
  phone_number: string;
};

// Address
export type Address = {
  id: number;
  region: string;
  sub_location: string;
  postal: string;
};

// Experience
export type Experience = {
  id: number;
  position: string;
  position_level: string;
  industry: string;
  employer: string;
  region: string;
  sub_location: string;

  responsibility: string;
  remark: string | null;

  start_date: string;
  end_date: string | null;

  start_salary: number | null;
  end_salary: number | null;
};

export type ExperienceGroup = {
  employer: string;
  region: string;
  sub_location: string;
  positions: Experience[];
};

// Education
export type College = {
  id: number;
  name: string;
  town: string | null;
  registration: string | null;
};

export type Course = {
  id: number;
  name: string;
};

export type Major = {
  id: number;
  name: string;
};

export type EducationLevel = {
  id: number;
  name: string;
};

export type Education = {
  id: number;

  college_id: number;
  college: College;

  course_id: number;
  course: Course;

  major_id: number;
  major: Major;

  education_level_id: number;
  education_level: EducationLevel;

  attachment: string;

  started: string;
  ended: string;
};

// Training
export type Training = {
  id: number;
  name: string;
  institution: string;
  description: string | null;
  started: string;
  ended: string;
  attachment: string;
};

// Skills
export type Skill = {
  id: number;
  name: string;
};

export type Skills = {
  tools: Skill[];
  knowledge: Skill[];
  software: Skill[];
};

// Languages
export type Language = {
  id: number;
  language: string;
  read: string;
  write: string;
  speak: string;
  understand: string;
};

// Culture
export type Culture = {
  id: number;
  name: string;
};

// Proficiency
export type Proficiency = {
  id: number;
  proficiency_id: number;
  proficiency: Skill;
  organization_id: number;
  organization: Skill;
  started: string;
  ended: string;
  award: string;
  attachment: string;
};

// Referee
export type Referee = {
  id: number;

  first_name: string;
  middle_name: string;
  last_name: string;

  employer: string;
  position: string;

  email: string;
  phone: string;

  type: string | null;
};

// Applicant
export type Applicant = {
  applicant_profile: ApplicantProfile;

  phone: Phone[];
  address: Address[];

  objective: string;
  career_summary: string;
  current_position: string;

  experience: Experience[];
  education: Education[];
  training: Training[];

  skills: Skills;

  language: Language[];
  culture: Culture[];
  applicant_personality: unknown[];
  proficiency: Proficiency[];

  referees: Referee[];
};
