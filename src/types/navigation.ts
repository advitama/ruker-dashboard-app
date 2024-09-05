import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent } from "react";

export type Navigation = {
  name: string;
  href: string;
  current?: boolean;
  hidden?: boolean;
  icon?: ForwardRefExoticComponent<LucideProps>;
};
