import Link from "next/link";
import type { VehicleCardData } from "@/lib/types/vehicle";
import { formatBRLFromCents, formatKm } from "@/lib/format";
import { categoryLabels, type VehicleCategory } from "@/config/filters";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export type VehicleGridProps = {
  title: string;
  vehicles: VehicleCardData[];
  viewAllHref?: string;
};

function categoryLabel(cat: string): string {
  if (cat in categoryLabels) return categoryLabels[cat as VehicleCategory];
  return cat;
}

export function VehicleGrid({ title, vehicles, viewAllHref = "/inventory" }: VehicleGridProps) {
  return (
    <section className="border-y border-[var(--color-line)] bg-[var(--color-paper-dark)]/35 py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight text-[var(--color-ink)]">
            {title}
          </h2>
          <Link
            href={viewAllHref}
            className="text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] focus-ring rounded-sm"
          >
            Ver tudo
          </Link>
        </div>
        {vehicles.length === 0 ? (
          <p className="mt-10 text-[var(--color-ink-muted)]">
            Novidades em cadastro — volte em instantes ou fale no WhatsApp.
          </p>
        ) : (
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((v) => (
              <li key={v.id}>
                <Card className="card-lift overflow-hidden">
                  <div className="relative aspect-[16/10] bg-[var(--color-paper-dark)]">
                    {v.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={v.imageUrl}
                        alt={`${v.brand} ${v.model}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-[var(--color-ink-muted)]">
                        Sem foto
                      </div>
                    )}
                    {v.isPromotion ? (
                      <span className="absolute left-3 top-3">
                        <Badge tone="accent">Promoção</Badge>
                      </span>
                    ) : null}
                  </div>
                  <div className="space-y-2 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-muted)]">
                      {categoryLabel(v.category)} · {v.year}
                    </p>
                    <p className="text-lg font-semibold text-[var(--color-ink)]">
                      {v.brand} {v.model}
                    </p>
                    <p className="text-2xl font-bold text-[var(--color-accent)]">{formatBRLFromCents(v.priceCents)}</p>
                    <p className="text-sm text-[var(--color-ink-muted)]">
                      {formatKm(v.mileageKm)} · {v.fuel} · {v.transmission}
                    </p>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
