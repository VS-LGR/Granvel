import Link from "next/link";
import { mainNav } from "@/config/navigation";
import { site, telHref, whatsappHref } from "@/config/site";
import { Logo } from "@/components/layout/logo";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-[var(--color-paper)]/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav
          className="hidden items-center gap-6 text-sm font-medium text-[var(--color-ink-muted)] lg:flex"
          aria-label="Principal"
        >
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-[var(--color-ink)] focus-ring rounded-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={telHref()}
            className="hidden rounded-[var(--radius-md)] border border-[var(--color-line)] px-3 py-2 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-white focus-ring sm:inline"
          >
            {site.phoneDisplay}
          </a>
          <a
            href={whatsappHref()}
            className="rounded-[var(--radius-md)] bg-[var(--color-accent)] px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-accent-hover)] focus-ring"
          >
            WhatsApp
          </a>
        </div>
      </Container>
      <div className="border-t border-[var(--color-line)] lg:hidden">
        <Container className="flex gap-3 overflow-x-auto py-2 text-sm font-medium text-[var(--color-ink-muted)]">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap focus-ring rounded-sm">
              {item.label}
            </Link>
          ))}
        </Container>
      </div>
    </header>
  );
}
