import type { Metadata } from "next";
import { joinContent } from "@/config/site-content";
import { homeContent, socialProof } from "@/config/site-content";
import { AuthorityBlock } from "@/components/sections/authority-block";
import { CtaDual } from "@/components/sections/cta-dual";
import { JoinBlocks } from "@/components/sections/join-blocks";
import { PageIntro } from "@/components/sections/page-intro";
import { TrustStrip } from "@/components/sections/trust-strip";

export const metadata: Metadata = {
  title: "Venha ser Granvel",
  description:
    "Parcerias e carreiras na Granvel. Trabalhe com uma marca focada em reputação, transparência e veículos bem selecionados.",
};

export default function JoinPage() {
  return (
    <>
      <PageIntro title={joinContent.title} intro={joinContent.intro} />
      <JoinBlocks />
      <TrustStrip content={homeContent.trustStrip} />
      <AuthorityBlock authority={homeContent.authority} socialProof={socialProof} />
      <CtaDual
        title="Vamos conversar?"
        body="Conte em poucas linhas seu perfil ou proposta — direcionamos para o setor certo."
        primaryLabel={joinContent.primaryCta}
        secondaryLabel={joinContent.secondaryCta}
        whatsappMessage={joinContent.whatsappPrompt}
        secondaryHref="/"
      />
    </>
  );
}
