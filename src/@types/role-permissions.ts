export interface Permission {
  id: string;
  name: string;
}

export interface UserPermission {
  id: number;
  permission_id: number;
  permission: Permission;
}

export interface Role {
  id: string;
  name: string;
}

export interface ClientStaffPosition {
  id: number;
  position_name: string;
}

export interface ClientStaff {
  id: number;
  client_id: number;
  user_id: number;
  prefix_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
  client_staff_position_id: number;
  position: ClientStaffPosition;
  created_at: string;
  updated_at: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  verified: boolean;
  role_id: number;

  role: Role;
  role_permissions: Permission[];
  user_permissions: UserPermission[];
  client_staff: ClientStaff[];
}

export interface AuthUserResponse {
  success: boolean;
  message: string;
  data: AuthUser;
}
