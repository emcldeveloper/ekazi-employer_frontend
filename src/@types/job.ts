import type {
  Category,
  Country,
  Course,
  EducationLevel,
  Gender,
  Industry,
  Keyword,
  Knowledge,
  Language,
  Major,
  Personality,
  Position,
  PositionLevel,
  Proficiency,
  Region,
  SalaryRange,
  SkillLevel,
} from "./universals";

export interface JobResponse {
  success: boolean;
  message: string;
  data: Job;
}

export interface Job {
  id: number;
  title: string;
  show_client_name: boolean;
  applicant_min_age: number;
  applicant_max_age: number;
  hide: boolean;
  quantity: number;
  years_experience: string;
  published: string;
  status: string;
  dead_line: string;
  created_at: string;
  updated_at: string;
  total_applicants: number;

  client: Client;
  industry: Industry;
  category: Category;
  position: Position;
  position_level: PositionLevel;

  country: Country | null;
  region: Region | null;
  currency: Currency;

  addresses: Address[];
  statistics: Statistic[];

  job_type: JobTypeData;
  gender: Gender;

  meta_keywords: MetaKeyword[];
  cultures: CultureItem[];
  personalities: PersonalityItem[];
  softwares: SoftwareItem[];

  tools: ToolItem[];
  proficiencies: ProficiencyItem[];
  knowledge: KnowledgeItem[];

  salaries: Salary[];
  education: Education[];
  languages: LanguageRequirement[];
  report_to: ReportTo[];
  requirements: Requirement[];
  other_requirements: OtherRequirement[];
}

export interface Client {
  id: number;
  name: string;
  logo: string;
}

export interface Currency {
  id: number;
  currency_name: string;
  created_at: string;
  updated_at: string;
}

export interface Address {
  id: number;
  sub_location: string;
  region: Region | null;
}

export interface Statistic {
  id: number;
  job_id: number;
  job_likes: number;
  job_views: number;
  apply_condition: boolean;
  external_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface MetaKeyword {
  id: number;
  keyword: Keyword;
}

export interface ToolItem {
  id: number;
  tool: JobTool;
}

export interface JobTool {
  id: number;
  name: string;
}

export interface JobTypeData {
  id: number;
  name: string;
}

export interface KnowledgeItem {
  id: number;
  knowledge: Knowledge;
}

export interface SoftwareItem {
  id: number;
  software: JobSoftware;
}

export interface JobSoftware {
  id: number;
  name: string;
}

export interface CultureItem {
  id: number;
  culture: JobCulture;
}

export interface JobCulture {
  id: number;
  name: string;
}

export interface PersonalityItem {
  id: number;
  personality: Personality;
}

export interface ProficiencyItem {
  id: number;
  proficiency: Proficiency;
}

export interface Salary {
  id: number;
  from_salary: SalaryRange;
  to_salary: SalaryRange;
}

export interface Education {
  id: number;
  education_level: EducationLevel;
  course: Course;
  major: Major;
}

export interface LanguageRequirement {
  id: number;
  language: Language;
  read: SkillLevel;
  write: SkillLevel;
  speak: SkillLevel;
  understand: SkillLevel;
}

export interface ReportTo {
  id: number;
  job_id: number;
  supervises: string;
  interacts_with: string;
  report_to: string;
  created_at: string;
  updated_at: string;
}

export interface Requirement {
  id: number;
  job_id: number;
  main_duties: string;
  created_at: string;
  updated_at: string;
}

export interface OtherRequirement {
  id: number;
  job_id: number;
  other_requirement: string;
  created_at: string;
  updated_at: string;
}
