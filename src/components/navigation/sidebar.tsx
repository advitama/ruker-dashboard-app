import { createElement } from "react";

import { cn } from "@/utils";

import Link from "next/link";
import Image from "next/image";

import { Settings } from "lucide-react";
import RukerSmallIcon from "@/assets/icons/ruker-small.png";

import type { Navigation } from "@/types/navigation";

export function Sidebar({ navigation }: { navigation: Navigation[] }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 group transition ease-in-out hover:w-56 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center group-hover:items-start group-hover:ml-1 gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className="flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Image
            src={RukerSmallIcon}
            alt="Ruker"
            className="transition-all group-hover:scale-110"
            width={32}
            height={32}
          />
          <span className="sr-only">Ruker</span>
        </Link>
        {navigation.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-full  group-hover:justify-start group-hover:pl-2.5 group-hover:-ml-1",
              {
                "bg-accent text-accent-foreground": item.current,
                "text-muted-foreground": !item.current,
              }
            )}
          >
            {createElement(item.icon, { className: "h-5 w-5" })}
            <span className="sr-only">{item.name}</span>{" "}
            <div className="hidden ml-3 transition duration-300 text-sm group-hover:flex">
              {item.name}
            </div>
          </Link>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-full group-hover:justify-start group-hover:pl-2.5 group-hover:-ml-1"
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
          <span className="hidden ml-3 transition duration-300 text-sm group-hover:flex">
            Settings
          </span>
        </Link>
      </nav>
    </aside>
  );
}
