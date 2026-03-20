"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createVehicle, updateVehicle } from "@/lib/staff/actions";
import {
  categoryLabels,
  fuelOptions,
  transmissionOptions,
  vehicleCategories,
} from "@/config/filters";
import type { VehicleRow } from "@/lib/types/vehicle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const categoryOptions = vehicleCategories.map((c) => ({ value: c, label: categoryLabels[c] }));

type Mode = { type: "create" } | { type: "edit"; vehicle: VehicleRow };

export function VehicleForm({ mode }: { mode: Mode }) {
  const action =
    mode.type === "create"
      ? createVehicle
      : updateVehicle.bind(null, mode.vehicle.id);

  const initial = { error: null as string | null };
  const [state, formAction] = useActionState(action, initial);

  const v = mode.type === "edit" ? mode.vehicle : null;
  const imageText = v?.image_urls?.join("\n") ?? "";
  const defaultFuel = v?.fuel ?? fuelOptions[0].value;
  const defaultTransmission = v?.transmission ?? transmissionOptions[0].value;
  const defaultCategory = v?.category ?? categoryOptions[0].value;

  return (
    <form action={formAction} className="mx-auto flex max-w-2xl flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="brand" label="Marca" required defaultValue={v?.brand} />
        <Input name="model" label="Modelo" required defaultValue={v?.model} />
        <Input name="year" label="Ano" type="number" required min={1990} max={2035} defaultValue={v?.year} />
        <Input
          name="price_reais"
          label="Preço (R$)"
          type="number"
          required
          min={1}
          step={0.01}
          defaultValue={v ? v.price_cents / 100 : undefined}
          hint="Use ponto ou vírgula no decimal."
        />
        <Input name="mileage_km" label="Quilometragem" type="number" required min={0} defaultValue={v?.mileage_km} />
        <SelectField
          name="fuel"
          label="Combustível"
          required
          defaultValue={defaultFuel}
          options={fuelOptions.map((o) => ({ value: o.value, label: o.label }))}
        />
        <SelectField
          name="transmission"
          label="Câmbio"
          required
          defaultValue={defaultTransmission}
          options={transmissionOptions.map((o) => ({ value: o.value, label: o.label }))}
        />
        <SelectField
          name="category"
          label="Categoria"
          required
          defaultValue={defaultCategory}
          options={categoryOptions}
        />
      </div>
      <Textarea name="description" label="Descrição" rows={5} defaultValue={v?.description ?? ""} />
      <Textarea
        name="image_urls"
        label="URLs de imagem (uma por linha)"
        rows={4}
        defaultValue={imageText}
        hint="Cole links https públicos das fotos."
      />
      <div className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/5 p-4 text-sm">
        <label className="flex items-center gap-2 text-white">
          <input type="checkbox" name="published" defaultChecked={v?.published ?? true} className="size-4" />
          Publicado no site
        </label>
        <label className="flex items-center gap-2 text-white">
          <input type="checkbox" name="is_featured_month" defaultChecked={v?.is_featured_month ?? false} className="size-4" />
          Carro do mês
        </label>
        <label className="flex items-center gap-2 text-white">
          <input type="checkbox" name="is_promotion" defaultChecked={v?.is_promotion ?? false} className="size-4" />
          Promoção
        </label>
      </div>
      {state.error ? <p className="text-sm text-red-300">{state.error}</p> : null}
      <div className="flex flex-wrap gap-3">
        <Button type="submit" size="lg">
          Salvar
        </Button>
        <Link
          href="/staff"
          className="inline-flex min-h-12 items-center rounded-[var(--radius-md)] px-5 text-sm font-medium text-white/70 hover:text-white"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
