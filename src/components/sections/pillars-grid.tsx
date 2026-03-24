import { homeContent } from "@/config/site-content";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export type PillarsGridProps = {
  content: typeof homeContent.pillars;
};

export function PillarsGrid({ content }: PillarsGridProps) {
  return (
    <section className="py-[var(--section-y)]">
      <Container>
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-gradient-to-br from-white to-[var(--color-paper-dark)]/32 p-7 sm:p-9">
          <h2 className="max-w-xl font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight text-[var(--color-ink)]">
            {content.title}
          </h2>
          <div className="mt-3 h-px w-14 bg-[var(--color-accent)]/35" aria-hidden />
          <div className="mt-[var(--section-stack)] grid gap-8 md:grid-cols-3">
            {content.items.map((item) => (
              <Card
                key={item.title}
                className="card-lift border-[var(--color-line)] bg-gradient-to-b from-white to-[var(--color-paper)]/60 p-6 shadow-[0_8px_18px_rgba(12,15,20,0.05)]"
              >
                <h3 className="text-lg font-semibold text-[var(--color-ink)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)]">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
