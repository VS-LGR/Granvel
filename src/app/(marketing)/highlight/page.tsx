import type { Metadata } from "next";
import { highlightContent } from "@/config/site-content";
import { homeContent, socialProof } from "@/config/site-content";
import { AuthorityBlock } from "@/components/sections/authority-block";
import { CtaDual } from "@/components/sections/cta-dual";
import { HighlightImmersive } from "@/components/sections/highlight-immersive";
import { TrustStrip } from "@/components/sections/trust-strip";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { fetchFeaturedVehicle } from "@/lib/vehicles/queries";

export const metadata: Metadata = {
  title: "Carro do mês",
  description:
    "Destaque Granvel com condições especiais. Veja ficha técnica, galeria e fale direto com a equipe pelo WhatsApp.",
};

export default async function HighlightPage() {
  const supabase = await createSupabaseServerClient();
  const featured = supabase ? await fetchFeaturedVehicle(supabase) : null;

  return (
    <>
      <HighlightImmersive vehicle={featured} />
      <TrustStrip content={homeContent.trustStrip} />
      <AuthorityBlock authority={homeContent.authority} socialProof={socialProof} />
      <CtaDual
        title="Buscando outro perfil?"
        body="O estoque muda rápido — envie referência de modelo e orçamento."
        primaryLabel="WhatsApp Granvel"
        secondaryLabel="Ver estoque"
        whatsappMessage={highlightContent.whatsappPrompt}
        secondaryHref="/inventory"
      />
    </>
  );
}
