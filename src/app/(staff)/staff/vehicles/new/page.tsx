import Link from "next/link";
import { VehicleForm } from "@/components/staff/vehicle-form";

export default function NewVehiclePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/staff" className="text-sm text-white/60 hover:text-white">
        ← Painel
      </Link>
      <h1 className="mt-6 font-[family-name:var(--font-syne)] text-3xl font-semibold">Novo veículo</h1>
      <p className="mt-2 text-sm text-white/60">Preencha os campos e marque se o anúncio já pode ir ao ar.</p>
      <div className="mt-10">
        <VehicleForm mode={{ type: "create" }} />
      </div>
    </div>
  );
}
