import { homeContent, socialProof } from "@/config/site-content";
import { Container } from "@/components/ui/container";

export type AuthorityBlockProps = {
  authority: typeof homeContent.authority;
  socialProof: typeof socialProof;
};

export function AuthorityBlock({ authority, socialProof }: AuthorityBlockProps) {
  return (
    <section className="border-t border-[var(--color-line)] bg-[var(--color-ink)] py-[var(--section-y)] text-[var(--color-paper)]">
      <Container className="grid gap-14 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight">{authority.title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-paper)]/85">{authority.body}</p>
        </div>
        <figure className="rounded-[var(--radius-lg)] border border-white/10 bg-white/5 p-8">
          <blockquote className="text-lg leading-relaxed text-[var(--color-paper)]/90">{socialProof.quote}</blockquote>
          <figcaption className="mt-4 text-sm text-[var(--color-paper)]/60">{socialProof.attribution}</figcaption>
        </figure>
      </Container>
    </section>
  );
}
