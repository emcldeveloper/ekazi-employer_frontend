import type { OptionType } from "./jobs";

export type Permission = {
  id: string;
  name: string;
};

export type Role = {
  id: string;
  name: string;
  permissions: Permission[];
};

export type UserPermission = Record<string, unknown>;

export type User = {
  id: number;
  username: string;
  email: string;
  hide: boolean;
  verified: number;
  created_at: string;
  client_id: number;
  role: Role;
  userPermissions: UserPermission[];
};

export type UsersResponse = {
  data: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type CreateUserFormData = {
  username: string;
  email: string;
  password: string;
  role: OptionType | null;
  permissions: string[];
};
