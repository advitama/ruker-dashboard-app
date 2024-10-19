"use client";

// Import next component
import Link from "next/link";

// import components
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

// import type
import { type LucideIcon } from "lucide-react";

// Import function
import { cn } from "@/utils";

export function NavSecondary({
  className,
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
} & React.ComponentProps<"ul">) {
  if (!items?.length) {
    return null;
  }

  return (
    <SidebarGroup className="mt-auto">
      <SidebarGroupLabel>Help</SidebarGroupLabel>
      <SidebarGroupContent>
        <ul className={cn("grid gap-0.5", className)}>
          {items.map((item) => (
            <SidebarMenuButton key={item.title}>
              <li>
                <Link
                  href={item.url}
                  className="flex h-7 items-center gap-2.5 px-1.5 overflow-hidden  rounded-md  text-xs ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2"
                >
                  <item.icon className="h-4 w-4 shrink-0 translate-x-0.5 text-muted-foreground" />
                  <div className="line-clamp-1 grow overflow-hidden pr-6 font-medium text-muted-foreground">
                    {item.title}
                  </div>
                </Link>
              </li>
            </SidebarMenuButton>
          ))}
        </ul>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
