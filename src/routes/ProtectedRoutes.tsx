import { useEffect } from "react";
import { useUser } from "@/hooks/auth";
import { Outlet } from "react-router-dom";
import { FRONTEND_URL } from "@/config/config";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");

  const { data, isLoading } = useUser();

  useEffect(() => {
    if (!token) {
      window.location.href = FRONTEND_URL;
    }

    if (!isLoading && !data) {
      localStorage.removeItem("token");
      window.location.href = FRONTEND_URL;
    }
  }, [token, isLoading, data]);

  if (!token) {
    return null;
  }

  if (!data) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6 min-h-svh">
        Loading...
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoutes;
