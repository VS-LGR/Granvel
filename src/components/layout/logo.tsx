import Link from "next/link";
import { site } from "@/config/site";

export function Logo() {
  return (
    <Link href="/" className="group flex items-baseline gap-1 focus-ring rounded-sm">
      <span className="font-[family-name:var(--font-syne)] text-xl font-bold tracking-tight text-[var(--color-ink)] sm:text-2xl">
        {site.name}
      </span>
      <span className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-muted)] sm:inline">
        motors
      </span>
    </Link>
  );
}
