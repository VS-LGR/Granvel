import type { ReactNode } from "react";

export type BadgeProps = {
  children: ReactNode;
  tone?: "accent" | "neutral";
  className?: string;
};

export function Badge({ children, tone = "neutral", className = "" }: BadgeProps) {
  const tones =
    tone === "accent"
      ? "bg-[var(--color-accent)]/15 text-[var(--color-accent-hover)] border-[var(--color-accent)]/30"
      : "bg-black/5 text-[var(--color-ink-muted)] border-[var(--color-line)]";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${tones} ${className}`}
    >
      {children}
    </span>
  );
}
