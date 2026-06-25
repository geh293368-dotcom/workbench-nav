import { ArrowUpRight } from "lucide-react";
import type { LinkItem } from "../types/link";

type AppCardProps = {
  item: LinkItem;
};

export default function AppCard({ item }: AppCardProps) {
  const Icon = item.icon;

  return (
    <a
      className="group flex min-h-28 flex-col justify-between rounded-lg border border-neutral-200 bg-white p-4 shadow-sm outline-none transition hover:-translate-y-0.5 hover:border-teal-600 hover:shadow-md focus-visible:border-teal-600 focus-visible:ring-2 focus-visible:ring-teal-200"
      href={item.url}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-800 group-hover:bg-teal-50 group-hover:text-teal-700">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-neutral-400 transition group-hover:text-teal-700" />
      </div>
      <div className="mt-4">
        <h3 className="text-base font-semibold text-neutral-950">{item.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm leading-5 text-neutral-500">{item.description}</p>
      </div>
    </a>
  );
}
