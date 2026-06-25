import linksConfig from "./links.json";
import { resolveIcon } from "./iconMap";
import type { LinkGroup } from "../types/link";

type RawBrand = {
  label: string;
  icon?: string;
  background: string;
  foreground: string;
};

type RawLinkItem = {
  name: string;
  url?: string;
  description?: string;
  icon?: string;
  brand?: RawBrand;
  kind?: "link" | "more";
  tags?: string[];
};

type RawLinkGroup = {
  id: string;
  title: string;
  navTitle: string;
  description: string;
  icon: string;
  items: RawLinkItem[];
};

type LinksConfig = {
  groups: RawLinkGroup[];
};

const iconPath = (iconFile?: string) => {
  if (!iconFile) {
    return undefined;
  }

  return `${import.meta.env.BASE_URL}icons/${iconFile}`;
};

function toLinkGroup(group: RawLinkGroup): LinkGroup {
  return {
    id: group.id,
    title: group.title,
    navTitle: group.navTitle,
    description: group.description,
    icon: resolveIcon(group.icon) ?? resolveIcon("grid2x2")!,
    items: group.items.map((item) => ({
      name: item.name,
      url: item.url,
      description: item.description,
      icon: resolveIcon(item.icon),
      kind: item.kind,
      tags: item.tags,
      brand: item.brand
        ? {
            label: item.brand.label,
            imageUrl: iconPath(item.brand.icon),
            background: item.brand.background,
            foreground: item.brand.foreground,
          }
        : undefined,
    })),
  };
}

export const linkGroups: LinkGroup[] = (linksConfig as LinksConfig).groups.map(toLinkGroup);
