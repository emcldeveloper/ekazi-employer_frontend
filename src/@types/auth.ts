export type LoginPayload = {
  username: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  phone: string;
  password: string;
  type: number;
};

export type RegisterForm = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  type: number;
  account_type: string;
};

export type VerifyPayload = {
  token: string;
};

export type ResendPayload = {
  email: string;
};

export type ForgotPayload = {
  email: string;
};

export type ResetPayload = {
  token: string;
  email: string;
  newPassword: string;
};

export type ResetForm = {
  password: string;
  password_confirmation: string;
};

export type ChangePassword = {
  currentPassword: string;
  newPassword: string;
};

export type ChangePasswordForm = {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};
