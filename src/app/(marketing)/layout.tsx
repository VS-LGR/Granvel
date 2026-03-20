import { MarketingShell } from "@/components/layout/marketing-shell";
import { SupabaseSetupNotice } from "@/components/sections/supabase-setup-notice";
import { getSupabasePublicEnv } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const env = getSupabasePublicEnv();
  return <MarketingShell banner={env ? null : <SupabaseSetupNotice />}>{children}</MarketingShell>;
}
