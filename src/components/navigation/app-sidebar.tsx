"use client";

// Import next components
import Link from "next/link";
import Image from "next/image";

// Import component
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/navigation/nav-user";
import { NavMain } from "@/components/navigation/nav-main";
import { NavSecondary } from "@/components/navigation/nav-secondary";

// Import icons
import { LifeBuoy, Send, Settings2, User, Users, KeyRound } from "lucide-react";
import RukerSmallIcon from "@/assets/icons/ruker-small.png";

const navMain = [
  {
    title: "IAM",
    url: "#",
    icon: Users,
    isActive: false,
    items: [
      {
        title: "Manage user",
        url: "#",
        icon: User,
        description: "",
      },
      {
        title: "Roles",
        url: "#",
        icon: KeyRound,
        description: "",
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        description: "",
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2,
    items: [
      {
        title: "General",
        url: "#",
      },
      {
        title: "Team",
        url: "#",
      },
      {
        title: "Billing",
        url: "#",
      },
    ],
  },
];

const navSecondary = [
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
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          href="#"
          className="flex ml-2 m-1 h-7 w-7 shrink-0 items-center justify-center gap-2 rounded-full bg-primary md:h-7 md:w-7 md:text-base"
        >
          <Image
            src={RukerSmallIcon}
            alt="Ruker"
            className="transition-all group-hover:scale-110"
            width={28}
            height={28}
          />
          <span className="sr-only">Ruker</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarItem>
          <SidebarLabel>Platform</SidebarLabel>
          <NavMain items={navMain} />
        </SidebarItem>
        <SidebarItem className="mt-auto">
          <SidebarLabel>Help</SidebarLabel>
          <NavSecondary items={navSecondary} />
        </SidebarItem>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
