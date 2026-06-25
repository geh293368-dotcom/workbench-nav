import {
  Home,
  Info,
  Moon,
  Settings,
  SunMedium,
  type LucideIcon,
} from "lucide-react";
import type { LinkGroup } from "../types/link";

type SidebarProps = {
  groups: LinkGroup[];
  activeId: string;
  onNavigate: (id: string) => void;
};

type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
};

export default function Sidebar({ groups, activeId, onNavigate }: SidebarProps) {
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
    <aside className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-60 lg:flex-col lg:border-b-0 lg:border-r">
      <div className="flex items-center gap-3 px-4 py-4 lg:px-5 lg:py-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white shadow-sm">
          F.
        </div>
        <div className="min-w-0 lg:hidden">
          <p className="truncate text-sm font-semibold text-slate-950">冯先生工作台</p>
          <p className="truncate text-xs text-slate-500">AI / Coding / Game VFX</p>
        </div>
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
                  ? "bg-teal-50 text-teal-700"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-950",
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
        <div className="space-y-2 border-t border-slate-100 pt-4">
          <button className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950">
            <Settings className="h-4 w-4" aria-hidden="true" />
            设置
          </button>
          <button className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950">
            <Info className="h-4 w-4" aria-hidden="true" />
            关于
          </button>
        </div>
        <div className="mt-5 flex items-center gap-3">
          <button
            className="flex h-10 flex-1 items-center justify-center rounded-full bg-slate-100 text-slate-500"
            aria-label="浅色模式"
          >
            <SunMedium className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100"
            aria-label="深色模式"
          >
            <Moon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  );
}
