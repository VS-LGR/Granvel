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
          <div className="mt-3 h-px w-14 bg-[var(--color-accent)]/35" aria-hidden />
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-paper)]/85">{authority.body}</p>
        </div>
        <figure className="rounded-[var(--radius-lg)] border border-white/10 bg-gradient-to-br from-white/8 to-white/[0.03] p-8 shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
          <blockquote className="text-lg leading-relaxed text-[var(--color-paper)]/90">{socialProof.quote}</blockquote>
          <figcaption className="mt-4 text-sm text-[var(--color-paper)]/60">{socialProof.attribution}</figcaption>
        </figure>
      </Container>
    </section>
  );
}
