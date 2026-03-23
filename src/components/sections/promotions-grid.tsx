import Link from "next/link";
import { whatsappHref } from "@/config/site";
import { promotionsContent } from "@/config/site-content";
import type { VehicleCardData } from "@/lib/types/vehicle";
import { formatBRLFromCents, formatKm } from "@/lib/format";
import { categoryLabels, type VehicleCategory } from "@/config/filters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export type PromotionsGridProps = {
  vehicles: VehicleCardData[];
};

function categoryLabel(cat: string): string {
  if (cat in categoryLabels) return categoryLabels[cat as VehicleCategory];
  return cat;
}

export function PromotionsGrid({ vehicles }: PromotionsGridProps) {
  if (vehicles.length === 0) {
    return (
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-lg rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white/70 p-10 text-center">
            <h2 className="font-[family-name:var(--font-syne)] text-2xl font-semibold text-[var(--color-ink)]">
              {promotionsContent.emptyTitle}
            </h2>
            <p className="mt-3 text-[var(--color-ink-muted)]">{promotionsContent.emptyBody}</p>
            <a href={whatsappHref("Quero ser avisado das promoções Granvel.")} className="mt-6 inline-block">
              <Button size="lg">Avise-me no WhatsApp</Button>
            </a>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16">
      <Container>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((v) => (
            <li key={v.id}>
              <Link href={`/veiculo/${v.slug}`} className="group block">
                <Card className="card-lift h-full overflow-hidden transition-[border-color] group-hover:border-[var(--color-accent)]/35">
                  <div className="relative aspect-[16/10] bg-[var(--color-paper-dark)]">
                    {v.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={v.imageUrl} alt={`${v.brand} ${v.model}`} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-[var(--color-ink-muted)]">
                        Sem foto
                      </div>
                    )}
                    <span className="absolute left-3 top-3">
                      <Badge tone="accent">Promoção</Badge>
                    </span>
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
                    <p className="pt-1 text-xs font-semibold text-[var(--color-accent)] group-hover:underline">Ver fotos e detalhes</p>
                  </div>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
