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

export const getPositions = async (search = "", page = 1, limit = 50) => {
  const res = await api.get("/universal/position", {
    params: {
      search,
      page,
      limit,
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

// universal education apis
export const getEducationLevels = async () => {
  const res = await api.get("/universal/education_level");
  return res.data.education_category;
};

export const getCourses = async (search = "", page = 1, limit = 50) => {
  const res = await api.get("/universal/course", {
    params: {
      search,
      page,
      limit,
    },
  });

  return res.data;
};

export const getMajors = async (search = "", page = 1, limit = 50) => {
  const res = await api.get("/universal/major", {
    params: {
      search,
      page,
      limit,
    },
  });

  return res.data;
};

// universal language apis
export const getLanguage = async () => {
  const res = await api.get("/applicant/language");
  return res.data.language;
};

export const getReadLanguage = async () => {
  const res = await api.get("/applicant/language_read");
  return res.data.language_read;
};

export const getWriteLanguage = async () => {
  const res = await api.get("/applicant/language_write");
  return res.data.language_write;
};

export const getSpeakLanguage = async () => {
  const res = await api.get("/applicant/language_speak");
  return res.data.language_speak;
};

export const getUnderstandLanguage = async () => {
  const res = await api.get("/applicant/language_understand");
  return res.data.understand_ability;
};

//
export const getCultures = async () => {
  const res = await api.get("/applicant/culture");
  return res.data.culture;
};

export const getTools = async () => {
  const res = await api.get("/applicant/tool");
  return res.data.tool;
};

export const getSoftwares = async () => {
  const res = await api.get("/applicant/software");
  return res.data.software;
};

export const getKnowledges = async () => {
  const res = await api.get("/applicant/knowlege");
  return res.data.knowledge;
};

export const getProficiencies = async () => {
  const res = await api.get("/universal/getproficiency");
  return res.data.proficiency;
};

export const getPersonalities = async () => {
  const res = await api.get("/applicant/personality");
  return res.data.personality;
};
