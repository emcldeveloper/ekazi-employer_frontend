import type {
  FeaturePayload,
  PaymentPayload,
  PlanPayload,
} from "@/@types/subscriptions";
import api from "@/lib/axios";

/**
 * Plans API
 */
export const plansList = async (
  page: number,
  limit: number,
  search: string,
) => {
  const res = await api.get("/subscription-plans", {
    params: {
      page,
      limit,
      search,
    },
  });
  return res.data;
};

export const planDetails = async (id: number) => {
  const res = await api.get(`/subscription-plans/${id}`);
  return res.data;
};

export const createPlan = async (payload: PlanPayload) => {
  const res = await api.post("/subscription-plans", payload);
  return res.data;
};

export const updatePlan = async ({
  id,
  payload,
}: {
  id: number;
  payload: PlanPayload;
}) => {
  const res = await api.put(`/subscription-plans/${id}`, payload);
  return res.data;
};

export const deletePlan = async (id: number) => {
  const res = await api.delete(`/subscription-plans/${id}`);
  return res.data;
};

/**
 * Features API
 */
export const featuresList = async (
  page: number,
  limit: number,
  search: string,
) => {
  const res = await api.get("/subscription-features", {
    params: {
      page,
      limit,
      search,
    },
  });
  return res.data;
};

export const featureDetails = async (id: number) => {
  const res = await api.get(`/subscription-features/${id}`);
  return res.data;
};

export const createFeature = async (payload: FeaturePayload) => {
  const res = await api.post("/subscription-features", payload);
  return res.data;
};

export const updateFeature = async ({
  id,
  payload,
}: {
  id: number;
  payload: FeaturePayload;
}) => {
  const res = await api.put(`/subscription-features/${id}`, payload);
  return res.data;
};

export const deleteFeature = async (id: number) => {
  const res = await api.delete(`/subscription-features/${id}`);
  return res.data;
};

/**
 * Client Subscriptions API
 */
export const createSubscription = async (payload: PaymentPayload) => {
  const res = await api.post("/payment/initiate", payload);
  return res.data;
};

export const clientSubscriptions = async (
  search: string,
  page: number,
  limit: number,
) => {
  const res = await api.get("/payment/current-subscriptions", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res.data;
};

export const clientPayments = async (
  search: string,
  page: number,
  limit: number,
) => {
  const res = await api.get("/payment/subscription-payments", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res.data;
};

/**
 * Admin Subscriptions & Payments API
 */
export const fetchPayments = async (limit: number, offset: number) => {
  const res = await api.get("/payment/snippe-list", {
    params: {
      limit,
      offset,
    },
  });
  return res.data;
};

export const searchPayment = async () => {
  const res = await api.get("/payment/snippe-search");
  return res.data;
};

export const fetchPayment = async (reference: string) => {
  const res = await api.get(`/payment/snippe-payment/${reference}`);
  return res.data;
};

export const fetchBalance = async () => {
  const res = await api.get("/payment/snippe-balance");
  return res.data;
};

export const pushUssd = async (reference: string) => {
  const res = await api.post(`/payment/snippe/ussd-push/${reference}`);
  return res.data;
};
