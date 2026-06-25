import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ClockPanel from "./components/ClockPanel";
import CategorySection from "./components/CategorySection";
import Sidebar from "./components/Sidebar";
import { linkGroups } from "./data/links";

export type ThemeMode = "light" | "dark";

const getInitialTheme = (): ThemeMode => {
  if (typeof document === "undefined") {
    return "light";
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "light";
};

export default function App() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState("top");
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;

    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#0a0a0a" : "#f8fafc");

    try {
      localStorage.setItem("workbench-theme", theme);
    } catch {
      // Theme persistence is optional; the UI still switches without storage.
    }
  }, [theme]);

  const filteredGroups = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    if (!keyword) {
      return linkGroups;
    }

    return linkGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          const haystack = [
            group.title,
            group.navTitle,
            item.name,
            item.description,
            item.brand?.label,
            item.tags?.join(" "),
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          return haystack.includes(keyword);
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [query]);

  return (
    <main id="top" className="min-h-screen bg-slate-50 text-slate-950 transition-colors dark:bg-neutral-950 dark:text-slate-100">
      <Sidebar
        groups={linkGroups}
        activeId={activeId}
        theme={theme}
        onNavigate={setActiveId}
        onThemeChange={setTheme}
      />

      <div className="lg:pl-60">
        <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-10 px-4 py-7 sm:px-6 lg:px-12 lg:py-12">
          <header className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <h1 className="text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl dark:text-white">
                冯先生工作台 <span aria-hidden="true">👋</span>
              </h1>
              <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
                AI / Coding / Game VFX
              </p>
            </div>

            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-12">
              <label className="flex h-12 min-w-0 items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 shadow-sm transition focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100 dark:border-slate-800 dark:bg-neutral-900 dark:shadow-none dark:focus-within:border-teal-500 dark:focus-within:ring-teal-500/20 sm:w-96">
                <Search className="h-5 w-5 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                <span className="sr-only">搜索网站或工具</span>
                <input
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                  type="search"
                  placeholder="搜索网站或工具..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
              <ClockPanel />
            </div>
          </header>

          <div className="flex flex-col gap-10">
            {filteredGroups.length > 0 ? (
              filteredGroups.map((group) => <CategorySection key={group.id} group={group} />)
            ) : (
              <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-neutral-900 dark:text-slate-400">
                没有匹配的入口。
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
