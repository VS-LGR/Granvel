import { homeContent } from "@/config/site-content";
import { Container } from "@/components/ui/container";

export type TrustStripProps = {
  content: typeof homeContent.trustStrip;
};

export function TrustStrip({ content }: TrustStripProps) {
  return (
    <section className="py-[var(--section-y)]">
      <Container>
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white/80 p-9 sm:p-11">
          <h2 className="font-[family-name:var(--font-syne)] text-2xl font-semibold text-[var(--color-ink)]">
            {content.title}
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-3">
            {content.bullets.map((b) => (
              <li
                key={b}
                className="rounded-[var(--radius-md)] border border-dashed border-[var(--color-line)] bg-[var(--color-paper)]/80 p-4 text-sm leading-relaxed text-[var(--color-ink-muted)]"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
