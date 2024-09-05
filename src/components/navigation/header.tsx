// import hooks from react
import { createElement } from "react";

// import utils
import { cn } from "@/utils";

// import components from next
import Link from "next/link";
import Image from "next/image";

// import ui components from shadcn/ui
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// import components
import { ModeToggle } from "@/components/util/mode-toggle";
import { Combobox } from "@/components/form/combobox";

// import types
import type { Navigation } from "@/types/navigation";

// import logout function
import { logout } from "@/utils/function/logout";

// import icons
import { Search, PanelLeft } from "lucide-react";
import RukerSmallIcon from "@/assets/icons/ruker-small.png";

/*
 * Header component
 */
export function Header({ navigation }: { navigation: Navigation[] }) {
  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div className="hidden sm:flex">
          <Combobox />
        </div>
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
              {navigation.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn("flex items-center gap-4 px-2.5", {
                    "text-muted-foreground hover:text-foreground":
                      !item.current,
                    "text-foreground": item.current,
                  })}
                >
                  {createElement(item.icon, { className: "h-5 w-5" })}
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
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
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
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
      <div className="sm:hidden mt-2 px-2">
        <Combobox />
      </div>
    </>
  );
}
