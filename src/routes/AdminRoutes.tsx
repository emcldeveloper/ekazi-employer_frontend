import { useUser } from "@/hooks/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
// import however you get the authenticated user

const AdminRoutes = () => {
  const { data: userData, isLoading } = useUser();

  const user = userData?.data;

  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-svh">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AdminRoutes;
