import { whatsappHref } from "@/config/site";
import { inventoryContent } from "@/config/site-content";
import type { VehicleCardData } from "@/lib/types/vehicle";
import { formatBRLFromCents, formatKm } from "@/lib/format";
import { categoryLabels, type VehicleCategory } from "@/config/filters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export type InventoryResultsProps = {
  vehicles: VehicleCardData[];
};

function categoryLabel(cat: string): string {
  if (cat in categoryLabels) return categoryLabels[cat as VehicleCategory];
  return cat;
}

export function InventoryResults({ vehicles }: InventoryResultsProps) {
  if (vehicles.length === 0) {
    return (
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-xl rounded-[var(--radius-lg)] border border-dashed border-[var(--color-line)] bg-white/70 p-10 text-center">
            <h2 className="font-[family-name:var(--font-syne)] text-2xl font-semibold text-[var(--color-ink)]">
              {inventoryContent.emptyTitle}
            </h2>
            <p className="mt-3 text-[var(--color-ink-muted)]">{inventoryContent.emptyBody}</p>
            <a href={whatsappHref(inventoryContent.whatsappPrompt)} className="mt-6 inline-block">
              <Button size="lg">Falar no WhatsApp</Button>
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
              <Card className="card-lift overflow-hidden">
                <div className="relative aspect-[16/10] bg-[var(--color-paper-dark)]">
                  {v.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={v.imageUrl} alt={`${v.brand} ${v.model}`} className="h-full w-full object-cover" />
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
                  <a href={whatsappHref(`Tenho interesse no ${v.brand} ${v.model} ${v.year}.`)}>
                    <Button variant="secondary" className="mt-2 w-full" size="sm">
                      Tenho interesse
                    </Button>
                  </a>
                </div>
              </Card>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center text-sm text-[var(--color-ink-muted)]">
          Quer reserva ou visita?{" "}
          <a
            href={whatsappHref(inventoryContent.whatsappPrompt)}
            className="font-semibold text-[var(--color-accent)] hover:underline focus-ring rounded-sm"
          >
            Fale conosco
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
