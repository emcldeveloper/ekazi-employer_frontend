export type Industry = {
  id: number;
  industry_name: string;
};

export type CompanySize = {
  id: number;
  name: string;
};

export type JobType = {
  id: number;
  type_name: string;
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
  region_name: string;
};
