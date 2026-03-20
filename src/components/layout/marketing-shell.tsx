import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export type MarketingShellProps = {
  children: ReactNode;
  banner?: ReactNode;
};

export function MarketingShell({ children, banner }: MarketingShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      {banner}
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
