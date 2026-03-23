"use client";

import { useCallback, useEffect, useState } from "react";

export type VehicleGalleryCarouselProps = {
  images: string[];
  alt: string;
  variant?: "light" | "dark";
};

export function VehicleGalleryCarousel({ images, alt, variant = "light" }: VehicleGalleryCarouselProps) {
  const list = images.filter(Boolean);
  const [index, setIndex] = useState(0);
  const go = useCallback(
    (dir: -1 | 1) => {
      if (list.length <= 1) return;
      setIndex((i) => (i + dir + list.length) % list.length);
    },
    [list.length],
  );

  useEffect(() => {
    if (index >= list.length) setIndex(0);
  }, [index, list.length]);

  const isDark = variant === "dark";
  const btnClass = isDark
    ? "rounded-full border border-white/25 bg-[var(--color-ink)]/80 p-2.5 text-white shadow-md backdrop-blur-sm transition hover:bg-[var(--color-ink)] hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
    : "rounded-full border border-[var(--color-line)] bg-white/95 p-2.5 text-[var(--color-ink)] shadow-md backdrop-blur-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]";

  if (list.length === 0) {
    return (
      <div
        className={`flex aspect-[16/10] w-full items-center justify-center rounded-[var(--radius-lg)] border ${
          isDark ? "border-white/15 bg-white/5 text-[var(--color-paper)]/50" : "border-[var(--color-line)] bg-[var(--color-paper-dark)]/50 text-[var(--color-ink-muted)]"
        }`}
      >
        Sem fotos disponíveis
      </div>
    );
  }

  const current = list[index]!;

  return (
    <div
      className="space-y-4 outline-none"
      tabIndex={0}
      role="region"
      aria-roledescription="carrossel"
      aria-label={alt}
      onKeyDown={(e) => {
        if (list.length <= 1) return;
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(-1);
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(1);
        }
      }}
    >
      <div
        className={`relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-paper-dark)]/40 shadow-[var(--shadow-soft)] ${
          isDark ? "border border-white/10" : "border border-[var(--color-line)]"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={current} alt={`${alt} — foto ${index + 1} de ${list.length}`} className="aspect-[16/10] w-full object-cover" />
        {list.length > 1 ? (
          <>
            <button type="button" className={`absolute left-2 top-1/2 z-10 -translate-y-1/2 sm:left-3 ${btnClass}`} aria-label="Foto anterior" onClick={() => go(-1)}>
              <ChevronLeftIcon />
            </button>
            <button type="button" className={`absolute right-2 top-1/2 z-10 -translate-y-1/2 sm:right-3 ${btnClass}`} aria-label="Próxima foto" onClick={() => go(1)}>
              <ChevronRightIcon />
            </button>
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
              {list.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Ir para foto ${i + 1}`}
                  aria-current={i === index}
                  className={`h-2 rounded-full transition-all ${
                    i === index
                      ? "w-6 bg-[var(--color-accent)]"
                      : isDark
                        ? "w-2 bg-white/45 hover:bg-white/65"
                        : "w-2 bg-[var(--color-ink)]/30 hover:bg-[var(--color-ink)]/45"
                  }`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
      {list.length > 1 ? (
        <ul className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {list.map((src, i) => (
            <li key={`${src}-${i}`} className="shrink-0">
              <button
                type="button"
                onClick={() => setIndex(i)}
                className={`overflow-hidden rounded-[var(--radius-md)] border-2 transition ${
                  i === index
                    ? "border-[var(--color-accent)] ring-2 ring-[var(--color-accent)]/25"
                    : isDark
                      ? "border-white/15 opacity-80 hover:border-white/30 hover:opacity-100"
                      : "border-[var(--color-line)] opacity-90 hover:border-[var(--color-accent)]/40 hover:opacity-100"
                }`}
                aria-label={`Miniatura ${i + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-16 w-24 object-cover sm:h-20 sm:w-32" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
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
