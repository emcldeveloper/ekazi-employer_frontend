import type {
  JobCreateForm,
  JobEducationData,
  JobFilters,
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

export const updateJob = async ({
  id,
  payload,
}: {
  id: number;
  payload: JobCreateForm;
}) => {
  const res = await api.put(`/employer-jobs/${id}`, payload);
  return res.data;
};

// Data
export const getJobs = async (params: JobFilters = {}) => {
  const res = await api.get("/employer-jobs", {
    params,
  });

  return res.data;
};

export const getJob = async (id: any) => {
  const res = await api.get(`/employer-jobs/show/${id}`);
  return res.data;
};

export const getApplications = async (id: any) => {
  const res = await api.get(`/employer-jobs/applicant/${id}`);
  return res.data;
};

export const getApplicationsByStage = async (
  jobId: number,
  stageId: number,
) => {
  const res = await api.get(`/jobs-stages/${stageId}/${jobId}`);
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

export const publishJob = async (jobId: number) => {
  const res = await api.post(`/job-publish/${jobId}`);
  return res.data;
};

export const deleteJob = async (jobId: number) => {
  const res = await api.delete(`/job-delete/${jobId}`);
  return res.data;
};
