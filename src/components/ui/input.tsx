import type { InputHTMLAttributes } from "react";

export type InputFieldVariant = "default" | "onDark";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  fieldVariant?: InputFieldVariant;
};

export function Input({ id, label, hint, fieldVariant = "default", className = "", ...props }: InputProps) {
  const inputId = id ?? label.replace(/\s+/g, "-").toLowerCase();
  const labelClass =
    fieldVariant === "onDark" ? "font-medium text-zinc-100" : "font-medium text-[var(--color-ink)]";
  const hintClass = fieldVariant === "onDark" ? "text-xs text-zinc-400" : "text-xs text-[var(--color-ink-muted)]";
  const controlClass =
    fieldVariant === "onDark"
      ? "min-h-11 rounded-[var(--radius-md)] border border-zinc-400/90 bg-white px-3 py-2.5 text-base text-zinc-900 shadow-sm placeholder:text-zinc-500 focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 [color-scheme:light]"
      : "min-h-11 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white px-3 py-2.5 text-base text-zinc-900 shadow-inner placeholder:text-zinc-500 focus:border-[var(--color-accent)] focus:outline-none [color-scheme:light]";

  return (
    <label className="flex flex-col gap-1.5 text-sm" htmlFor={inputId}>
      <span className={labelClass}>{label}</span>
      <input id={inputId} className={`${controlClass} ${className}`} {...props} />
      {hint ? <span className={hintClass}>{hint}</span> : null}
    </label>
  );
}
