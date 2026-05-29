import { useEffect } from "react";
import { useUser } from "@/hooks/auth";
import { Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("auth_token");

  const { data, isLoading, isError } = useUser();

  useEffect(() => {
    if (!token) {
      window.location.href = "https://ekazi.co.tz/login";
    }

    if (isError || (!isLoading && !data)) {
      localStorage.removeItem("auth_token");
      window.location.href = "https://ekazi.co.tz/login";
    }
  }, [token, isError, isLoading, data]);

  if (!token) {
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return null;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
