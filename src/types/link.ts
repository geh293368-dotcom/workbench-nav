import type { LucideIcon } from "lucide-react";

export type BrandMark = {
  label: string;
  imageUrl?: string;
  background: string;
  foreground: string;
};

export type LinkItem = {
  name: string;
  url?: string;
  description?: string;
  icon?: LucideIcon;
  brand?: BrandMark;
  kind?: "link" | "more";
  tags?: string[];
};

export type LinkGroup = {
  id: string;
  title: string;
  navTitle: string;
  description: string;
  icon: LucideIcon;
  items: LinkItem[];
};
