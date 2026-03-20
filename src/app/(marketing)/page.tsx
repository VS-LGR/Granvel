import {
  homeContent,
  socialProof,
} from "@/config/site-content";
import { AboutStrip } from "@/components/sections/about-strip";
import { AuthorityBlock } from "@/components/sections/authority-block";
import { CtaDual } from "@/components/sections/cta-dual";
import { HeroHome } from "@/components/sections/hero-home";
import { PillarsGrid } from "@/components/sections/pillars-grid";
import { TrustStrip } from "@/components/sections/trust-strip";
import { VehicleGrid } from "@/components/sections/vehicle-grid";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { fetchPublishedVehicles, mapRowsToCards } from "@/lib/vehicles/queries";

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
        title="Pronto para ver o carro ao vivo?"
        body="Agende uma visita ou envie suas dúvidas — respondemos com a mesma transparência do anúncio."
        primaryLabel="Chamar no WhatsApp"
        secondaryLabel="Abrir estoque"
        whatsappMessage="Quero agendar visita na Granvel."
        secondaryHref="/inventory"
      />
    </>
  );
}
