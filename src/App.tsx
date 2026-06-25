import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import CategorySection from "./components/CategorySection";
import { linkGroups } from "./data/links";

export default function App() {
  const [query, setQuery] = useState("");

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
            item.name,
            item.description,
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

  const totalLinks = linkGroups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <main className="min-h-screen bg-stone-50 text-neutral-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-5 border-b border-neutral-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-teal-700">AI / Coding / Game VFX</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal text-neutral-950 sm:text-4xl">
              冯先生工作台
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
              个人启动台第一版：把每天会打开的工具入口整理成清晰、可搜索、可维护的导航。
            </p>
          </div>

          <div className="flex min-w-0 items-center gap-3 rounded-lg border border-neutral-200 bg-white px-3 py-2 shadow-sm lg:w-96">
            <Search className="h-5 w-5 shrink-0 text-neutral-500" aria-hidden="true" />
            <input
              className="h-10 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400"
              type="search"
              placeholder="搜索工具、分类或标签"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-neutral-500">分类</p>
            <p className="mt-1 text-2xl font-semibold text-neutral-950">{linkGroups.length}</p>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-neutral-500">入口</p>
            <p className="mt-1 text-2xl font-semibold text-neutral-950">{totalLinks}</p>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-neutral-500">维护方式</p>
            <p className="mt-1 text-2xl font-semibold text-neutral-950">links.ts</p>
          </div>
        </section>

        <div className="flex flex-col gap-8">
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group) => <CategorySection key={group.title} group={group} />)
          ) : (
            <div className="rounded-lg border border-dashed border-neutral-300 bg-white p-8 text-center text-sm text-neutral-500">
              没有匹配的入口。
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
