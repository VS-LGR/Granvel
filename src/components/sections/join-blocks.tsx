import { joinContent } from "@/config/site-content";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export function JoinBlocks() {
  return (
    <section className="py-16">
      <Container>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-8">
            <h2 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-[var(--color-ink)]">
              {joinContent.partnership.title}
            </h2>
            <p className="mt-4 text-[var(--color-ink-muted)]">{joinContent.partnership.text}</p>
          </Card>
          <Card className="p-8">
            <h2 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-[var(--color-ink)]">
              {joinContent.careers.title}
            </h2>
            <p className="mt-4 text-[var(--color-ink-muted)]">{joinContent.careers.text}</p>
          </Card>
        </div>
      </Container>
    </section>
  );
}
