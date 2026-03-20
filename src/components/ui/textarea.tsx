import type { TextareaHTMLAttributes } from "react";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  hint?: string;
};

export function Textarea({ id, label, hint, className = "", ...props }: TextareaProps) {
  const tid = id ?? label.replace(/\s+/g, "-").toLowerCase();
  return (
    <label className="flex flex-col gap-1.5 text-sm" htmlFor={tid}>
      <span className="font-medium text-[var(--color-ink)]">{label}</span>
      <textarea
        id={tid}
        className={`min-h-[120px] rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white px-3 py-2 text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none ${className}`}
        {...props}
      />
      {hint ? <span className="text-xs text-[var(--color-ink-muted)]">{hint}</span> : null}
    </label>
  );
}
