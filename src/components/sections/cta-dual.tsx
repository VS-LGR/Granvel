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
    <section className="py-20">
      <Container>
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-gradient-to-br from-white to-[var(--color-paper-dark)]/40 p-10 text-center shadow-[var(--shadow-soft)]">
          <h2 className="font-[family-name:var(--font-syne)] text-3xl font-semibold text-[var(--color-ink)]">{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--color-ink-muted)]">{body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
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
