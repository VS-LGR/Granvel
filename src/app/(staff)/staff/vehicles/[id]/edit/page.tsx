import Link from "next/link";
import { notFound } from "next/navigation";
import { VehicleForm } from "@/components/staff/vehicle-form";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { fetchVehicleById } from "@/lib/vehicles/queries";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditVehiclePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) notFound();

  const vehicle = await fetchVehicleById(supabase, id);
  if (!vehicle) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/staff" className="text-sm font-medium text-zinc-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]">
        ← Painel
      </Link>
      <h1 className="mt-6 font-[family-name:var(--font-syne)] text-3xl font-semibold text-zinc-50">Editar veículo</h1>
      <p className="mt-2 text-sm text-zinc-400">
        {vehicle.brand} {vehicle.model} · {vehicle.year}
      </p>
      <div className="mt-10">
        <VehicleForm mode={{ type: "edit", vehicle }} />
      </div>
    </div>
  );
}
