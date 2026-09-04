import api from "@/lib/axios";

export const employersList = async (
  search: string,
  page: number,
  limit: number,
  featured: string,
) => {
  const res = await api.get("/admin/employers", {
    params: {
      search,
      page,
      limit,
      featured,
    },
  });
  return res.data;
};

export const employerDetails = async (id: number) => {
  const res = await api.get(`/admin/employers/${id}`);
  return res.data?.data;
};

export const employerJobs = async (
  id: number,
  search: string,
  page: number,
  limit: number,
) => {
  const res = await api.get(`/admin/employer-jobs/${id}`, {
    params: {
      search,
      page,
      limit,
    },
  });
  return res.data;
};
