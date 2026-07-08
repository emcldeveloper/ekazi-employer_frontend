import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link to="/">
            <div className="w-20">
              <img src="/images/logo.png" alt="logo" />
            </div>
          </Link>

          <div>
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeftIcon /> Back
            </Button>
          </div>
        </div>
      </header>

      <div className="relative top-30 flex flex-col justify-center w-full h-fit lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
      </div>
    </div>
  );
}
