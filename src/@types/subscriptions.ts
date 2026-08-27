export type Plan = {
  id: number;
  name: string;
  price: number;
  role: "applicant" | string;
  current_type: "monthly" | "yearly" | string;
  duration_days: number;
  job_post_limit: number;
  cv_download_limit: number;
  cv_builder_limit: number;
  popular: boolean;
  is_active: boolean;
  features: Feature[];
  created_at: string;
  updated_at: string;
};

export type Feature = {
  id: number;
  name: string;
};

export type PlanPayload = {
  name: string;
  price: number;
  role: "applicant" | string;
  current_type: "monthly" | "yearly" | string;
  duration_days: number;
  job_post_limit: number;
  cv_download_limit: number;
  cv_builder_limit: number;
  popular: boolean;
  is_active: boolean;
  features: Feature[];
};

export type FeaturePayload = {
  feature_name: string;
};

export type PaymentPayload = {
  plan_id: number;
  phone: string;
};
