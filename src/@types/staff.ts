export type ClientStaffResponse = {
  success: boolean;
  message: string;
  data: ClientStaff[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ClientStaff = {
  id: number;
  prefix_id: number;
  client_id: number;
  user_id: number;
  client_staff_position_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
  created_at: string;
  user: ClientStaffUser;
  position: ClientStaffPosition;
};

export type ClientStaffUser = {
  id: number;
  username: string;
  client_id: number | null;
  role: ClientStaffRole | null;
  userPermissions: UserPermission[];
};

export type ClientStaffRole = {
  id: string;
  name: string;
  permissions: Permission[];
};

export type Permission = {
  id: string;
  name: string;
  type: "allow" | "deny";
};

export type UserPermission = {
  id?: string;
  name?: string;
  type: "allow" | "deny";
};

export type ClientStaffPosition = {
  id?: number;
  name?: string;
};

//
export type StaffPayload = {
  client_staff_position_id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  phone_number: string;
  username: string;
  email: string;
  password: string;
  user_permissions: UserPermissionPayload[];
};

export type UserPermissionPayload = {
  permission_id: number;
  type: "allow" | "deny";
};
