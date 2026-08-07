import type { JobseekerPayload } from "@/@types/jobseekers";
import api from "@/lib/axios";

// find all
export const getApplicants = async (params: JobseekerPayload = {}) => {
  const res = await api.get("/employer/applicants", {
    params,
  });
  return res.data;
};

// find one
export const getApplicant = async (id: number) => {
  const res = await api.get(`/employer/applicant/${id}`);
  return res.data?.data;
};
