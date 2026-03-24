import { homeContent } from "@/config/site-content";
import { Container } from "@/components/ui/container";

export type AboutStripProps = {
  content: typeof homeContent.about;
};

export function AboutStrip({ content }: AboutStripProps) {
  return (
    <section className="border-b border-[var(--color-line)] bg-white/40 py-[var(--section-y)]">
      <Container>
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-gradient-to-br from-white to-[var(--color-paper-dark)]/28 p-7 sm:p-9">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <h2 className="font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight text-[var(--color-ink)]">
                {content.title}
              </h2>
              <div className="mt-3 h-px w-14 bg-[var(--color-accent)]/30" aria-hidden />
            </div>
            <p className="text-lg leading-relaxed text-[var(--color-ink-muted)]">{content.body}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
