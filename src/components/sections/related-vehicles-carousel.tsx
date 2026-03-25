"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { VehicleCardData } from "@/lib/types/vehicle";
import { categoryLabels, type VehicleCategory } from "@/config/filters";
import { formatBRLFromCents, formatKm } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export type RelatedVehiclesCarouselProps = {
  vehicles: VehicleCardData[];
  title: string;
  intro: string;
};

function categoryLabel(cat: string): string {
  if (cat in categoryLabels) return categoryLabels[cat as VehicleCategory];
  return cat;
}

export function RelatedVehiclesCarousel({ vehicles, title, intro }: RelatedVehiclesCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 2);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 2);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    el.addEventListener("scroll", updateArrows, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", updateArrows);
    };
  }, [vehicles, updateArrows]);

  const scrollByDir = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = Math.min(el.clientWidth * 0.92, el.scrollWidth);
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  }, []);

  if (vehicles.length === 0) return null;

  const btnClass =
    "rounded-full border border-[var(--color-line)] bg-white/95 p-2.5 text-[var(--color-ink)] shadow-md backdrop-blur-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] disabled:pointer-events-none disabled:opacity-35";

  return (
    <section
      className="mt-14 border-t border-[var(--color-line)] bg-[var(--color-paper-dark)]/25 py-[var(--section-y)]"
      aria-labelledby="related-vehicles-heading"
    >
      <Container>
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-gradient-to-br from-white/75 to-[var(--color-paper-dark)]/28 p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2
                id="related-vehicles-heading"
                className="font-[family-name:var(--font-syne)] text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl"
              >
                {title}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-[var(--color-ink-muted)]">{intro}</p>
              <div className="mt-3 h-px w-14 bg-[var(--color-accent)]/35" aria-hidden />
            </div>
            <div className="flex gap-2">
              <button type="button" className={btnClass} aria-label="Rolar para trás" disabled={!canPrev} onClick={() => scrollByDir(-1)}>
                <ChevronLeftIcon />
              </button>
              <button type="button" className={btnClass} aria-label="Rolar para frente" disabled={!canNext} onClick={() => scrollByDir(1)}>
                <ChevronRightIcon />
              </button>
            </div>
          </div>

          <div
            ref={scrollerRef}
            role="region"
            aria-roledescription="carrossel"
            aria-label="Lista de veículos relacionados"
            tabIndex={0}
            className="mt-[var(--section-stack)] flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 outline-none [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40 focus-visible:ring-offset-2 [&::-webkit-scrollbar]:hidden"
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                scrollByDir(-1);
              }
              if (e.key === "ArrowRight") {
                e.preventDefault();
                scrollByDir(1);
              }
            }}
          >
            {vehicles.map((v) => (
              <article
                key={v.id}
                className="w-[min(100%,18.5rem)] shrink-0 snap-start sm:w-[min(100%,20rem)] lg:w-[min(100%,21rem)]"
              >
                <Link
                  href={`/veiculo/${v.slug}`}
                  className="group block h-full"
                  aria-label={`Ver detalhes de ${v.brand} ${v.model} ${v.year}`}
                >
                  <Card className="card-lift flex h-full flex-col overflow-hidden border-[var(--color-line)] bg-white/85 shadow-[0_8px_18px_rgba(12,15,20,0.05)] transition-[border-color] group-hover:border-[var(--color-accent)]/35">
                    <div className="relative aspect-[16/10] bg-[var(--color-paper-dark)]">
                      {v.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={v.imageUrl} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-[var(--color-ink-muted)]">Sem foto</div>
                      )}
                      {v.isPromotion ? (
                        <span className="absolute left-2 top-2">
                          <Badge tone="accent">Promoção</Badge>
                        </span>
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col space-y-1.5 p-4">
                      <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-[var(--color-ink-muted)]">
                        {categoryLabel(v.category)} · {v.year}
                      </p>
                      <p className="line-clamp-2 text-base font-semibold leading-snug text-[var(--color-ink)]">
                        {v.brand} {v.model}
                      </p>
                      <p className="text-xl font-bold text-[var(--color-accent)]">{formatBRLFromCents(v.priceCents)}</p>
                      <p className="text-xs text-[var(--color-ink-muted)]">
                        {formatKm(v.mileageKm)} · {v.fuel}
                      </p>
                      <p className="mt-auto pt-2 text-xs font-semibold text-[var(--color-accent)] group-hover:underline">Ver detalhes</p>
                    </div>
                  </Card>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m15 6-6 6 6 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}
