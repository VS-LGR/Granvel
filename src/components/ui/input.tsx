import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

export function Input({ id, label, hint, className = "", ...props }: InputProps) {
  const inputId = id ?? label.replace(/\s+/g, "-").toLowerCase();
  return (
    <label className="flex flex-col gap-1.5 text-sm" htmlFor={inputId}>
      <span className="font-medium text-[var(--color-ink)]">{label}</span>
      <input
        id={inputId}
        className={`rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white px-3 py-2 text-[var(--color-ink)] shadow-inner focus:border-[var(--color-accent)] focus:outline-none ${className}`}
        {...props}
      />
      {hint ? <span className="text-xs text-[var(--color-ink-muted)]">{hint}</span> : null}
    </label>
  );
}
