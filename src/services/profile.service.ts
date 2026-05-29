import api from "@/lib/axios";
import type {  UpdateProfileData } from "@/@types/profile";

export const getProfile = async () => {
  const res = await api.get("/company-profile");
  return res.data;
};

export const createProfile = async (data: FormData) => {
  const res = await api.post("/company-profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateProfile = async (data: UpdateProfileData) => {
  const res = await api.put("/company-profile", data);
  return res.data;
};
