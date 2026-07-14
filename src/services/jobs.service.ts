import type {
  JobCreateForm,
  JobEducationForm,
  JobLanguageForm,
  JobMainDutiesForm,
  JobMetaForm,
  JobOtherRequirementForm,
  JobRequirementPayload,
} from "@/@types/job-forms";
import type {
  JobFilters,
  JobLocationData,
  JobReportingData,
} from "@/@types/jobs";
import api from "@/lib/axios";

export const createJob = async (payload: JobCreateForm) => {
  const res = await api.post("/employer/jobs", payload);
  return res.data;
};

export const updateJob = async ({
  id,
  payload,
}: {
  id: number;
  payload: JobCreateForm;
}) => {
  const res = await api.put(`/employer/jobs/${id}`, payload);
  return res.data;
};

// Data
export const getJobs = async (params: JobFilters = {}) => {
  const res = await api.get("/employer/jobs", {
    params,
  });

  return res.data;
};

export const getJob = async (id: number) => {
  const res = await api.get(`/employer/jobs/${id}`);
  return res.data?.data;
};

/**
 * Job Applications APIs
 * */
export const getApplications = async (id: any) => {
  const res = await api.get(`/employer/applicant/${id}`);
  return res.data;
};

export const getApplicationsByStage = async (
  jobId: number,
  stageId: number,
) => {
  const res = await api.get(`/jobs-stages/${stageId}/${jobId}`);
  return res.data;
};

/**
 * Job MetaData APIs
 * */
export const getJobMeta = async () => {
  const res = await api.get("/employer-job-meta");
  return res.data;
};

/**
 * Job Education APIs
 * */
export const jobEducation = async (payload: JobEducationForm) => {
  const res = await api.post("/employer/job-educations", payload);
  return res.data;
};

export const editJobEducation = async ({
  id,
  payload,
}: {
  id: number;
  payload: JobEducationForm;
}) => {
  const res = await api.put(`/employer/job-educations/${id}`, payload);
  return res.data;
};

export const deleteJobEducation = async ({
  id,
}: {
  id: number;
  job_id: number;
}) => {
  const res = await api.delete(`/employer/job-educations/${id}`);
  return res.data;
};

/**
 * Job Language APIs
 * */
export const jobLanguage = async (payload: JobLanguageForm) => {
  const res = await api.post("/employer/job-languages", payload);
  return res.data;
};

export const editJobLanguage = async ({
  id,
  payload,
}: {
  id: number;
  payload: JobLanguageForm;
}) => {
  const res = await api.put(`/employer/job-languages/${id}`, payload);
  return res.data;
};

export const deleteJobLanguage = async ({
  id,
}: {
  id: number;
  job_id: number;
}) => {
  const res = await api.delete(`/employer/job-languages/${id}`);

  return res.data;
};

/**
 * Job Candidate Specifications APIs
 * */
export const addRequirements = async ({
  job_id,
  payload,
}: {
  job_id: number;
  payload: JobRequirementPayload;
}) => {
  const res = await api.put(`/employer/complete-profile/${job_id}`, payload);
  return res.data;
};

/** 
Other Requirements APIs
*/
export const addOtherRequirements = async (
  payload: JobOtherRequirementForm,
) => {
  const res = await api.post("/employer/job-other-requirements", payload);
  return res.data;
};

export const editOtherRequirements = async ({
  id,
  payload,
}: {
  id: number;
  payload: JobOtherRequirementForm;
}) => {
  const res = await api.put(`/employer/job-other-requirements/${id}`, payload);
  return res.data;
};

/** 
Main Duties APIs
*/
export const addMainDuties = async (payload: JobMainDutiesForm) => {
  const res = await api.post("/employer/job-requirements", payload);
  return res.data;
};

export const editMainDuties = async ({
  id,
  payload,
}: {
  id: number;
  payload: JobMainDutiesForm;
}) => {
  const res = await api.put(`/employer/job-requirements/${id}`, payload);
  return res.data;
};

/** 
Job Reporting APIs
*/
export const addReporting = async (payload: JobReportingData) => {
  const res = await api.post("/employer/job-report-tos", payload);
  return res.data;
};

export const addLocation = async (payload: JobLocationData) => {
  const res = await api.post("/employer-job-location", payload);
  return res.data;
};

export const addMetaData = async (payload: JobMetaForm) => {
  const res = await api.post("/employer/job-metas", payload);
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
