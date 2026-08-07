import type { JobseekerPayload } from "@/@types/jobseekers";
import api from "@/lib/axios";

// find all
export const getJobseekers = async (params: JobseekerPayload = {}) => {
  const res = await api.get("/jobseekers", {
    params,
  });
  return res.data;
};

// find one
export const getJobseeker = async (id: number) => {
  const res = await api.get(`/jobseekers/${id}`);
  return res.data?.data;
};
