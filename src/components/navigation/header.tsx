"use client";

// Import React hooks and utilities
import { createElement } from "react";
import { cn } from "@/utils";

// Import Next.js components
import Link from "next/link";
import Image from "next/image";

// Import UI components from shadcn/ui
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Import custom components
import { ModeToggle } from "@/components/util/mode-toggle";
import { CompanyCombobox } from "@/lib/features/company/components/form/company-combobox";

// Import types and utility functions
import type { Navigation } from "@/types/navigation";
import { logout } from "@/utils/function/logout";

// Import icons
import { Search, PanelLeft } from "lucide-react";
import RukerSmallIcon from "@/assets/icons/ruker-small.png";

// Import hooks
import { useSession } from "@/hooks/use-session";

/**
 * Header component for navigation and search functionality
 */
export function Header({
  pathname,
  navigation,
}: {
  pathname: string;
  navigation: Navigation[];
}) {
  const { firstName, lastName } = useSession((state) => state);

  return (
    <>
      {/* Header section */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        {/* User combobox */}
        <div className="hidden sm:flex">
          <CompanyCombobox />
        </div>

        {/* Mobile menu button and sidebar */}
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <ModeToggle />
              {navigation.map((item, index) =>
                item.hidden ? null : (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn("flex items-center gap-4 px-2.5", {
                      "text-muted-foreground hover:text-foreground":
                        !item.current,
                      "text-foreground": item.current,
                    })}
                  >
                    {item.icon &&
                      createElement(item.icon, { className: "h-5 w-5" })}
                    {item.name}
                  </Link>
                )
              )}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Search bar */}
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>

        <div className="hidden sm:flex">
          <ModeToggle />
        </div>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Image
                src={RukerSmallIcon}
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              {firstName} {lastName}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                logout().then(() => {
                  window.location.reload();
                });
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Workspace combobox */}
      <div className="sm:hidden mt-2 px-2">
        <CompanyCombobox />
      </div>

      <Separator className="hidden sm:block mt-3" />

      {/* Breadcrumb section */}
      <div className="mt-2 sm:px-8">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {navigation.find((item) => item.href === pathname)?.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </>
  );
}
