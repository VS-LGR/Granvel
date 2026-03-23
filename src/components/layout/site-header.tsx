import Link from "next/link";
import { mainNav } from "@/config/navigation";
import { site, telHref, whatsappHref } from "@/config/site";
import { Logo } from "@/components/layout/logo";
import { MobileHeaderMenu } from "@/components/layout/mobile-header-menu";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-[var(--color-paper)]/90 backdrop-blur-md">
      <Container className="flex min-h-[4.5rem] items-center justify-between gap-4 py-3 lg:h-16 lg:min-h-0 lg:py-0">
        <div className="min-w-0 shrink pr-2">
          <Logo />
        </div>
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
        <div className="flex shrink-0 items-center gap-3">
          <MobileHeaderMenu />
          <a
            href={telHref()}
            className="hidden rounded-[var(--radius-md)] border border-[var(--color-line)] px-3 py-2 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-white focus-ring sm:inline-flex sm:items-center sm:justify-center"
          >
            {site.phoneDisplay}
          </a>
          <a
            href={whatsappHref()}
            className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-accent-hover)] focus-ring sm:min-h-0 sm:px-3 sm:py-2"
          >
            WhatsApp
          </a>
        </div>
      </Container>
    </header>
  );
}
