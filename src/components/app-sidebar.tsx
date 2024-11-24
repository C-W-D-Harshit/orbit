"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";

const data = {
  user: {
    name: "Harshit Sharma",
    email: "hello@cleverdeveloper.in",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: Bot,
      items: [
        {
          title: "Active Tasks",
          url: "/tasks/active",
        },
        {
          title: "Completed Tasks",
          url: "/tasks/completed",
        },
        {
          title: "Archived Tasks",
          url: "/tasks/archived",
        },
      ],
    },
    {
      title: "Goals",
      url: "/goals",
      icon: BookOpen,
      items: [
        {
          title: "Current Goals",
          url: "/goals/current",
        },
        {
          title: "Goal Progress",
          url: "/goals/progress",
        },
        {
          title: "Goal History",
          url: "/goals/history",
        },
      ],
    },
    {
      title: "Pomodoro",
      url: "/pomodoro",
      icon: Settings2,
      items: [
        {
          title: "Start Focus Timer",
          url: "/pomodoro/start",
        },
        {
          title: "Session History",
          url: "/pomodoro/history",
        },
        {
          title: "Customize Settings",
          url: "/pomodoro/settings",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-secondary text-sidebar-primary-foreground">
                  <div className="relative size-8">
                    <Image src={"/logo.png"} alt="logo" fill />
                  </div>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Orbit</span>
                  <span
                    className="truncate text-xs"
                    title="Where Productivity Meets Precision"
                  >
                    Where Productivity Meets Precision
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
