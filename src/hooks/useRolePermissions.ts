import { getUserRolePermissions } from "@/lib/role-permissions";
import { useUser } from "./auth";

export const useRolePermissions = () => {
  const { data: userData, isLoading } = useUser();
  const user = userData?.data;

  // A user with a client_staff record is a staff member
  const isStaff = Boolean(user?.client_staff?.length);

  // Account owner/admin is NOT staff
  const isAdmin = !isStaff;

  const permissions = isStaff ? getUserRolePermissions(user) : [];

  const hasPermission = (permission: string) => {
    // Company admin gets full access
    if (isAdmin) {
      return true;
    }

    // Staff must have the permission
    return permissions.includes(permission);
  };

  const hasAnyPermission = (requiredPermissions: string[]) => {
    if (isAdmin) {
      return true;
    }

    return requiredPermissions.some((permission) =>
      permissions.includes(permission),
    );
  };

  const hasAllPermissions = (requiredPermissions: string[]) => {
    if (isAdmin) {
      return true;
    }

    return requiredPermissions.every((permission) =>
      permissions.includes(permission),
    );
  };

  return {
    permissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isLoading,
  };
};
