import type {
  FeaturePayload,
  PaymentPayload,
  PlanPayload,
} from "@/@types/subscriptions";
import api from "@/lib/axios";

export const createSubscription = async (payload: PaymentPayload) => {
  const res = await api.post("/payment/initiate", payload);

  return res.data;
};

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
