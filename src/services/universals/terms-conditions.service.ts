import api from "@/lib/axios";

export const termsConditions = async () => {
  const res = await api.get("/term-conditions");
  return res.data;
};

export const getTermCondition = async (id: number) => {
  const res = await api.get(`/term-conditions/${id}`);
  return res.data;
};

export const createTermCondition = async (payload: any) => {
  const res = await api.post("/term-conditions", payload);
  return res.data;
};

export const updateTermCondition = async ({
  id,
  payload,
}: {
  id: number;
  payload: any;
}) => {
  const res = await api.put(`/term-conditions/${id}`, payload);
  return res.data;
};

export const deleteTermCondition = async (id: number) => {
  const res = await api.delete(`/term-conditions/${id}`);
  return res.data;
};
