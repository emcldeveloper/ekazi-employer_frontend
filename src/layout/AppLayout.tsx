import React from "react";
import { Bell } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AppLayout() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <SidebarProvider className="font-sen">
      <AppSidebar />
      <SidebarInset>
        <header className="flex justify-between h-16 px-4 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-muted">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />

            <Separator orientation="vertical" className="mr-2" />

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link to="/">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                {pathnames.map((segment, index) => {
                  const href = "/" + pathnames.slice(0, index + 1).join("/");
                  const isLast = index === pathnames.length - 1;

                  // Make it look nice
                  const label = segment
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase());

                  return (
                    <React.Fragment key={href}>
                      <BreadcrumbSeparator />

                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>{label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink>
                            <Link to={href}>{label}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="relative">
              <Bell size={16} />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </Button>

            <ThemeToggle />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 font-sen">
          <Outlet />
        </div>

        <div className="mb-4 flex items-center justify-center w-full text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Powered by ekazi. All rights reserved.
          </p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
