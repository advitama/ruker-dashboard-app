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

// Import react query hook
import { useQuery } from "@tanstack/react-query";

// import hooks
import { useCompany } from "@/lib/features/company/hooks/use-company";

// Import API
import DASHBOARD_API from "@/lib/api/dashboard";

// Import icons
import { Atom, ChevronsUpDown, Plus } from "lucide-react";

// Import type
import { Company } from "@/lib/features/company/types/company";

export function WorkspaceSwitcher() {
  const [value, setValue] = useState("");

  const setCompany = useCompany((store) => store.setCompany);
  const deleteSelectedCompany = useCompany(
    (store) => store.deleteSelectedCompany
  );

  const { name } = useCompany((state) => state);

  const { data, isFetched } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const response = await DASHBOARD_API.get("/company");
      return response.data;
    },
  });

  useEffect(() => {
    if (isFetched && data) {
      const companyExists = data.some(
        (company: Company) => company.name === name
      );

      if (!companyExists) {
        deleteSelectedCompany();
      } else if (name) {
        setValue(name);
      }
    }
  }, [name, data, isFetched, deleteSelectedCompany]);

  const handleSelect = (currentValue: string) => {
    const selectedCompany = data?.find(
      (company: Company) => company.name === currentValue
    );

    if (selectedCompany) {
      setCompany(selectedCompany);
      setValue(currentValue === value ? "" : currentValue);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-72 rounded-md border ring-ring hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 data-[state=open]:bg-accent">
        <div className="flex items-center gap-1.5 overflow-hidden px-2 py-1.5 text-left text-sm transition-all">
          {value ? (
            <>
              <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-primary text-primary-foreground">
                <Atom className="h-3.5 w-3.5 shrink-0" />
              </div>
              <div className="line-clamp-1 flex-1 pr-2 font-medium">
                {value}
              </div>
            </>
          ) : (
            <div className="line-clamp-1 flex-1 pr-2 font-medium">
              Select workspace
            </div>
          )}
          <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground/50" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Companies
        </DropdownMenuLabel>
        {data?.map((company: Company) => (
          <DropdownMenuItem
            key={company.name}
            onClick={() => handleSelect(company.name)}
            className="items-start gap-2 px-1.5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <Atom className="h-5 w-5 shrink-0" />
            </div>
            <div className="grid flex-1 leading-tight">
              <div className="line-clamp-1 font-medium">{company.name}</div>
              <div className="overflow-hidden text-xs text-muted-foreground">
                <div className="line-clamp-1">Free</div>
              </div>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 px-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border bg-background">
            <Plus className="h-5 w-5" />
          </div>
          <div className="font-medium text-muted-foreground">Add workspace</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
