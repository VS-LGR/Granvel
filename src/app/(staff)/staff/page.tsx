import Link from "next/link";
import { signOutStaff } from "@/lib/staff/actions";
import { formatBRLFromCents } from "@/lib/format";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { fetchPublishedVehiclesForStaff } from "@/lib/vehicles/queries";
import { Button } from "@/components/ui/button";

export default async function StaffDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const rows = supabase ? await fetchPublishedVehiclesForStaff(supabase) : [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-[family-name:var(--font-syne)] text-3xl font-semibold text-zinc-50">Veículos</h1>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/staff/vehicles/new"
            className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent)] px-6 text-sm font-semibold text-white shadow-sm hover:bg-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          >
            Novo veículo
          </Link>
          <form action={signOutStaff}>
            <Button type="submit" variant="secondary" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white/15">
              Sair
            </Button>
          </form>
        </div>
      </div>
      {!supabase ? (
        <p className="mt-8 text-white/60">Supabase não configurado neste ambiente.</p>
      ) : rows.length === 0 ? (
        <p className="mt-8 text-white/60">Nenhum veículo cadastrado ainda.</p>
      ) : (
        <ul className="mt-10 space-y-3">
          {rows.map((v) => (
            <li
              key={v.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3"
            >
              <div>
                <p className="font-medium text-white">
                  {v.brand} {v.model} · {v.year}
                </p>
                <p className="text-sm text-white/50">
                  {formatBRLFromCents(v.price_cents)} · {v.published ? "Publicado" : "Rascunho"}
                  {v.is_featured_month ? " · Destaque" : ""}
                  {v.is_promotion ? " · Promoção" : ""}
                </p>
              </div>
              <Link
                href={`/staff/vehicles/${v.id}/edit`}
                className="text-sm font-semibold text-[var(--color-accent)] hover:underline"
              >
                Editar
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
