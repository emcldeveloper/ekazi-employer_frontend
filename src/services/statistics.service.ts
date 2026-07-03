import api from "@/lib/axios";

export const getStatistics = async () => {
  const res = await api.get(`/employer-dashboard/dashboard-stats`);
  return res.data;
};
