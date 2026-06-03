import api from "@/lib/axios";

export const getStatistics = async () => {
  const res = await api.get(`/employer-statistics`);
  return res.data;
};
