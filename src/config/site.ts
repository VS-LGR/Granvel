export const site = {
  name: "Granvel",
  legalName: "Granvel Veículos",
  tagline: "Semi-novos selecionados, preço justo e documentação clara.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phoneDisplay: "+55 (11) 99999-0000",
  phoneE164: "+5511999990000",
  whatsappE164: "5511999990000",
  email: "contato@granvel.com.br",
  addressLine: "Av. Exemplo, 1000 — São Paulo, SP",
  openingHours: "Seg. a sáb. · 9h às 19h",
} as const;

export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${site.whatsappE164}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function telHref(): string {
  return `tel:${site.phoneE164.replace(/\s/g, "")}`;
}
