import AppCard from "./AppCard";
import type { LinkGroup } from "../types/link";

type CategorySectionProps = {
  group: LinkGroup;
};

export default function CategorySection({ group }: CategorySectionProps) {
  const Icon = group.icon;

  return (
    <section id={group.id} className="scroll-mt-28" aria-labelledby={`${group.id}-heading`}>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h2 id={`${group.id}-heading`} className="text-lg font-semibold text-slate-950 dark:text-slate-100">
              {group.title}
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{group.description}</p>
          </div>
        </div>
        <span className="hidden shrink-0 text-sm text-slate-400 dark:text-slate-500 sm:inline">
          {group.items.length} 个入口
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {group.items.map((item) => (
          <AppCard key={`${group.id}-${item.name}`} item={item} />
        ))}
      </div>
    </section>
  );
}
