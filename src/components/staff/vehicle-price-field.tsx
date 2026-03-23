"use client";

import { useCallback, useState } from "react";

function digitsToCents(digits: string): number {
  if (digits === "") return 0;
  const n = parseInt(digits, 10);
  if (!Number.isFinite(n)) return 0;
  return Math.min(n, Number.MAX_SAFE_INTEGER);
}

function formatBRLFromCents(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export type VehiclePriceFieldProps = {
  defaultCents?: number;
  name?: string;
};

export function VehiclePriceField({ defaultCents = 0, name = "price_reais" }: VehiclePriceFieldProps) {
  const initialDigits =
    defaultCents > 0 ? String(Math.round(defaultCents)) : "";
  const [digits, setDigits] = useState(initialDigits);
  const cents = digitsToCents(digits);
  const display = digits === "" ? "" : formatBRLFromCents(cents);
  const submitValue = digits === "" ? "" : (cents / 100).toFixed(2);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let next = e.target.value.replace(/\D/g, "");
    if (next.length > 14) next = next.slice(0, 14);
    setDigits(next);
  }, []);

  const labelClass = "font-medium text-zinc-100";
  const controlClass =
    "w-full min-h-11 rounded-[var(--radius-md)] border border-zinc-400/90 bg-white px-3 py-2.5 text-base tabular-nums text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 [color-scheme:light]";

  return (
    <div className="flex flex-col gap-1.5 text-sm">
      <span className={labelClass}>Preço (R$)</span>
      <input
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={display}
        onChange={onChange}
        placeholder="0,00"
        className={controlClass}
        aria-describedby="price-reais-hint"
        required
      />
      <input type="hidden" name={name} value={submitValue} />
      <span id="price-reais-hint" className="text-xs text-zinc-400">
        Digite apenas números: centavos são preenchidos automaticamente (ex.: 159990 → 1.599,90).
      </span>
    </div>
  );
}
