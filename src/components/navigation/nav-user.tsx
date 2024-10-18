// import icons
import { Settings, ChevronsUpDown, LogOut } from "lucide-react";

// Import components
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Import hooks
import { useSession } from "@/hooks/use-session";
import { useCompany } from "@/lib/features/company/hooks/use-company";

// import function
import { logout } from "@/utils/function/logout";

export function NavUser() {
  const { firstName, lastName, email } = useSession((state) => state);
  const deleteSelectedCompany = useCompany(
    (store) => store.deleteSelectedCompany
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full rounded-md outline-none ring-ring hover:bg-accent focus-visible:ring-2 data-[state=open]:bg-accent">
        <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm transition-all">
          <Avatar className="h-7 w-7 rounded-md border">
            <AvatarImage
              src="/next.svg"
              alt={firstName}
              className="animate-in fade-in-50 zoom-in-90"
            />
          </Avatar>
          <div className="grid flex-1 leading-none">
            <div className="font-medium">
              {firstName} {lastName}
            </div>
            <div className="overflow-hidden text-xs text-muted-foreground">
              <div className="line-clamp-1">{email}</div>
            </div>
          </div>
          <ChevronsUpDown className="ml-auto mr-0.5 h-4 w-4 text-muted-foreground/50" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="end"
        side="right"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm transition-all">
            <Avatar className="h-7 w-7 rounded-md">
              <AvatarImage src="/next.svg" alt={firstName} />
            </Avatar>
            <div className="grid flex-1">
              <div className="font-medium">
                {firstName} {lastName}
              </div>
              <div className="overflow-hidden text-xs text-muted-foreground">
                <div className="line-clamp-1">{email}</div>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-2">
            <Settings className="h-4 w-4 text-muted-foreground" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-2"
          onClick={() => {
            deleteSelectedCompany();
            logout().then(() => {
              window.location.reload();
            });
          }}
        >
          <LogOut className="h-4 w-4 text-muted-foreground" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
