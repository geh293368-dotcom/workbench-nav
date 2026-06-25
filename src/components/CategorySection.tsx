import AppCard from "./AppCard";
import type { LinkGroup } from "../types/link";

type CategorySectionProps = {
  group: LinkGroup;
};

export default function CategorySection({ group }: CategorySectionProps) {
  return (
    <section aria-labelledby={`${group.title}-heading`}>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <div>
          <h2 id={`${group.title}-heading`} className="text-xl font-semibold text-neutral-950">
            {group.title}
          </h2>
          <p className="mt-1 text-sm text-neutral-500">{group.description}</p>
        </div>
        <span className="shrink-0 text-sm text-neutral-500">{group.items.length} 个入口</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {group.items.map((item) => (
          <AppCard key={item.url} item={item} />
        ))}
      </div>
    </section>
  );
}
