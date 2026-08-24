import api from "@/lib/axios";

export const createUser = async (payload: any) => {
  const res = await api.post("/employer/users", payload);
  return res.data;
};

export const getUsers = async (search: string, page: number, limit: number) => {
  const res = await api.get("/employer/users", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res.data;
};

export const getUserDetails = async (id: number) => {
  const res = await api.get(`/employer/users/${id}`);
  return res.data;
};

export const updateUser = async ({
  id,
  payload,
}: {
  id: number;
  payload: any;
}) => {
  const res = await api.post(`/employer/users/${id}`, payload);

  return res.data;
};

export const userSettings = async () => {
  const res = await api.get("/employer-user-management");
  return res.data;
};
