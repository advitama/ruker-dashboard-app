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

// import icons
import { Home } from "lucide-react";

const navigation: Navigation[] = [{ name: "Home", href: "/", icon: Home }];

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
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar navigation={navigation} />
      <div className="flex flex-col sm:py-3 sm:pl-14">
        <Header navigation={navigation} />
        <main className="py-2">{children}</main>
      </div>
      <Toaster />
    </div>
  );
}
