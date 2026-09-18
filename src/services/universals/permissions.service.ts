import type { PermissionPayload } from "@/@types/universals/permissions";
import api from "@/lib/axios";

export const getPermissions = async (
  search: string,
  page: number,
  limit: number,
) => {
  const res = await api.get("/permissions", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res.data;
};

export const getPermission = async (id: number) => {
  const res = await api.get(`/permissions/${id}`);
  return res.data;
};

export const createPermission = async (payload: PermissionPayload) => {
  const res = await api.post("/permissions", payload);
  return res.data;
};

export const updatePermission = async ({
  id,
  payload,
}: {
  id: number;
  payload: PermissionPayload;
}) => {
  const res = await api.put(`/permissions/${id}`, payload);
  return res.data;
};

export const deletePermission = async (id: number) => {
  const res = await api.delete(`/permissions/${id}`);
  return res.data;
};
