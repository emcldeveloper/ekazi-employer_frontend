import api from "@/lib/axios";

export const getUser = async () => {
  const res = await api.get("/employer-account");
  return res.data;
};
