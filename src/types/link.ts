import type { LucideIcon } from "lucide-react";

export type LinkItem = {
  name: string;
  url: string;
  description: string;
  icon: LucideIcon;
  tags?: string[];
};

export type LinkGroup = {
  title: string;
  description: string;
  items: LinkItem[];
};
