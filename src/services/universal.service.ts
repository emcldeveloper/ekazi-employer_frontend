import api from "@/lib/axios";

export const getCompanySize = async () => {
  const res = await api.get("/universal/company-size");
  return res.data?.data;
};

export const getCountries = async () => {
  const res = await api.get("/universal/country");
  return res.data?.country;
};

export const getRegions = async () => {
  const res = await api.get("/universal/regions");
  return res.data?.region;
};

export const getIndustry = async () => {
  const res = await api.get("/universal/industry");
  return res.data?.industry;
};

export const getPosition = async (search = "") => {
  const res = await api.get("/universal/position", {
    params: {
      search,
    },
  });
  return res.data;
};

export const getPositionLevel = async () => {
  const res = await api.get("/universal/position_level");
  return res.data.position_level;
};

export const getGenders = async () => {
  const res = await api.get("/universal/gender");
  return res.data.gender;
};

export const getJobTypes = async () => {
  const res = await api.get("/universal/job-type");
  return res.data.type;
};

export const getSalaryRange = async () => {
  const res = await api.get("/applicant/salary_range");
  return res.data.salary_range;
};
