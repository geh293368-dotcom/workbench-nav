import {
  Home,
  Info,
  Moon,
  Settings,
  SunMedium,
  type LucideIcon,
} from "lucide-react";
import type { ThemeMode } from "../App";
import type { LinkGroup } from "../types/link";

type SidebarProps = {
  groups: LinkGroup[];
  activeId: string;
  theme: ThemeMode;
  onNavigate: (id: string) => void;
  onThemeChange: (theme: ThemeMode) => void;
};

type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
};

export default function Sidebar({
  groups,
  activeId,
  theme,
  onNavigate,
  onThemeChange,
}: SidebarProps) {
  const navItems: NavItem[] = [
    { id: "top", label: "首页", href: "#top", icon: Home },
    ...groups.map((group) => ({
      id: group.id,
      label: group.navTitle,
      href: `#${group.id}`,
      icon: group.icon,
    })),
  ];

  return (
    <aside className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur transition-colors dark:border-slate-800 dark:bg-neutral-950/90 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-60 lg:flex-col lg:border-b-0 lg:border-r">
      <div className="flex items-center gap-3 px-4 py-4 lg:px-5 lg:py-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white shadow-sm dark:bg-white dark:text-slate-950">
          F.
        </div>
        <div className="min-w-0 lg:hidden">
          <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">
            冯先生工作台
          </p>
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">
            AI / Coding / Game VFX
          </p>
        </div>
        <button
          className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white lg:hidden"
          type="button"
          title={theme === "dark" ? "切换浅色模式" : "切换深色模式"}
          aria-label={theme === "dark" ? "切换浅色模式" : "切换深色模式"}
          onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <SunMedium className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Moon className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>

      <nav className="flex gap-2 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:overflow-visible lg:px-4 lg:pb-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;

          return (
            <a
              key={item.id}
              className={[
                "flex h-11 shrink-0 items-center gap-3 rounded-lg px-3 text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-teal-100",
                isActive
                  ? "bg-teal-50 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white",
              ].join(" ")}
              href={item.href}
              onClick={() => onNavigate(item.id)}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="whitespace-nowrap">{item.label}</span>
            </a>
          );
        })}
      </nav>

      <div className="hidden px-4 pb-5 lg:block">
        <div className="space-y-2 border-t border-slate-100 pt-4 dark:border-slate-800">
          <button className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white">
            <Settings className="h-4 w-4" aria-hidden="true" />
            设置
          </button>
          <button className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white">
            <Info className="h-4 w-4" aria-hidden="true" />
            关于
          </button>
        </div>
        <button
          className="relative mt-5 grid h-11 w-full grid-cols-2 rounded-full bg-slate-100 p-1 text-slate-500 transition hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-100 dark:bg-slate-900 dark:text-slate-500 dark:hover:text-slate-200 dark:focus-visible:ring-teal-500/20"
          type="button"
          aria-label={theme === "dark" ? "切换浅色模式" : "切换深色模式"}
          aria-pressed={theme === "dark"}
          title={theme === "dark" ? "切换浅色模式" : "切换深色模式"}
          onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}
        >
          <span
            className={[
              "absolute left-1 top-1 h-9 w-[calc(50%-4px)] rounded-full shadow-sm transition-transform",
              theme === "dark"
                ? "translate-x-full bg-slate-800"
                : "translate-x-0 bg-white",
            ].join(" ")}
            aria-hidden="true"
          />
          <span
            className={[
              "relative z-10 flex items-center justify-center transition",
              theme === "light" ? "text-teal-700" : "text-slate-500 dark:text-slate-500",
            ].join(" ")}
          >
            <SunMedium className="h-4 w-4" aria-hidden="true" />
          </span>
          <span
            className={[
              "relative z-10 flex items-center justify-center transition",
              theme === "dark" ? "text-teal-300" : "text-slate-500",
            ].join(" ")}
          >
            <Moon className="h-4 w-4" aria-hidden="true" />
          </span>
        </button>
      </div>
    </aside>
  );
}
