"use client";

import { useCallback, useState } from "react";

function formatKm(km: number): string {
  return new Intl.NumberFormat("pt-BR").format(km);
}

export type VehicleKmFieldProps = {
  defaultKm?: number;
  name?: string;
};

export function VehicleKmField({ defaultKm = 0, name = "mileage_km" }: VehicleKmFieldProps) {
  const initialDigits = defaultKm > 0 ? String(Math.round(defaultKm)) : "";
  const [digits, setDigits] = useState(initialDigits);
  const km = digits === "" ? 0 : parseInt(digits, 10) || 0;
  const display = digits === "" ? "" : formatKm(km);
  const submitValue = digits === "" ? "" : String(km);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value.replace(/\D/g, "");
    if (next.length > 9) return;
    setDigits(next);
  }, []);

  const labelClass = "font-medium text-zinc-100";
  const controlClass =
    "w-full min-h-11 rounded-[var(--radius-md)] border border-zinc-400/90 bg-white px-3 py-2.5 text-base tabular-nums text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 [color-scheme:light]";

  return (
    <div className="flex flex-col gap-1.5 text-sm">
      <span className={labelClass}>Quilometragem</span>
      <input
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={display}
        onChange={onChange}
        placeholder="0"
        className={controlClass}
        aria-describedby="mileage-km-hint"
        required
      />
      <input type="hidden" name={name} value={submitValue} />
      <span id="mileage-km-hint" className="text-xs text-zinc-400">
        Apenas números; milhares aparecem com ponto (ex.: 45000 → 45.000).
      </span>
    </div>
  );
}
