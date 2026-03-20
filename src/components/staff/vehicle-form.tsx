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
import { StaffImageField } from "@/components/staff/staff-image-field";
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
    <form action={formAction} encType="multipart/form-data" className="mx-auto flex max-w-2xl flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input fieldVariant="onDark" name="brand" label="Marca" required defaultValue={v?.brand} />
        <Input fieldVariant="onDark" name="model" label="Modelo" required defaultValue={v?.model} />
        <Input
          fieldVariant="onDark"
          name="year"
          label="Ano"
          type="number"
          required
          min={1990}
          max={2035}
          defaultValue={v?.year}
        />
        <Input
          fieldVariant="onDark"
          name="price_reais"
          label="Preço (R$)"
          type="number"
          required
          min={1}
          step={0.01}
          defaultValue={v ? v.price_cents / 100 : undefined}
          hint="Use ponto ou vírgula no decimal."
        />
        <Input
          fieldVariant="onDark"
          name="mileage_km"
          label="Quilometragem"
          type="number"
          required
          min={0}
          defaultValue={v?.mileage_km}
        />
        <SelectField
          fieldVariant="onDark"
          name="fuel"
          label="Combustível"
          required
          defaultValue={defaultFuel}
          options={fuelOptions.map((o) => ({ value: o.value, label: o.label }))}
        />
        <SelectField
          fieldVariant="onDark"
          name="transmission"
          label="Câmbio"
          required
          defaultValue={defaultTransmission}
          options={transmissionOptions.map((o) => ({ value: o.value, label: o.label }))}
        />
        <SelectField
          fieldVariant="onDark"
          name="category"
          label="Categoria"
          required
          defaultValue={defaultCategory}
          options={categoryOptions}
        />
      </div>
      <Textarea
        fieldVariant="onDark"
        name="description"
        label="Descrição"
        rows={5}
        defaultValue={v?.description ?? ""}
      />
      <StaffImageField />
      <Textarea
        fieldVariant="onDark"
        name="image_urls"
        label="URLs extra (opcional, uma por linha)"
        rows={3}
        defaultValue={imageText}
        hint="Use se ainda tiver fotos hospedadas fora do Supabase. As enviadas acima entram primeiro na galeria."
      />
      <div className="flex flex-col gap-3 rounded-lg border border-white/15 bg-white/10 p-4 text-sm text-zinc-100">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            name="published"
            defaultChecked={v?.published ?? true}
            className="size-4 shrink-0 accent-[var(--color-accent)]"
          />
          <span>Publicado no site</span>
        </label>
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            name="is_featured_month"
            defaultChecked={v?.is_featured_month ?? false}
            className="size-4 shrink-0 accent-[var(--color-accent)]"
          />
          <span>Carro do mês</span>
        </label>
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            name="is_promotion"
            defaultChecked={v?.is_promotion ?? false}
            className="size-4 shrink-0 accent-[var(--color-accent)]"
          />
          <span>Promoção</span>
        </label>
      </div>
      {state.error ? <p className="text-sm font-medium text-red-300">{state.error}</p> : null}
      <div className="flex flex-wrap gap-3">
        <Button type="submit" size="lg">
          Salvar
        </Button>
        <Link
          href="/staff"
          className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-md)] border border-white/25 bg-white/10 px-6 text-sm font-semibold text-white hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
