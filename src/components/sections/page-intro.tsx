import { Container } from "@/components/ui/container";

export type PageIntroProps = {
  title: string;
  intro: string;
};

export function PageIntro({ title, intro }: PageIntroProps) {
  return (
    <section className="border-b border-[var(--color-line)] bg-[var(--color-paper)] py-16">
      <Container>
        <h1 className="font-[family-name:var(--font-syne)] text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-ink-muted)]">{intro}</p>
      </Container>
    </section>
  );
}
