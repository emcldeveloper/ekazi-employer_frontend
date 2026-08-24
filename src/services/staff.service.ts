import type { StaffPayload } from "@/@types/staff";
import api from "@/lib/axios";

export const createStaff = async (payload: StaffPayload) => {
  const res = await api.post("/client-staffs", payload);
  return res.data;
};

export const getStaff = async (search: string, page: number, limit: number) => {
  const res = await api.get("/client-staffs", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res.data;
};

export const getStaffDetails = async (id: number) => {
  const res = await api.get(`/client-staffs/${id}`);
  return res.data;
};

export const updateStaff = async ({
  id,
  payload,
}: {
  id: number;
  payload: StaffPayload;
}) => {
  const res = await api.put(`/client-staffs/${id}`, payload);

  return res.data;
};

export const deleteStaff = async (id: number) => {
  const res = await api.delete(`/client-staffs/${id}`);
  return res.data;
};
