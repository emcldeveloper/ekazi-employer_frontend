import { useEffect } from "react";
import { useUser } from "@/hooks/auth";
import { Outlet } from "react-router-dom";
import { FRONTEND_URL } from "@/config/config";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  const verified = localStorage.getItem("verified") === "1";

  const { data, isLoading } = useUser();

  useEffect(() => {
    if (!token) {
      window.location.href = FRONTEND_URL;
      return;
    }

    if (!verified) {
      window.location.href = `${FRONTEND_URL}/verify-account`;
      return;
    }

    if (isLoading) {
      return;
    }

    if (!isLoading && !data) {
      localStorage.removeItem("token");
      window.location.href = FRONTEND_URL;
    }
  }, [token, verified, isLoading, data]);

  if (!token || !data) {
    return null;
  }

  if (!verified) {
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
