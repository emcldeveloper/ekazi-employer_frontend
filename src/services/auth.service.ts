import type {
  ChangePassword,
  ForgotPayload,
  LoginPayload,
  RegisterPayload,
  ResetPayload,
} from "@/@types/auth";
import api from "@/lib/axios";

export const register = async (payload: RegisterPayload) => {
  const res = await api.post("/auth/register", payload);
  return res.data;
};

export const login = async (payload: LoginPayload) => {
  const res = await api.post("/auth/login", payload);
  return res.data;
};

export const forgotPassword = async (payload: ForgotPayload) => {
  const res = await api.post("/auth/forgot-password", payload);
  return res.data;
};

export const resetPassword = async (payload: ResetPayload) => {
  const res = await api.post("/auth/reset-password", payload);
  return res.data;
};

export const changePassword = async (payload: ChangePassword) => {
  const res = await api.post("/auth/change-password", payload);
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const getUser = async () => {
  const res = await api.get("/auth/user");
  return res.data;
};
