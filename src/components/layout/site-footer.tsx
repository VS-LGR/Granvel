import Link from "next/link";
import { mainNav } from "@/config/navigation";
import { site, telHref, whatsappHref } from "@/config/site";
import { Logo } from "@/components/layout/logo";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-paper-dark)]/60">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">{site.tagline}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-ink)]">Navegação</h2>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-ink-muted)]">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-[var(--color-ink)] focus-ring rounded-sm">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-ink)]">Contato</h2>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-ink-muted)]">
            <li>{site.addressLine}</li>
            <li>{site.openingHours}</li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-[var(--color-ink)] focus-ring rounded-sm">
                {site.email}
              </a>
            </li>
            <li>
              <a href={telHref()} className="hover:text-[var(--color-ink)] focus-ring rounded-sm">
                {site.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-ink)]">Próximo passo</h2>
          <p className="text-sm text-[var(--color-ink-muted)]">
            Fale com um especialista e agende uma visita sem compromisso.
          </p>
          <a
            href={whatsappHref("Olá, vim pelo site da Granvel.")}
            className="inline-flex rounded-[var(--radius-md)] bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)] hover:bg-[var(--color-accent-hover)] focus-ring"
          >
            Iniciar conversa
          </a>
        </div>
      </Container>
      <div className="border-t border-[var(--color-line)] py-6 text-center text-xs text-[var(--color-ink-muted)]">
        © {new Date().getFullYear()} {site.legalName}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
