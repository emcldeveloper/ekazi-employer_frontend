import api from "@/lib/axios";

export const getRecruiters = async (
  search: string,
  page: number,
  limit: number,
  featured: string,
) => {
  const res = await api.get("/admin/recruiters", {
    params: {
      search,
      page,
      limit,
      featured,
    },
  });
  return res.data;
};

export const getRecruiter = async (id: number) => {
  const res = await api.get(`/admin/recruiters/${id}`);
  return res.data?.data;
};
