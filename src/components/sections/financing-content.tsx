import { financingContent } from "@/config/site-content";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export function FinancingContent() {
  return (
    <section className="py-16">
      <Container>
        <div className="grid gap-6 lg:grid-cols-3">
          {financingContent.steps.map((step) => (
            <Card key={step.title} className="p-6">
              <h2 className="text-lg font-semibold text-[var(--color-ink)]">{step.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)]">{step.text}</p>
            </Card>
          ))}
        </div>
        <Card className="mt-10 border-[var(--color-accent)]/25 bg-[var(--color-accent)]/5 p-8">
          <h2 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-[var(--color-ink)]">
            {financingContent.trust.title}
          </h2>
          <p className="mt-3 max-w-3xl text-[var(--color-ink-muted)]">{financingContent.trust.text}</p>
        </Card>
      </Container>
    </section>
  );
}
