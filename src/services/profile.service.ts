import api from "@/lib/axios";
import type { UpdateProfileData } from "@/@types/profile";

export const getProfile = async () => {
  const res = await api.get("/employer/company-profile");
  return res.data;
};

export const createProfile = async (data: FormData) => {
  const res = await api.post("/employer/company-profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateProfile = async (data: UpdateProfileData) => {
  const res = await api.put("/employer/company-profile", data);
  return res.data;
};
