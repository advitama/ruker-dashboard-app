"use client";

// import hooks from next
import { usePathname } from "next/navigation";

// import ui components from shadcn/ui
import { Toaster } from "@/components/ui/toaster";

// import components from navigation
import { Header } from "@/components/navigation/header";
import { Sidebar } from "@/components/navigation/sidebar";

// import types
import type { Navigation } from "@/types/navigation";

// Import React query components
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import icons
import { Home, Users } from "lucide-react";

const navigation: Navigation[] = [
  { name: "Overview", href: "/", icon: Home },
  { name: "New workspace", href: "/new-workspace", icon: Home, hidden: true },
  { name: "User management", href: "/user-management", icon: Users },
];

const queryClient = new QueryClient();

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  navigation.map((item) => {
    item.current = item.href === pathname;
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidebar navigation={navigation} />
        <div className="flex flex-col sm:py-3 sm:pl-14">
          <Header pathname={pathname} navigation={navigation} />
          <main className="py-2 px-8">{children}</main>
        </div>
        <Toaster />
        <ReactQueryDevtools />
      </div>
    </QueryClientProvider>
  );
}
