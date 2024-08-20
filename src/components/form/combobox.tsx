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

const workspaces = [
  {
    value: "1",
    image:
      "https://www.bca.co.id/-/media/Feature/Header/Header-Logo/logo-bca-white.svg?v=1",
    label: "PT Bank Central Asia (BCA)",
  },
  {
    value: "2",
    image:
      "data:image/svg+xml,<svg%20width='137'%20height='38'%20viewBox='0%200%20137%2038'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'><g%20clip-path='url(%23clip0_118_10024)'><path%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M72.7386%2031.9427H70.5078V34.2699H73.5513L74.8841%2037.6969H78.3056L72.2835%2022.6738H70.4996V25.6665L72.7386%2031.9427ZM70.5078%2031.9427H68.2688L70.4265%2025.6745H70.4996V22.6818H68.7889L62.8359%2037.7049H66.038L67.3748%2034.2779H70.4996L70.5078%2031.9427Z'%20fill='%23005BAA'/><path%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M89.5501%2025.455C88.5675%2025.0218%2087.5025%2024.7977%2086.4253%2024.7975C85.385%2024.7975%2083.9872%2025.2319%2083.9872%2026.9095C83.9872%2029.4678%2090.7529%2028.372%2090.7529%2033.4766C90.7529%2036.7602%2088.071%2037.9995%2084.9502%2037.9995C83.3248%2037.9995%2082.569%2037.7803%2081.0046%2037.4177L81.3053%2034.7199C82.3888%2035.2638%2083.5831%2035.562%2084.7999%2035.5926C85.9905%2035.5926%2087.5508%2035.0068%2087.5508%2033.6998C87.5508%2030.7749%2080.7852%2032.0181%2080.7852%2026.9852C80.7852%2023.6299%2083.4671%2022.3906%2086.1408%2022.3906C87.4021%2022.395%2088.655%2022.5912%2089.8548%2022.9724L89.5501%2025.455Z'%20fill='%23005BAA'/><path%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M97.584%2025.0925H93.1914V22.6816H105.093V25.0925H100.709V37.7047H97.584V25.0925Z'%20fill='%23005BAA'/><path%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M113.344%2025.105C114.466%2025.2445%20115.429%2025.6829%20115.429%2026.9979C115.429%2028.4563%20114.466%2028.8947%20113.344%2029.0421V31.6682C113.795%2031.9551%20114.015%2032.3217%20114.315%2033.0549L116.176%2037.7172H119.598L117.139%2031.8794C116.847%2031.1461%20116.327%2030.3452%20115.514%2030.2854C116.384%2030.1857%20117.185%2029.7724%20117.762%2029.1258C118.339%2028.4793%20118.65%2027.6456%20118.635%2026.7867C118.635%2023.3597%20116.034%2022.8456%20113.352%2022.7021L113.344%2025.105ZM111.19%2025.105H113.344V22.7141H108.086V37.7372H111.207V31.5088H112.149C112.553%2031.4694%20112.96%2031.5198%20113.34%2031.6562V29.0302C112.946%2029.0878%20112.547%2029.1079%20112.149%2029.0899H111.186L111.19%2025.105Z'%20fill='%23005BAA'/><path%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M131.422%2031.9427H129.191V34.2699H132.32L133.584%2037.6969H137.001L130.979%2022.6738H129.191V25.6665L131.422%2031.9427ZM129.191%2031.9427H126.964L129.191%2025.6745V22.6818H127.484L121.531%2037.7049H124.75L126.082%2034.2779H129.207L129.191%2031.9427Z'%20fill='%23005BAA'/><path%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M80.9241%206.77433C77.1329%207.06523%2069.7658%208.15709%2063.7437%209.16527C57.7907%2010.1854%2054.8041%2010.9186%2052.2888%2011.5004C45.6694%2013.0346%2035.6285%2015.8838%2030.2729%2017.4778C25.5999%2019.0359%2013.1616%2024.0648%2012.7918%2023.9971C12.6415%2023.9971%2012.1904%2023.5587%2012.8609%2023.1204C11.6012%2023.9971%2031.0124%207.14492%2062.8416%202.91695V0H0V33.4732C19.334%2025.8182%2040.6104%2022.8255%2062.8457%2022.8255V14.7441L63.3699%2014.5967C76.0885%209.93037%2090.8918%208.02957%20114.911%205.55097V4.75399C112.904%204.75399%2098.0272%204.96917%2081.2207%206.79425L80.9241%206.77433Z'%20fill='%23005BAA'/><path%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M114.912%204.29948C103.641%203.56019%2092.3313%203.60946%2081.0676%204.44692C75.1959%204.88526%2068.9463%205.76194%2063.1477%206.71034C50.7947%208.82234%2040.5385%2011.3767%2040.5385%2011.3767C40.5385%2011.3767%2039.7908%2011.3767%2040.4613%2010.9423C41.5788%2010.2848%2050.6484%206.272%2063.1477%203.86512C65.8269%203.35506%2068.6523%202.91672%2071.6241%202.55011C72.0711%202.55011%2071.6241%202.04004%2071.6241%202.04004C68.7268%202.25921%2065.8255%202.40665%2063.0908%202.76928C51.3864%204.41589%2040.0139%207.83588%2029.3802%2012.9069C28.9332%2013.13%2030.5668%2012.1776%2021.046%2017.358C21.046%2017.358%2015.0971%2021.2233%2014.6542%2021.6617C14.0569%2022.2475%2019.5588%2019.8366%2023.4272%2018.4499C26.999%2017.2145%2036.6701%2014.5128%2038.9009%2013.8553C40.4613%2013.4209%2045.9633%2012.2613%2051.6887%2011.1575C57.0484%2010.0616%2062.1765%209.4121%2062.4772%209.34037H62.847C62.847%209.34037%2068.7268%208.45971%2069.9093%208.24054C71.7013%207.87393%2081.4455%206.71034%2081.5187%206.71034C98.3292%204.88526%20115.209%204.7418%20114.912%204.7418V4.29948Z'%20fill='%2395B6DF'/></g><defs><clipPath%20id='clip0_118_10024'><rect%20width='137'%20height='38'%20fill='white'/></clipPath></defs></svg>",
    label: "PT Astra International",
  },
  {
    value: "3",
    image:
      "https://www.gudanggaramtbk.com/static/ggtbk/images/gg_logo_color.png",
    label: "PT Gudang Garam",
  },
  {
    value: "4",
    image: "https://www.indofood.com/images/header/logo-indofood-en.png",
    label: "PT Indofood Sukses Makmur",
  },
  {
    value: "5",
    image: "https://www.unilever.co.id/core-assets/logos/logo-static-dark.svg",
    label: "PT Unilever Indonesia",
  },
];

export function Combobox() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

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
            ? workspaces.find((workspace) => workspace.value === value)?.label
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
              {workspaces.map((workspace) => (
                <CommandItem
                  key={workspace.value}
                  value={workspace.value}
                  onSelect={(currentValue: React.SetStateAction<string>) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={workspace.image}
                    alt={workspace.label}
                    className="w-6 h-6 rounded-md mr-2"
                  />
                  {workspace.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === workspace.value ? "opacity-100" : "opacity-0"
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
