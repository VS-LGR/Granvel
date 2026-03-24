import Link from "next/link";
import { whatsappHref } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export type CtaDualProps = {
  title: string;
  body: string;
  primaryLabel: string;
  secondaryLabel: string;
  whatsappMessage: string;
  secondaryHref: string;
};

export function CtaDual({
  title,
  body,
  primaryLabel,
  secondaryLabel,
  whatsappMessage,
  secondaryHref,
}: CtaDualProps) {
  return (
    <section className="py-[var(--section-y)]">
      <Container>
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-gradient-to-br from-white to-[var(--color-paper-dark)]/30 p-10 text-center shadow-[0_10px_24px_rgba(12,15,20,0.06)] sm:p-12">
          <h2 className="font-[family-name:var(--font-syne)] text-3xl font-semibold text-[var(--color-ink)]">{title}</h2>
          <div className="mx-auto mt-3 h-px w-14 bg-[var(--color-accent)]/30" aria-hidden />
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-ink-muted)]">{body}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={whatsappHref(whatsappMessage)}>
              <Button size="lg">{primaryLabel}</Button>
            </a>
            <Link href={secondaryHref}>
              <Button variant="secondary" size="lg">
                {secondaryLabel}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
