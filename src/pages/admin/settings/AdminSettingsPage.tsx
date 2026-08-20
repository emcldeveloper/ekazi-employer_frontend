import {
  Book,
  BookOpenCheck,
  BookOpenText,
  Briefcase,
  Building2,
  Globe,
  GraduationCap,
  Handshake,
  Landmark,
  Languages,
  Laptop,
  Lightbulb,
  Link,
  ListChecks,
  MapPin,
  NotebookPen,
  UserCheck,
  VenusAndMars,
  Volume1,
  Wrench,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const data = {
  nav: [
    { name: "Countries", path: "countries", icon: Globe },
    { name: "Regions", path: "regions", icon: MapPin },
    { name: "Industries", path: "industries", icon: Building2 },
    { name: "Languages", path: "languages", icon: Languages },
    { name: "Language Read", path: "language-read", icon: BookOpenText },
    { name: "Language Speak", path: "language-speak", icon: Volume1 },
    { name: "Language Write", path: "language-write", icon: NotebookPen },
    {
      name: "Language Understand",
      path: "language-understand",
      icon: BookOpenCheck,
    },
    { name: "Colleges", path: "institutions", icon: Landmark },
    { name: "Education Level", path: "education-level", icon: GraduationCap },
    { name: "Courses", path: "courses", icon: Book },
    { name: "Majors", path: "majors", icon: Link },
    { name: "Skills", path: "skills", icon: ListChecks },
    { name: "Softwares", path: "softwares", icon: Laptop },
    { name: "Tools", path: "tools", icon: Wrench },
    { name: "Cultures", path: "cultures", icon: Handshake },
    { name: "Personalities", path: "personalities", icon: UserCheck },
    { name: "Proficiencies", path: "proficiencies", icon: Lightbulb },
    { name: "Genders", path: "genders", icon: VenusAndMars },
    { name: "Positions", path: "positions", icon: Briefcase },
    { name: "Position Level", path: "position-level", icon: Briefcase },
    { name: "Job Types", path: "job-types", icon: Briefcase },
    // { name: "Experience Levels", path: "experience-levels", icon: Briefcase },
    { name: "Salary Ranges", path: "salary-ranges", icon: Briefcase },
  ],
};

const AdminSettingsPage = () => {
  const location = useLocation();

  const currentPath = location.pathname.split("/").pop();

  const currentSetting = data.nav.find((item) => item.path === currentPath);

  return (
    <div className="space-y-4">
      {/* <div className="sm:w-2/3">
        <h2 className="text-2xl font-bold">Settings</h2>
      </div> */}

      {/* settings sidebar */}
      <Card>
        <CardContent>
          <SidebarProvider className="items-start">
            <Sidebar collapsible="none" className="hidden h-screen md:flex">
              <SidebarContent className="overflow-y-auto">
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {data.nav.map((item) => {
                        const isActive = location.pathname.endsWith(
                          `/settings/${item.path}`,
                        );

                        return (
                          <SidebarMenuItem key={item.path}>
                            <SidebarMenuButton asChild isActive={isActive}>
                              <NavLink to={item.path}>
                                <item.icon />
                                <span>{item.name}</span>
                              </NavLink>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <main className="flex h-screen flex-1 flex-col overflow-hidden">
              <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                      </BreadcrumbItem>

                      {currentSetting && (
                        <>
                          <BreadcrumbSeparator className="hidden md:block" />

                          <BreadcrumbItem>
                            <BreadcrumbPage>
                              {currentSetting.name}
                            </BreadcrumbPage>
                          </BreadcrumbItem>
                        </>
                      )}
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </header>
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
                <Outlet />
              </div>
            </main>
          </SidebarProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettingsPage;
