"use client";

// Import react hooks
import { useState, useEffect } from "react";

// Import components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

// Import react query hook
import { useQuery } from "@tanstack/react-query";

// import hooks
import { useCompany } from "@/lib/features/company/hooks/use-company";

// Import API
import DASHBOARD_API from "@/lib/api/dashboard";

// Import icons
import { Atom, ChevronsUpDown, Plus, Check } from "lucide-react";

// Import type
import { Company } from "@/lib/features/company/types/company";

export function WorkspaceSwitcher() {
  const { isMobile } = useSidebar();
  const [value, setValue] = useState<number | null>();

  const setCompany = useCompany((store) => store.setCompany);
  const deleteSelectedCompany = useCompany(
    (store) => store.deleteSelectedCompany
  );

  const { id } = useCompany((state) => state);

  const { data, isFetched } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const response = await DASHBOARD_API.get("/company");
      return response.data;
    },
  });

  useEffect(() => {
    if (isFetched && data) {
      const companyExists = data.some((company: Company) => company.id === id);

      if (!companyExists) {
        deleteSelectedCompany();
      } else if (id) {
        setValue(id);
      }
    }
  }, [id, data, isFetched, deleteSelectedCompany]);

  const handleSelect = (currentValue: number) => {
    const selectedCompany = data?.find(
      (company: Company) => company.id === currentValue
    );

    if (selectedCompany) {
      setCompany(selectedCompany);
      setValue(currentValue === value ? null : currentValue);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {value ? (
                <>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Atom className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {
                        data?.find((company: Company) => company.id === value)
                          .name
                      }
                    </span>
                    <span className="truncate text-xs">Free</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Atom className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      Select workspace
                    </span>
                  </div>
                </>
              )}

              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Companies
            </DropdownMenuLabel>
            {data?.map((company: Company) => (
              <DropdownMenuItem
                key={company.name}
                onClick={() => handleSelect(company.id)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <Atom className="size-4 shrink-0" />
                </div>
                {company.name}
                {id === company.id && <Check className="w-4 h-4" />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Add workspace
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
