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
      <Container className="relative py-20 sm:py-28">
        <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-paper)]/70">
          {content.eyebrow}
        </p>
        <h1 className="animate-fade-up mt-4 max-w-3xl font-[family-name:var(--font-syne)] text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {content.title}
        </h1>
        <p className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-paper)]/85">
          {content.subtitle}
        </p>
        <div className="animate-fade-up mt-10 flex flex-wrap gap-3">
          <a href={whatsappHref("Olá, quero falar com a Granvel.")}>
            <Button size="lg" className="w-full sm:w-auto">
              {content.primaryCta}
            </Button>
          </a>
          <Link href="/inventory">
            <Button variant="secondary" size="lg" className="w-full border-white/20 bg-white/10 text-white hover:bg-white/15 sm:w-auto">
              {content.secondaryCta}
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
