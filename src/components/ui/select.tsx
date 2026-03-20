import type { SelectHTMLAttributes } from "react";

export type SelectOption = { value: string; label: string };

export type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: SelectOption[];
  hint?: string;
};

export function SelectField({ id, label, options, hint, className = "", ...props }: SelectFieldProps) {
  const selectId = id ?? label.replace(/\s+/g, "-").toLowerCase();
  return (
    <label className="flex flex-col gap-1.5 text-sm" htmlFor={selectId}>
      <span className="font-medium text-[var(--color-ink)]">{label}</span>
      <select
        id={selectId}
        className={`rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white px-3 py-2 text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none ${className}`}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {hint ? <span className="text-xs text-[var(--color-ink-muted)]">{hint}</span> : null}
    </label>
  );
}
