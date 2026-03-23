import Link from "next/link";
import { whatsappHref } from "@/config/site";
import { highlightContent } from "@/config/site-content";
import type { VehicleRow } from "@/lib/types/vehicle";
import { formatBRLFromCents, formatKm } from "@/lib/format";
import { categoryLabels, type VehicleCategory } from "@/config/filters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { VehicleGalleryCarousel } from "@/components/sections/vehicle-gallery-carousel";

export type HighlightImmersiveProps = {
  vehicle: VehicleRow | null;
};

function categoryLabel(cat: string): string {
  if (cat in categoryLabels) return categoryLabels[cat as VehicleCategory];
  return cat;
}

export function HighlightImmersive({ vehicle }: HighlightImmersiveProps) {
  if (!vehicle) {
    return (
      <section className="relative overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-ink)] py-16 text-[var(--color-paper)] sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-35"
          aria-hidden
          style={{
            background:
              "radial-gradient(900px 420px at 15% 10%, var(--color-glow), transparent 55%), radial-gradient(600px 380px at 90% 0%, rgba(246,244,239,0.08), transparent 50%)",
          }}
        />
        <Container className="relative">
          <div className="mx-auto max-w-xl rounded-[var(--radius-lg)] border border-white/15 bg-white/10 p-10 text-center backdrop-blur-sm sm:p-12">
            <h1 className="font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight sm:text-4xl">
              {highlightContent.fallbackTitle}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-paper)]/85">{highlightContent.fallbackBody}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <a href={whatsappHref(highlightContent.whatsappPrompt)} className="sm:min-w-[200px]">
                <Button size="lg" className="w-full">
                  {highlightContent.ctaPrimary}
                </Button>
              </a>
              <Link href="/inventory" className="sm:min-w-[200px]">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full !border-2 !border-white/45 !bg-white/12 !text-white shadow-sm backdrop-blur-sm hover:!bg-white/22"
                >
                  {highlightContent.ctaSecondary}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  const images = vehicle.image_urls ?? [];
  const title = `${vehicle.brand} ${vehicle.model}`;

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          background:
            "radial-gradient(1000px 480px at 12% 8%, var(--color-glow), transparent 58%), radial-gradient(720px 400px at 88% 4%, rgba(246,244,239,0.1), transparent 48%)",
        }}
      />
      <Container className="relative py-12 sm:py-16 lg:py-[5.5rem]">
        <div className="mb-8 max-w-4xl border-l-4 border-[var(--color-accent)] pl-4 sm:mb-10 sm:pl-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-paper)]/70">{highlightContent.eyebrow}</p>
          <h1 className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-paper)]/88 sm:text-lg">
            {categoryLabel(vehicle.category)} · {vehicle.year} · {formatKm(vehicle.mileage_km)}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.85fr] lg:items-start lg:gap-12 xl:gap-16">
          <div className="min-w-0">
            <VehicleGalleryCarousel images={images} alt={title} variant="dark" />
          </div>

          <aside className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper)] p-6 text-[var(--color-ink)] shadow-[0_24px_60px_rgba(12,15,20,0.18)] sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="accent">Carro do mês</Badge>
              {vehicle.is_promotion ? <Badge tone="neutral">Promoção</Badge> : null}
            </div>
            <p className="mt-6 text-3xl font-bold text-[var(--color-accent)] sm:text-4xl">{formatBRLFromCents(vehicle.price_cents)}</p>
            <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-[var(--color-ink-muted)]">{highlightContent.specsTitle}</h2>
            <dl className="mt-4 space-y-2 text-sm">
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
              <p className="mt-6 border-t border-[var(--color-line)] pt-6 text-sm leading-relaxed text-[var(--color-ink-muted)]">{vehicle.description}</p>
            ) : null}
            <div className="mt-8 flex flex-col gap-3">
              <a href={whatsappHref(`${highlightContent.whatsappPrompt} — ${vehicle.brand} ${vehicle.model}.`)}>
                <Button className="w-full" size="lg">
                  {highlightContent.ctaPrimary}
                </Button>
              </a>
              <Link href="/inventory">
                <Button
                  variant="secondary"
                  className="w-full border-2 border-[var(--color-ink)]/18 bg-white text-[var(--color-ink)] hover:bg-[var(--color-paper-dark)]/80"
                  size="lg"
                >
                  {highlightContent.ctaSecondary}
                </Button>
              </Link>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
