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
  return res.data?.data;
};

export const getRegions = async (
  search: string,
  page: number,
  limit: number,
) => {
  const res = await api.get("/regions", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res.data?.data;
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
  const res = await api.get("/positions", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res.data;
};

export const positionLevels = async () => {
  const res = await api.get("/position-levels");
  return res.data?.data;
};

export const getGenders = async () => {
  const res = await api.get("/genders");
  return res.data?.data;
};

export const getJobTypes = async () => {
  const res = await api.get("/job-types");
  return res.data?.data;
};

export const getSalaryRange = async (search = "", page = 1, limit = 50) => {
  const res = await api.get("/salary-ranges", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res.data?.data;
};

// universal education apis
export const getEducationLevels = async () => {
  const res = await api.get("/education-levels");
  return res.data?.data;
};

export const getCourses = async (
  search: string,
  page: number,
  limit: number,
) => {
  const res = await api.get("/courses", {
    params: {
      search,
      page,
      limit,
    },
  });

  return res.data?.data;
};

export const getMajors = async (search = "", page = 1, limit = 50) => {
  const res = await api.get("/majors", {
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
  const res = await api.get("/languages");
  return res.data?.data;
};

export const getReadLanguage = async () => {
  const res = await api.get("/language-reads");
  return res.data?.data;
};

export const getWriteLanguage = async () => {
  const res = await api.get("/language-writes");
  return res.data?.data;
};

export const getSpeakLanguage = async () => {
  const res = await api.get("/language-speaks");
  return res.data?.data;
};

export const getUnderstandLanguage = async () => {
  const res = await api.get("/language-understands");
  return res.data?.data;
};

//
export const getCultures = async (
  search: string,
  page: number,
  limit: number,
) => {
  const res = await api.get("/cultures", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res.data?.data;
};

export const getTools = async (search: string, page: number, limit: number) => {
  const res = await api.get("/tools", {
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
  const res = await api.get("/softwares", {
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
  const res = await api.get("/knowledge", {
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
  const res = await api.get("/proficiencies", {
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
  const res = await api.get("/personalities", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res.data?.data;
};

export const metaKeywords = async (
  search: string = "",
  page: number = 1,
  limit: number = 50,
) => {
  const res = await api.get("/meta-keywords", {
    params: {
      search,
      page,
      limit,
    },
  });

  return res.data.data;
};
