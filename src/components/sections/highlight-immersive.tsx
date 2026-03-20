import Link from "next/link";
import { whatsappHref } from "@/config/site";
import { highlightContent } from "@/config/site-content";
import type { VehicleRow } from "@/lib/types/vehicle";
import { formatBRLFromCents, formatKm } from "@/lib/format";
import { categoryLabels, type VehicleCategory } from "@/config/filters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

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
      <section className="py-24">
        <Container>
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white/70 p-12 text-center">
            <h1 className="font-[family-name:var(--font-syne)] text-4xl font-semibold text-[var(--color-ink)]">
              {highlightContent.fallbackTitle}
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-[var(--color-ink-muted)]">{highlightContent.fallbackBody}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/inventory">
                <Button size="lg">{highlightContent.ctaSecondary}</Button>
              </Link>
              <a href={whatsappHref(highlightContent.whatsappPrompt)}>
                <Button variant="secondary" size="lg">
                  {highlightContent.ctaPrimary}
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  const images = vehicle.image_urls ?? [];
  const [main, ...rest] = images;

  return (
    <section className="border-b border-[var(--color-line)] bg-[var(--color-ink)] text-[var(--color-paper)]">
      <Container className="py-16 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-paper)]/60">
          {highlightContent.eyebrow}
        </p>
        <h1 className="mt-3 max-w-4xl font-[family-name:var(--font-syne)] text-4xl font-semibold leading-tight sm:text-5xl">
          {vehicle.brand} {vehicle.model}
        </h1>
        <p className="mt-3 text-lg text-[var(--color-paper)]/80">
          {categoryLabel(vehicle.category)} · {vehicle.year} · {formatKm(vehicle.mileage_km)}
        </p>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-[var(--radius-lg)] border border-white/10 bg-black/20">
              {main ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={main} alt={`${vehicle.brand} ${vehicle.model}`} className="aspect-[16/10] w-full object-cover" />
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center text-[var(--color-paper)]/50">
                  Sem foto principal
                </div>
              )}
            </div>
            {rest.length > 0 ? (
              <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {rest.slice(0, 4).map((src) => (
                  <li key={src} className="overflow-hidden rounded-[var(--radius-md)] border border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="aspect-[4/3] w-full object-cover" />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <Card className="h-fit border-white/10 bg-white/5 p-8 text-[var(--color-ink)] backdrop-blur-md">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="accent">Carro do mês</Badge>
              {vehicle.is_promotion ? <Badge tone="neutral">Promoção</Badge> : null}
            </div>
            <p className="mt-6 text-4xl font-bold text-[var(--color-accent)]">
              {formatBRLFromCents(vehicle.price_cents)}
            </p>
            <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-[var(--color-ink-muted)]">
              {highlightContent.specsTitle}
            </h2>
            <dl className="mt-4 space-y-2 text-sm text-[var(--color-ink-muted)]">
              <div className="flex justify-between gap-4 border-b border-[var(--color-line)] py-2">
                <dt>Combustível</dt>
                <dd className="font-medium text-[var(--color-ink)]">{vehicle.fuel}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-[var(--color-line)] py-2">
                <dt>Câmbio</dt>
                <dd className="font-medium text-[var(--color-ink)]">{vehicle.transmission}</dd>
              </div>
              <div className="flex justify-between gap-4 py-2">
                <dt>Quilometragem</dt>
                <dd className="font-medium text-[var(--color-ink)]">{formatKm(vehicle.mileage_km)}</dd>
              </div>
            </dl>
            {vehicle.description ? (
              <p className="mt-6 text-sm leading-relaxed text-[var(--color-ink-muted)]">{vehicle.description}</p>
            ) : null}
            <div className="mt-8 flex flex-col gap-3">
              <a href={whatsappHref(`${highlightContent.whatsappPrompt} — ${vehicle.brand} ${vehicle.model}.`)}>
                <Button className="w-full" size="lg">
                  {highlightContent.ctaPrimary}
                </Button>
              </a>
              <Link href="/inventory">
                <Button variant="secondary" className="w-full" size="lg">
                  {highlightContent.ctaSecondary}
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
