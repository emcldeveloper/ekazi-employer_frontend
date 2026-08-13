import api from "@/lib/axios";

export const createUser = async (payload: any) => {
  const res = await api.post("/employer/users", payload);
  return res.data;
};

export const getUsers = async (page = 1, limit = 25, search = "") => {
  const res = await api.get("/employer/users", {
    params: {
      page,
      limit,
      search,
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

export const getStaffs = async () => {
  const res = await api.get("/client-staffs");
  return res.data?.data;
};
