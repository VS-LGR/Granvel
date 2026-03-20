import type { Metadata } from "next";
import { promotionsContent } from "@/config/site-content";
import { homeContent } from "@/config/site-content";
import { CtaDual } from "@/components/sections/cta-dual";
import { PageIntro } from "@/components/sections/page-intro";
import { PromotionsGrid } from "@/components/sections/promotions-grid";
import { TrustStrip } from "@/components/sections/trust-strip";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { fetchPromotionVehicles } from "@/lib/vehicles/queries";

export const metadata: Metadata = {
  title: "Promoções",
  description:
    "Veículos Granvel em condição promocional. Ofertas reais em semi-novos selecionados — confira e fale com a equipe.",
};

export default async function PromotionsPage() {
  const supabase = await createSupabaseServerClient();
  const vehicles = supabase ? await fetchPromotionVehicles(supabase) : [];

  return (
    <>
      <PageIntro title={promotionsContent.title} intro={promotionsContent.intro} />
      <PromotionsGrid vehicles={vehicles} />
      <TrustStrip content={homeContent.trustStrip} />
      <CtaDual
        title="Não encontrou a promoção ideal?"
        body="Novas campanhas entram quando o pátio permite — deixe seu recado."
        primaryLabel="Falar no WhatsApp"
        secondaryLabel="Estoque completo"
        whatsappMessage="Quero saber das próximas promoções Granvel."
        secondaryHref="/inventory"
      />
    </>
  );
}
