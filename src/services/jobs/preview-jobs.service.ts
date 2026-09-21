import api from "@/lib/axios";

export const previewJobs = async () => {
  const res = await api.get("/jobs");

  return res.data;
};
