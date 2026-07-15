import api from "@/lib/axios";

export const fetchApplicant = async (applicant_id: number) => {
  const res = await api.get(`/employer/applicant/${applicant_id}`);

  return res.data?.data;
};
