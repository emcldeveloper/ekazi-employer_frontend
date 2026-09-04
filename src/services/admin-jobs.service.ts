import api from "@/lib/axios";

export const getAllJobs = async (
  search: string,
  page: number,
  limit: number,
) => {
  const res = await api.get("/admin/jobs", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res.data;
};

export const jobDetails = async (id: number) => {
  const res = await api.get(`/admin/jobs/${id}`);
  return res.data?.data;
};
