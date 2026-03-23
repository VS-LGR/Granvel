import type { Metadata } from "next";
import {
  homeContent,
  socialProof,
} from "@/config/site-content";
import { site } from "@/config/site";
import { AboutStrip } from "@/components/sections/about-strip";
import { AuthorityBlock } from "@/components/sections/authority-block";
import { CtaDual } from "@/components/sections/cta-dual";
import { HeroHome } from "@/components/sections/hero-home";
import { PillarsGrid } from "@/components/sections/pillars-grid";
import { TrustStrip } from "@/components/sections/trust-strip";
import { VehicleGrid } from "@/components/sections/vehicle-grid";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { fetchPublishedVehicles, mapRowsToCards } from "@/lib/vehicles/queries";

const homeDescription =
  "Semi-novos curados com fotos reais, histórico transparente e condições claras — sem surpresas no fechamento.";

export const metadata: Metadata = {
  title: "Semi-novos selecionados",
  description: homeDescription,
  openGraph: {
    title: `${site.name} · Semi-novos selecionados`,
    description: homeDescription,
  },
};

export default async function HomePage() {
  const supabase = await createSupabaseServerClient();
  const rows = supabase ? await fetchPublishedVehicles(supabase) : [];
  const latest = mapRowsToCards(rows).slice(0, 6);

  return (
    <>
      <HeroHome content={homeContent.hero} />
      <AboutStrip content={homeContent.about} />
      <PillarsGrid content={homeContent.pillars} />
      <VehicleGrid title="Novidades no pátio" vehicles={latest} />
      <TrustStrip content={homeContent.trustStrip} />
      <AuthorityBlock authority={homeContent.authority} socialProof={socialProof} />
      <CtaDual
        title={homeContent.footerCta.title}
        body={homeContent.footerCta.body}
        primaryLabel={homeContent.footerCta.primaryLabel}
        secondaryLabel={homeContent.footerCta.secondaryLabel}
        whatsappMessage={homeContent.footerCta.whatsappMessage}
        secondaryHref={homeContent.footerCta.secondaryHref}
      />
    </>
  );
}
