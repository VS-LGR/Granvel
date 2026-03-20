import Link from "next/link";
import { VehicleForm } from "@/components/staff/vehicle-form";

export default function NewVehiclePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/staff" className="text-sm font-medium text-zinc-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]">
        ← Painel
      </Link>
      <h1 className="mt-6 font-[family-name:var(--font-syne)] text-3xl font-semibold text-zinc-50">Novo veículo</h1>
      <p className="mt-2 text-sm text-zinc-400">Preencha os campos e marque se o anúncio já pode ir ao ar.</p>
      <div className="mt-10">
        <VehicleForm mode={{ type: "create" }} />
      </div>
    </div>
  );
}
