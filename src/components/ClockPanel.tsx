import { useEffect, useState } from "react";

export default function ClockPanel() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(timer);
  }, []);

  const dateText = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(now);

  const weekdayText = new Intl.DateTimeFormat("zh-CN", {
    weekday: "long",
  }).format(now);

  const timeText = new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(now);

  return (
    <div className="hidden min-w-32 text-right lg:block">
      <p className="text-sm text-slate-500 dark:text-slate-400">{dateText}</p>
      <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
        {weekdayText}
      </p>
      <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{timeText}</p>
    </div>
  );
}
