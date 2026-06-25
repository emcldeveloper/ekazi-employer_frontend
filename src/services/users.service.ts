import api from "@/lib/axios";

export const createUser = async (payload: any) => {
  const res = await api.post("/employer-user-management/store", payload);
  return res.data;
};

export const getUsers = async () => {
  const res = await api.get("/employer-user-management/users");
  return res.data;
};

export const getUserDetails = async (id: number) => {
  const res = await api.get(`/employer-user-management/show/${id}`);
  return res.data;
};

export const updateUser = async ({
  id,
  payload,
}: {
  id: number;
  payload: any;
}) => {
  const res = await api.post(`/employer-user-management/update/${id}`, payload);

  return res.data;
};

export const userSettings = async () => {
  const res = await api.get("/employer-user-management");
  return res.data;
};
