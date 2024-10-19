"use client";

// import next component
// import Image from "next/image";

// import components
import {
  Sidebar,
  useSidebar,
  SidebarRail,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/navigation/nav-main";
import { NavUser } from "@/components/navigation/nav-user";
import { NavSecondary } from "@/components/navigation/nav-secondary";
import { WorkspaceSwitcher } from "@/lib/features/workspace/components/workspace-switcher";

// import from react query
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// icons
// import RukerIcon from "@/assets/icons/ruker-small.png";
import { KeyRound, LifeBuoy, Send, Settings2, User, Users } from "lucide-react";

const queryClient = new QueryClient();

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();

  return (
    <QueryClientProvider client={queryClient}>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          {/* {state === "expanded" ? ( */}
          <WorkspaceSwitcher />
          {/* ) : (
            <div className="mt-1">
              <Image src={RukerIcon} width={64} alt="" />
            </div>
          )} */}
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={navMain} />
          {state === "expanded" && <NavSecondary items={navSecondary} />}
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
