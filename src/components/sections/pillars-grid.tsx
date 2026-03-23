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
        <h2 className="max-w-xl font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight text-[var(--color-ink)]">
          {content.title}
        </h2>
        <div className="mt-[var(--section-stack)] grid gap-8 md:grid-cols-3">
          {content.items.map((item) => (
            <Card key={item.title} className="card-lift p-6">
              <h3 className="text-lg font-semibold text-[var(--color-ink)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)]">{item.text}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
