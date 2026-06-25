import { ArrowUpRight, Grid2X2 } from "lucide-react";
import { useState } from "react";
import type { LinkItem } from "../types/link";

type AppCardProps = {
  item: LinkItem;
};

export default function AppCard({ item }: AppCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const Icon = item.icon;
  const isMore = item.kind === "more";
  const href = item.url;

  const markStyle = {
    backgroundColor: item.brand?.background ?? (isMore ? "#f8fafc" : "#f5f5f4"),
    color: item.brand?.foreground ?? "#475569",
  };

  const content = (
    <>
      <div
        className={[
          "flex h-16 w-16 items-center justify-center rounded-lg text-lg font-semibold shadow-sm transition",
          isMore
            ? "border border-slate-200 bg-white text-slate-500 shadow-none dark:border-slate-700 dark:bg-neutral-950 dark:text-slate-400"
            : "",
        ].join(" ")}
        style={isMore ? undefined : markStyle}
      >
        {isMore ? (
          <Grid2X2 className="h-9 w-9" aria-hidden="true" />
        ) : item.brand?.imageUrl && !imageFailed ? (
          <img
            className="h-10 w-10 object-contain"
            src={item.brand.imageUrl}
            alt=""
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : Icon ? (
          <Icon className="h-9 w-9" aria-hidden="true" />
        ) : (
          <span>{item.brand?.label ?? item.name.slice(0, 2)}</span>
        )}
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-sm font-medium text-slate-950 dark:text-slate-100">{item.name}</h3>
        {item.description ? (
          <p className="mt-1 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
            {item.description}
          </p>
        ) : null}
      </div>
      {href ? (
        <ArrowUpRight className="absolute right-3 top-3 h-4 w-4 text-slate-300 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100 dark:text-slate-600" />
      ) : null}
    </>
  );

  const className = [
    "group relative flex min-h-36 flex-col items-center justify-center rounded-lg border bg-white px-4 py-5 text-center shadow-sm outline-none transition dark:bg-neutral-900 dark:shadow-none",
    isMore
      ? "border-dashed border-slate-200 text-slate-500 hover:border-teal-300 hover:bg-teal-50/40 dark:border-slate-800 dark:text-slate-400 dark:hover:border-teal-500/60 dark:hover:bg-teal-500/10"
      : "border-slate-100 hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md focus-visible:border-teal-500 focus-visible:ring-2 focus-visible:ring-teal-100 dark:border-slate-800 dark:hover:border-teal-500/70 dark:hover:bg-slate-900 dark:focus-visible:border-teal-400 dark:focus-visible:ring-teal-500/20",
  ].join(" ");

  return href ? (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}
