"use client";

// import hooks from react
import { useState } from "react";

// import utils
import { cn } from "@/utils";

// import ui components from shadcn/ui
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// import icons
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

// Import React query hooks
import { useQuery } from "@tanstack/react-query";

// Import Dashboard API
import DASHBOARD_API from "@/lib/api/dashboard";

// Import types
import type { Company } from "@/lib/features/company/types/company";

// Import the custom hook
import { useCompany } from "@/lib/features/company/hooks/use-company";

export function CompanyCombobox() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const setCompany = useCompany((store) => store.setCompany);
  const { name } = useCompany((state) => state);

  const { data, isFetched } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const response = await DASHBOARD_API.get("/company");
      return response.data;
    },
  });

  const handleSelect = (currentValue: string) => {
    const selectedCompany = data?.find(
      (company: Company) => company.name === currentValue
    );

    if (selectedCompany) {
      setCompany(selectedCompany);

      setValue(currentValue === value ? "" : currentValue);
      setOpen(false);
    }
  };

  console.log(name);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full sm:w-[250px] justify-between"
        >
          {value
            ? data?.find((company: Company) => company.name === value)?.name
            : "Select workspace..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full sm:w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search workspace..." className="h-9" />
          <CommandList>
            <CommandEmpty>No workspace found.</CommandEmpty>
            <CommandGroup>
              {data?.map((company: Company) => (
                <CommandItem
                  key={company.id}
                  value={company.name}
                  onSelect={handleSelect}
                >
                  {company.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === company.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
