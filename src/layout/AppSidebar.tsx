"use client";

import * as React from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  LayoutDashboard,
  Briefcase,
  ChevronDown,
  Users,
  LayoutList,
  SquareUser,
  WalletCardsIcon,
  type LucideIcon,
  UserSearchIcon,
  UserCheckIcon,
  SettingsIcon,
} from "lucide-react";
import { isRouteActive } from "@/utils/helpers";
import { NavUser } from "@/components/nav-user";
import { useProfile } from "@/hooks/profile";
import { BASE_URL } from "@/config/config";
import { useRolePermissions } from "@/hooks/useRolePermissions";
import { PERMISSIONS } from "@/constants/role-permissions";

type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  permission?: string;
  items?: {
    title: string;
    url: string;
    permission?: string;
  }[];
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/app/dashboard",
    icon: LayoutDashboard,
    // permission: PERMISSIONS.VIEW_DAHSBOARD,
  },
  {
    title: "Profile",
    url: "/app/profile",
    icon: SquareUser,
    permission: PERMISSIONS.VIEW_PROFILE,
  },
  {
    title: "Jobs",
    url: "/app/jobs",
    icon: Briefcase,
    permission: PERMISSIONS.VIEW_JOBS,
  },
  {
    title: "Job Seekers",
    url: "/app/job-seekers",
    icon: UserSearchIcon,
    permission: PERMISSIONS.VIEW_JOBSEEKERS,
  },
  {
    title: "Applicants",
    url: "/app/applicants",
    icon: UserCheckIcon,
    permission: PERMISSIONS.VIEW_APPLICANTS,
  },
  // {
  //   title: "Clients",
  //   url: "/clients",
  //   icon: BriefcaseBusiness,
  //  permission: PERMISSIONS.VIEW_CLIENT,
  // },
  {
    title: "Tasks",
    url: "/app/tasks",
    icon: LayoutList,
    permission: PERMISSIONS.VIEW_TASKS,
  },
  {
    title: "Staff",
    url: "/app/staff",
    icon: Users,
    permission: PERMISSIONS.VIEW_STAFF,
  },
  {
    title: "Subscription",
    url: "/app/subscription",
    icon: WalletCardsIcon,
    permission: PERMISSIONS.VIEW_SUBSCRIPTION,
  },
  {
    title: "Settings",
    url: "/app/settings",
    icon: SettingsIcon,
    permission: PERMISSIONS.VIEW_SETTINGS,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  const { hasPermission } = useRolePermissions();

  // Custom Logo for each company
  const { data: companyProfile } = useProfile();
  const profile = companyProfile?.data;

  const [openMenus, setOpenMenus] = React.useState<string[]>(() => {
    // auto open parent if child route is active
    return navItems
      .filter((item) =>
        item.items?.some((subItem) => subItem.url === location.pathname),
      )
      .map((item) => item.title);
  });

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title],
    );
  };

  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard">
                <div className="flex size-12 items-center justify-center overflow-hidden rounded-lg ">
                  <img
                    src={
                      profile?.logo
                        ? `${BASE_URL}/${profile.logo}`
                        : "/images/default-img.jpeg"
                    }
                    alt={profile?.name || "Company Logo"}
                    className="w-full"
                  />
                </div>

                {hasPermission(PERMISSIONS.VIEW_TASKS) && (
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {profile?.name}
                    </span>
                  </div>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems
                .filter(
                  (item) => !item.permission || hasPermission(item.permission),
                )
                .map((item) => {
                  const Icon = item.icon;

                  const isParentActive =
                    isRouteActive(item.url) ||
                    item.items?.some((subItem) => isRouteActive(subItem.url));

                  // ITEMS WITH CHILDREN
                  if (item.items) {
                    const isOpen = openMenus.includes(item.title);

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          onClick={() => toggleMenu(item.title)}
                          isActive={isParentActive}
                          className="cursor-pointer"
                        >
                          <Icon />

                          <span className="flex-1">{item.title}</span>

                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </SidebarMenuButton>

                        {isOpen && (
                          <SidebarMenuSub>
                            {item.items.map((subItem) => {
                              const isSubActive =
                                location.pathname === subItem.url;

                              return (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={isSubActive}
                                  >
                                    <Link to={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        )}
                      </SidebarMenuItem>
                    );
                  }

                  // NORMAL NAV ITEM
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isParentActive}>
                        <Link to={item.url}>
                          <Icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
