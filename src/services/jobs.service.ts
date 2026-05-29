import type { JobCreateForm } from "@/@types/jobs";
import api from "@/lib/axios";

export const createJob = async (data: JobCreateForm) => {
  const res = await api.post("/employer-jobs", data);
  return res.data;
};

export const updateJob = async () => {
  const res = await api.post("/employer-jobs");
  return res.data;
};

export const getJobs = async () => {
  const res = await api.get("/employer-jobs");
  return res.data;
};

export const getJob = async () => {
  const res = await api.get("/employer-jobs");
  return res.data;
};

export const getJobMeta = async () => {
  const res = await api.get("/employer-job-meta");
  return res.data;
};
