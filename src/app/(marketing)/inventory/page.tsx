import type { Metadata } from "next";
import { homeContent, inventoryContent } from "@/config/site-content";
import { CtaDual } from "@/components/sections/cta-dual";
import { InventoryFiltersForm } from "@/components/sections/inventory-filters-form";
import { InventoryResults } from "@/components/sections/inventory-results";
import { PageIntro } from "@/components/sections/page-intro";
import { TrustStrip } from "@/components/sections/trust-strip";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { filterVehicles, parseInventorySearchParams } from "@/lib/vehicles/filters";
import { fetchPublishedVehicles, mapRowsToCards } from "@/lib/vehicles/queries";

export const metadata: Metadata = {
  title: "Estoque",
  description:
    "Filtre semi-novos Granvel por categoria, preço e ano. Transparência e fotos reais — fale conosco se não encontrar o ideal.",
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function InventoryPage({ searchParams }: Props) {
  const sp = await searchParams;
  const filters = parseInventorySearchParams(sp);
  const supabase = await createSupabaseServerClient();
  const rows = supabase ? await fetchPublishedVehicles(supabase) : [];
  const filtered = filterVehicles(rows, filters);
  const cards = mapRowsToCards(filtered);

  return (
    <>
      <PageIntro title={inventoryContent.title} intro={inventoryContent.intro} />
      <InventoryFiltersForm initial={filters} />
      <InventoryResults vehicles={cards} />
      <TrustStrip content={homeContent.trustStrip} />
      <CtaDual
        title="Quer prioridade nas novidades?"
        body="Avise o que procura — encaixamos você na fila de chegadas e alertas de preço."
        primaryLabel="Mandar mensagem"
        secondaryLabel="Carro do mês"
        whatsappMessage={inventoryContent.whatsappPrompt}
        secondaryHref="/highlight"
      />
    </>
  );
}
