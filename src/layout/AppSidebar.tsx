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
  Settings2Icon,
  LayoutDashboard,
  Briefcase,
  ChevronDown,
  Users,
  LayoutList,
  SquareUser,
  WalletCardsIcon,
  FolderOpenIcon,
  type LucideIcon,
} from "lucide-react";
import { isRouteActive } from "@/utils/helpers";
import { NavUser } from "@/components/nav-user";
import { useProfile } from "@/hooks/profile";

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
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: SquareUser,
  },
  {
    title: "Jobs",
    url: "/jobs",
    icon: Briefcase,
  },
  // {
  //   title: "Job Seeker",
  //   url: "/candidates",
  //   icon: UserSearchIcon,
  // },
  // {
  //   title: "Clients",
  //   url: "/clients",
  //   icon: BriefcaseBusiness,
  // },
  {
    title: "Tasks",
    url: "/tasks",
    icon: LayoutList,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
  {
    title: "Subscription",
    url: "/subscription",
    icon: WalletCardsIcon,
  },
  {
    title: "Forms",
    url: "/forms",
    icon: FolderOpenIcon,
  },

  {
    title: "Settings",
    url: "/settings",
    icon: Settings2Icon,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

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
                <div className="flex size-8 items-center justify-center overflow-hidden rounded-lg bg-sidebar-primary">
                  <img
                    src={profile?.logo || "/images/default-img.jpeg"}
                    alt={profile?.name || "Company Logo"}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{profile?.name}</span>
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
