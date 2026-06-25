import {
  BookOpenCheck,
  Boxes,
  Brush,
  Clapperboard,
  Code2,
  Figma,
  Grid2X2,
  Layers3,
  Newspaper,
  NotebookTabs,
  Palette,
  Scissors,
  Send,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export const iconMap = {
  bookOpenCheck: BookOpenCheck,
  boxes: Boxes,
  brush: Brush,
  clapperboard: Clapperboard,
  code2: Code2,
  figma: Figma,
  grid2x2: Grid2X2,
  layers3: Layers3,
  newspaper: Newspaper,
  notebookTabs: NotebookTabs,
  palette: Palette,
  scissors: Scissors,
  send: Send,
  sparkles: Sparkles,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;

export function resolveIcon(iconName?: string): LucideIcon | undefined {
  if (!iconName) {
    return undefined;
  }

  return iconMap[iconName as IconName];
}
