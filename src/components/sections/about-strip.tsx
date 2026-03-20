import { homeContent } from "@/config/site-content";
import { Container } from "@/components/ui/container";

export type AboutStripProps = {
  content: typeof homeContent.about;
};

export function AboutStrip({ content }: AboutStripProps) {
  return (
    <section className="border-b border-[var(--color-line)] bg-white/40 py-16">
      <Container className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <h2 className="font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight text-[var(--color-ink)]">
          {content.title}
        </h2>
        <p className="text-lg leading-relaxed text-[var(--color-ink-muted)]">{content.body}</p>
      </Container>
    </section>
  );
}
