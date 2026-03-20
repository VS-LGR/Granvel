const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export function formatBRLFromCents(cents: number): string {
  return brl.format(cents / 100);
}

export function formatKm(km: number): string {
  return `${new Intl.NumberFormat("pt-BR").format(km)} km`;
}
