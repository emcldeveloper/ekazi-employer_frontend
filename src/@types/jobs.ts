export type JobCreateForm = {
  title: string;
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
