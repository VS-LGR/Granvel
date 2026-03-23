import type { SelectHTMLAttributes } from "react";

export type SelectOption = { value: string; label: string };

export type SelectFieldVariant = "default" | "onDark";

const selectChevronStyle = (stroke: string) => ({
  backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none' viewBox='0 0 24 24'><path stroke='${stroke}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' d='m6 9 6 6 6-6'/></svg>`,
  )}")`,
  backgroundRepeat: "no-repeat" as const,
  backgroundPosition: "right 0.65rem center",
  backgroundSize: "1.125rem 1.125rem",
});

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
  style,
  ...props
}: SelectFieldProps) {
  const selectId = id ?? label.replace(/\s+/g, "-").toLowerCase();
  const labelClass =
    fieldVariant === "onDark" ? "font-medium text-zinc-100" : "font-medium text-[var(--color-ink)]";
  const hintClass = fieldVariant === "onDark" ? "text-xs text-zinc-400" : "text-xs text-[var(--color-ink-muted)]";
  const controlClass =
    fieldVariant === "onDark"
      ? "min-h-11 w-full cursor-pointer appearance-none rounded-[var(--radius-md)] border border-zinc-400/90 bg-white py-2.5 pl-3 pr-11 text-base text-zinc-900 shadow-sm focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 [color-scheme:light]"
      : "min-h-11 w-full cursor-pointer appearance-none rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white py-2.5 pl-3 pr-11 text-base text-zinc-900 shadow-sm focus:border-[var(--color-accent)] focus:outline-none [color-scheme:light]";

  const mergedStyle =
    fieldVariant === "onDark"
      ? { ...selectChevronStyle("#334155"), ...style }
      : { ...selectChevronStyle("#64748b"), ...style };

  return (
    <label className="flex flex-col gap-1.5 text-sm" htmlFor={selectId}>
      <span className={labelClass}>{label}</span>
      <select id={selectId} className={`${controlClass} ${className}`} style={mergedStyle} {...props}>
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
