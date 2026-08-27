import api from "@/lib/axios";

export const dashboard = async () => {
  const res = await api.get("/admin/dashboard");
  return res.data;
};
