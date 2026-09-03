export type Payment = {
  amount: {
    currency: string;
    value: number;
  };
  api_version: string;
  channel: {
    provider: string;
    type: string;
  };
  completed_at: string;
  created_at: string;
  customer: {
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
  };
  failure_reason: string | null;
  id: string;
  metadata: {
    billing_interval: string;
    employeeRange: string;
    order_id: string;
    payment_id: string;
    payment_method: string;
    plan_slug: string;
    registration_id: string;
    seats: number;
    workspaceType: string;
  };
  object: string;
  payment_type: string;
  reference: string;
  settlement: {
    fees: {
      currency: string;
      value: number;
    };
    gross: {
      currency: string;
      value: number;
    };
    net: {
      currency: string;
      value: number;
    };
  };
  status: string;
};

export interface ClientPayment {
  id: number;
  subscription_plan_id: number;
  plan: ClientPlan;
  amount: number;
  transaction_id: string;
  provider_transaction_id: string;
  provider: string;
  payment_type: string | null;
  status: "success" | "failed";
  paid_at: string | null;
  failure_reason: string | null;
  role: "employer" | "job_seeker";
  created_at: string;
  updated_at: string;
}

export interface ClientPlan {
  id: number;
  name: string;
  price: number;
  role: "employer" | "job_seeker";
  job_post_limit: number;
  cv_download_limit: number;
  current_type: "monthly" | "yearly";
  duration_days: number;
  cv_builder_limit: number | null;
  popular: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
