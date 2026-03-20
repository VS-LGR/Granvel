import type { SelectHTMLAttributes } from "react";

export type SelectOption = { value: string; label: string };

export type SelectFieldVariant = "default" | "onDark";

export type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: SelectOption[];
  hint?: string;
  fieldVariant?: SelectFieldVariant;
};

export function SelectField({
  id,
  label,
  options,
  hint,
  fieldVariant = "default",
  className = "",
  ...props
}: SelectFieldProps) {
  const selectId = id ?? label.replace(/\s+/g, "-").toLowerCase();
  const labelClass =
    fieldVariant === "onDark" ? "font-medium text-zinc-100" : "font-medium text-[var(--color-ink)]";
  const hintClass = fieldVariant === "onDark" ? "text-xs text-zinc-400" : "text-xs text-[var(--color-ink-muted)]";
  const controlClass =
    fieldVariant === "onDark"
      ? "rounded-[var(--radius-md)] border border-zinc-400 bg-white px-3 py-2 text-zinc-900 focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 [color-scheme:light]"
      : "rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white px-3 py-2 text-zinc-900 focus:border-[var(--color-accent)] focus:outline-none [color-scheme:light]";

  return (
    <label className="flex flex-col gap-1.5 text-sm" htmlFor={selectId}>
      <span className={labelClass}>{label}</span>
      <select id={selectId} className={`${controlClass} ${className}`} {...props}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {hint ? <span className={hintClass}>{hint}</span> : null}
    </label>
  );
}
