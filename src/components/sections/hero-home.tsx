import Link from "next/link";
import { whatsappHref } from "@/config/site";
import { homeContent } from "@/config/site-content";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export type HeroHomeProps = {
  content: typeof homeContent.hero;
};

export function HeroHome({ content }: HeroHomeProps) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(900px 400px at 20% 20%, var(--color-glow), transparent 55%), radial-gradient(700px 500px at 80% 0%, rgba(246,244,239,0.12), transparent 50%)",
        }}
        aria-hidden
      />
      <Container className="relative py-[var(--section-y-hero)]">
        <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-paper)]/70">
          {content.eyebrow}
        </p>
        <h1 className="animate-fade-up mt-4 max-w-3xl font-[family-name:var(--font-syne)] text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {content.title}
        </h1>
        <p className="animate-fade-up mt-7 max-w-2xl text-lg leading-relaxed text-[var(--color-paper)]/90">
          {content.subtitle}
        </p>
        <div className="animate-fade-up mt-11 flex flex-wrap gap-4">
          <Link href="/inventory">
            <Button size="lg" className="w-full sm:w-auto">
              {content.primaryCta}
            </Button>
          </Link>
          <a href={whatsappHref("Olá, quero falar com a Granvel.")}>
            <Button
              variant="secondary"
              size="lg"
              className="w-full border-2 !border-white/45 !bg-white/15 !text-white shadow-sm backdrop-blur-sm hover:!bg-white/25 sm:w-auto"
            >
              {content.secondaryCta}
            </Button>
          </a>
        </div>
      </Container>
    </section>
  );
}
