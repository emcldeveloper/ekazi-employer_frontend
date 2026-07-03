import api from "@/lib/axios";

export const companySizes = async () => {
  const res = await api.get("/company-sizes");
  return res.data?.data;
};

export const companyTypes = async () => {
  const res = await api.get("/company-type");
  return res.data?.data;
};

export const getCountries = async () => {
  const res = await api.get("/countries");
  return res.data?.country;
};

export const getRegions = async () => {
  const res = await api.get("/regions");
  return res.data?.region;
};

export const getIndustry = async (search = "", page = 1, limit = 50) => {
  const res = await api.get("/industries", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res.data?.data;
};

export const getPositions = async (search = "", page = 1, limit = 100) => {
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

export const getCourses = async (
  search: string,
  page: number,
  limit: number,
) => {
  const res = await api.get("/universal/course", {
    params: {
      search,
      page,
      limit,
    },
  });

  return res.data?.data;
};

export const getMajors = async (search = "", page = 1, limit = 50) => {
  const res = await api.get("/universal/major", {
    params: {
      search,
      page,
      limit,
    },
  });

  return res.data?.data;
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
export const getCultures = async (
  search: string,
  page: number,
  limit: number,
) => {
  const res = await api.get("/applicant/culture", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res.data?.data;
};

export const getTools = async (search: string, page: number, limit: number) => {
  const res = await api.get("/applicant/tool", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res.data?.data;
};

export const getSoftwares = async (
  search: string,
  page: number,
  limit: number,
) => {
  const res = await api.get("/applicant/software", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res.data?.data;
};

export const getKnowledges = async (
  search: string,
  page: number,
  limit: number,
) => {
  const res = await api.get("/applicant/knowledge", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res.data?.data;
};

export const getProficiencies = async (
  search: string,
  page: number,
  limit: number,
) => {
  const res = await api.get("/universal/getproficiency", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res.data?.data;
};

export const getPersonalities = async (
  search: string,
  page: number,
  limit: number,
) => {
  const res = await api.get("/applicant/personality", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res.data?.data;
};
