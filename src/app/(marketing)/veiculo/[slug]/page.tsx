import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { whatsappHref } from "@/config/site";
import { categoryLabels, type VehicleCategory } from "@/config/filters";
import { formatBRLFromCents, formatKm } from "@/lib/format";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { fetchVehicleBySlug } from "@/lib/vehicles/queries";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { VehicleGalleryCarousel } from "@/components/sections/vehicle-gallery-carousel";

type Props = { params: Promise<{ slug: string }> };

function categoryLabel(cat: string): string {
  if (cat in categoryLabels) return categoryLabels[cat as VehicleCategory];
  return cat;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { title: "Veículo" };
  const v = await fetchVehicleBySlug(supabase, slug);
  if (!v) return { title: "Veículo não encontrado" };
  const title = `${v.brand} ${v.model} ${v.year}`;
  const desc =
    v.description?.trim().slice(0, 160) ??
    `${categoryLabel(v.category)} · ${formatKm(v.mileage_km)} · ${formatBRLFromCents(v.price_cents)} na Granvel.`;
  return {
    title,
    description: desc,
    openGraph: { title, description: desc },
  };
}

export default async function VehicleDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) notFound();
  const vehicle = await fetchVehicleBySlug(supabase, slug);
  if (!vehicle) notFound();

  const images = vehicle.image_urls ?? [];
  const title = `${vehicle.brand} ${vehicle.model}`;
  const wa = whatsappHref(`Tenho interesse no ${vehicle.brand} ${vehicle.model} ${vehicle.year} (site Granvel).`);

  return (
    <article className="border-b border-[var(--color-line)] bg-[var(--color-paper)] py-[var(--section-y)]">
      <Container>
        <nav className="mb-8 text-sm text-[var(--color-ink-muted)]">
          <Link href="/inventory" className="font-medium text-[var(--color-accent)] hover:underline focus-ring rounded-sm">
            ← Voltar ao estoque
          </Link>
        </nav>
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-12">
          <div>
            <VehicleGalleryCarousel images={images} alt={title} variant="light" />
          </div>
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              {vehicle.is_promotion ? <Badge tone="accent">Promoção</Badge> : null}
              {vehicle.is_featured_month ? <Badge tone="neutral">Carro do mês</Badge> : null}
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-muted)]">
              {categoryLabel(vehicle.category)} · {vehicle.year}
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
              {vehicle.brand} {vehicle.model}
            </h1>
            <p className="mt-4 text-3xl font-bold text-[var(--color-accent)] sm:text-4xl">{formatBRLFromCents(vehicle.price_cents)}</p>
            <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-[var(--color-ink-muted)]">Ficha</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-4 border-b border-[var(--color-line)] py-2">
                <dt className="text-[var(--color-ink-muted)]">Combustível</dt>
                <dd className="font-medium text-[var(--color-ink)]">{vehicle.fuel}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-[var(--color-line)] py-2">
                <dt className="text-[var(--color-ink-muted)]">Câmbio</dt>
                <dd className="font-medium text-[var(--color-ink)]">{vehicle.transmission}</dd>
              </div>
              <div className="flex justify-between gap-4 py-2">
                <dt className="text-[var(--color-ink-muted)]">Quilometragem</dt>
                <dd className="font-medium text-[var(--color-ink)]">{formatKm(vehicle.mileage_km)}</dd>
              </div>
            </dl>
            {vehicle.description ? (
              <div className="mt-6 border-t border-[var(--color-line)] pt-6">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-ink-muted)]">Descrição</h2>
                <p className="mt-3 text-base leading-relaxed text-[var(--color-ink-muted)]">{vehicle.description}</p>
              </div>
            ) : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={wa} className="sm:flex-1">
                <Button className="w-full" size="lg">
                  Falar no WhatsApp
                </Button>
              </a>
              <Link href="/inventory" className="sm:flex-1">
                <Button variant="secondary" className="w-full" size="lg">
                  Ver mais veículos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}
