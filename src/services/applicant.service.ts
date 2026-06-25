import api from "@/lib/axios";

export const fetchApplicant = async (applicant_id: number | null) => {
  const res = await api.get("/applicant/profile", {
    params: { applicant_id },
  });
  return res.data;
};
