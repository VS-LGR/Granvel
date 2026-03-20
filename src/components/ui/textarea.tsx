import type { TextareaHTMLAttributes } from "react";

export type TextareaFieldVariant = "default" | "onDark";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  hint?: string;
  fieldVariant?: TextareaFieldVariant;
};

export function Textarea({ id, label, hint, fieldVariant = "default", className = "", ...props }: TextareaProps) {
  const tid = id ?? label.replace(/\s+/g, "-").toLowerCase();
  const labelClass =
    fieldVariant === "onDark" ? "font-medium text-zinc-100" : "font-medium text-[var(--color-ink)]";
  const hintClass = fieldVariant === "onDark" ? "text-xs text-zinc-400" : "text-xs text-[var(--color-ink-muted)]";
  const controlClass =
    fieldVariant === "onDark"
      ? "min-h-[120px] rounded-[var(--radius-md)] border border-zinc-400 bg-white px-3 py-2 text-zinc-900 placeholder:text-zinc-500 focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 [color-scheme:light]"
      : "min-h-[120px] rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white px-3 py-2 text-zinc-900 placeholder:text-zinc-500 focus:border-[var(--color-accent)] focus:outline-none [color-scheme:light]";

  return (
    <label className="flex flex-col gap-1.5 text-sm" htmlFor={tid}>
      <span className={labelClass}>{label}</span>
      <textarea id={tid} className={`${controlClass} ${className}`} {...props} />
      {hint ? <span className={hintClass}>{hint}</span> : null}
    </label>
  );
}
