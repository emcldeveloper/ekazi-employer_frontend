import type { AuthUser } from "@/@types/role-permissions";

export const getUserRolePermissions = (user?: AuthUser): string[] => {
  if (!user) {
    return [];
  }

  const permissions = new Set<string>();

  // Permissions inherited from role
  user.role_permissions?.forEach((permission) => {
    permissions.add(permission.name);
  });

  // Permissions assigned directly to user
  user.user_permissions?.forEach((userPermission) => {
    permissions.add(userPermission.permission?.name);
  });

  return Array.from(permissions);
};
