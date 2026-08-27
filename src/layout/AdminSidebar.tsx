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
  WalletCardsIcon,
  type LucideIcon,
  UserCheckIcon,
  SettingsIcon,
  BriefcaseBusiness,
  ListOrdered,
  Users,
  Users2,
  FolderOpen,
  GalleryVerticalEndIcon,
} from "lucide-react";
import { isRouteActive } from "@/utils/helpers";
import { NavUser } from "@/components/nav-user";

type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  items?: {
    title: string;
    url: string;
  }[];
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Employers",
    url: "/admin/employers",
    icon: Briefcase,
  },
  {
    title: "Recruiters",
    url: "/admin/recruiters",
    icon: BriefcaseBusiness,
  },
  {
    title: "Jobs",
    url: "/admin/jobs",
    icon: ListOrdered,
  },
  {
    title: "Job Seekers",
    url: "/admin/jobseekers",
    icon: Users,
  },
  {
    title: "Freelacers",
    url: "/admin/freelancers",
    icon: Users2,
  },
  {
    title: "Applicants",
    url: "/admin/applicants",
    icon: UserCheckIcon,
  },
  {
    title: "Subscriptions",
    url: "/admin/subscriptions",
    icon: WalletCardsIcon,
  },
  {
    title: "Articles",
    url: "/admin/articles",
    icon: FolderOpen,
  },
  {
    title: "Reports",
    url: "/admin/reports",
    icon: GalleryVerticalEndIcon,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: SettingsIcon,
  },
];

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

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
                <div className="flex size-20 items-center justify-center overflow-hidden rounded-lg ">
                  <img src="/images/logo.png" alt="Logo" className="w-full" />
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
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
