"use client";

import { useActionState, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
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
import { VehicleKmField } from "@/components/staff/vehicle-km-field";
import { VehiclePriceField } from "@/components/staff/vehicle-price-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const categoryOptions = vehicleCategories.map((c) => ({ value: c, label: categoryLabels[c] }));

type Mode = { type: "create" } | { type: "edit"; vehicle: VehicleRow };

function SubmitVehicleButton({ mode }: { mode: Mode["type"] }) {
  const { pending } = useFormStatus();
  const idleLabel = mode === "create" ? "Salvar veículo" : "Salvar alterações";
  const pendingLabel = mode === "create" ? "Cadastrando veículo..." : "Salvando alterações...";

  return (
    <Button type="submit" size="lg" disabled={pending} aria-busy={pending}>
      {pending ? pendingLabel : idleLabel}
    </Button>
  );
}

function FormActions({ mode }: { mode: Mode["type"] }) {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-wrap gap-3">
      <SubmitVehicleButton mode={mode} />
      <Link
        href="/staff"
        aria-disabled={pending}
        onClick={(e) => {
          if (pending) e.preventDefault();
        }}
        className={`inline-flex min-h-12 items-center justify-center rounded-[var(--radius-md)] border border-white/25 bg-white/10 px-6 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${
          pending ? "cursor-not-allowed opacity-55" : "hover:bg-white/15"
        }`}
      >
        Cancelar
      </Link>
    </div>
  );
}

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
  const confirmMessage = 
    mode.type === "create"
      ? "Confirmar cadastro deste veículo no sistema?"
      : "Confirmar atualização dos dados deste veículo?";
  const confirmDescription =
    mode.type === "create"
      ? "Após confirmar, o sistema iniciará o cadastro e envio das imagens."
      : "Após confirmar, as alterações serão salvas e publicadas conforme os campos marcados.";
  const formRef = useRef<HTMLFormElement>(null);
  const allowSubmitRef = useRef(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <form
      ref={formRef}
      action={formAction}
      encType="multipart/form-data"
      className="mx-auto flex max-w-2xl flex-col gap-5"
      onSubmit={(e) => {
        if (allowSubmitRef.current) {
          allowSubmitRef.current = false;
          return;
        }
        if (!isConfirmOpen) {
          e.preventDefault();
          setIsConfirmOpen(true);
        }
      }}
    >
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
        <VehiclePriceField defaultCents={v?.price_cents} />
        <VehicleKmField defaultKm={v?.mileage_km} />
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
      <div className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-white/15 bg-white/5 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Visibilidade e destaques</p>
        <label className="flex cursor-pointer items-center gap-3 rounded-[var(--radius-md)] border border-white/15 bg-white/5 px-4 py-3 transition-colors hover:border-white/25 hover:bg-white/10 has-[:checked]:border-[var(--color-accent)]/50 has-[:checked]:bg-[var(--color-accent)]/12 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--color-accent)]">
          <input
            type="checkbox"
            name="published"
            defaultChecked={v?.published ?? true}
            className="size-[1.125rem] shrink-0 rounded border-2 border-white/35 bg-white text-[var(--color-accent)] accent-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/40 focus:ring-offset-2 focus:ring-offset-[var(--color-ink)]"
          />
          <span className="text-sm font-medium text-zinc-100">Publicado no site</span>
        </label>
        <label className="flex cursor-pointer items-center gap-3 rounded-[var(--radius-md)] border border-white/15 bg-white/5 px-4 py-3 transition-colors hover:border-white/25 hover:bg-white/10 has-[:checked]:border-[var(--color-accent)]/50 has-[:checked]:bg-[var(--color-accent)]/12 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--color-accent)]">
          <input
            type="checkbox"
            name="is_featured_month"
            defaultChecked={v?.is_featured_month ?? false}
            className="size-[1.125rem] shrink-0 rounded border-2 border-white/35 bg-white text-[var(--color-accent)] accent-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/40 focus:ring-offset-2 focus:ring-offset-[var(--color-ink)]"
          />
          <span className="text-sm font-medium text-zinc-100">Carro do mês</span>
        </label>
        <label className="flex cursor-pointer items-center gap-3 rounded-[var(--radius-md)] border border-white/15 bg-white/5 px-4 py-3 transition-colors hover:border-white/25 hover:bg-white/10 has-[:checked]:border-[var(--color-accent)]/50 has-[:checked]:bg-[var(--color-accent)]/12 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--color-accent)]">
          <input
            type="checkbox"
            name="is_promotion"
            defaultChecked={v?.is_promotion ?? false}
            className="size-[1.125rem] shrink-0 rounded border-2 border-white/35 bg-white text-[var(--color-accent)] accent-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/40 focus:ring-offset-2 focus:ring-offset-[var(--color-ink)]"
          />
          <span className="text-sm font-medium text-zinc-100">Promoção</span>
        </label>
      </div>
      {state.error ? <p className="text-sm font-medium text-red-300">{state.error}</p> : null}
      <FormActions mode={mode.type} />
      {isConfirmOpen ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/55 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-label={confirmMessage}
            className="w-full max-w-md rounded-[var(--radius-lg)] border border-white/15 bg-[var(--color-ink)] p-6 shadow-[var(--shadow-soft)]"
          >
            <h2 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-white">{confirmMessage}</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">{confirmDescription}</p>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <Button
                type="button"
                variant="secondary"
                className="border-white/20 bg-white/10 text-white hover:bg-white/15"
                onClick={() => setIsConfirmOpen(false)}
              >
                Voltar
              </Button>
              <Button
                type="button"
                onClick={() => {
                  allowSubmitRef.current = true;
                  setIsConfirmOpen(false);
                  formRef.current?.requestSubmit();
                }}
              >
                Confirmar e salvar
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </form>
  );
}
