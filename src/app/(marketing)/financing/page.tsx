import type { Metadata } from "next";
import { financingContent } from "@/config/site-content";
import { homeContent } from "@/config/site-content";
import { CtaDual } from "@/components/sections/cta-dual";
import { FinancingContent } from "@/components/sections/financing-content";
import { PageIntro } from "@/components/sections/page-intro";
import { TrustStrip } from "@/components/sections/trust-strip";

export const metadata: Metadata = {
  title: "Facilitação e financiamento",
  description:
    "Crédito e documentação com transparência na Granvel. Etapas claras da simulação ao contrato — sem surpresas.",
};

export default function FinancingPage() {
  return (
    <>
      <PageIntro title={financingContent.title} intro={financingContent.intro} />
      <FinancingContent />
      <TrustStrip content={homeContent.trustStrip} />
      <CtaDual
        title="Próximo passo"
        body="Envie uma mensagem com o veículo de interesse e faixa de entrada — retornamos com cenários possíveis."
        primaryLabel={financingContent.primaryCta}
        secondaryLabel={financingContent.secondaryCta}
        whatsappMessage={financingContent.whatsappPrompt}
        secondaryHref="/inventory"
      />
    </>
  );
}
