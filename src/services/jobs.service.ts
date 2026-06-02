import type {
  JobCreateForm,
  JobEducationData,
  JobLanguageData,
  JobLocationData,
  JobMainDutiesData,
  JobMetaData,
  JobOtherRequirementData,
  JobReportingData,
  JobRequirementData,
} from "@/@types/jobs";
import api from "@/lib/axios";

export const createJob = async (payload: JobCreateForm) => {
  const res = await api.post("/employer-jobs", payload);
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

//Sub forms on job creation
export const addEducation = async (payload: JobEducationData) => {
  const res = await api.post("/employer-job-education", payload);
  return res.data;
};

export const addLanguage = async (payload: JobLanguageData) => {
  const res = await api.post("/employer-job-language", payload);
  return res.data;
};

export const addRequirements = async (
  jobId: number,
  payload: JobRequirementData,
) => {
  const res = await api.post(`/employer-job-requirements/${jobId}`, payload);
  return res.data;
};

export const addOtherRequirements = async (
  payload: JobOtherRequirementData,
) => {
  const res = await api.post("/employer-job-other-requirement", payload);
  return res.data;
};

export const addMainDuties = async (payload: JobMainDutiesData) => {
  const res = await api.post("/employer-job-duty", payload);
  return res.data;
};

export const addReporting = async (payload: JobReportingData) => {
  const res = await api.post("/employer-job-structure", payload);
  return res.data;
};

export const addLocation = async (payload: JobLocationData) => {
  const res = await api.post("/employer-job-location", payload);
  return res.data;
};

export const addMetaData = async (payload: JobMetaData) => {
  const res = await api.post("/employer-job-meta", payload);
  return res.data;
};
