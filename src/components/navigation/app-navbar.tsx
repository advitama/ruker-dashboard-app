"use client";

// Import next components
import Image from "next/image";

// import components
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
import { WorkspaceSwitcher } from "@/lib/features/workspace/components/workspace-switcher";

// Import hooks
import { useSession } from "@/hooks/use-session";
import { useCompany } from "@/lib/features/company/hooks/use-company";

// Import function
import { logout } from "@/utils/function/logout";

// import from react query
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import icons
import { Search } from "lucide-react";

const queryClient = new QueryClient();

export function AppNavbar() {
  const { firstName, lastName } = useSession((state) => state);
  const deleteSelectedCompany = useCompany(
    (store) => store.deleteSelectedCompany
  );

  return (
    <QueryClientProvider client={queryClient}>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <WorkspaceSwitcher />
        <div className="hidden sm:block relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Image
                src="/next.svg"
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
                deleteSelectedCompany();
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
      <Separator className="hidden sm:block mt-2" />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
