/** Parse valores enviados pelo formulário de veículo (texto formatado pt-BR ou número simples). */

export function parsePriceReaisField(raw: unknown): number {
  const s = String(raw ?? "").trim();
  if (!s) return NaN;
  const noCurrency = s.replace(/\s/g, "").replace(/R\$\s?/gi, "");
  if (/^\d+(\.\d{1,2})?$/.test(noCurrency)) return Number(noCurrency);
  if (noCurrency.includes(",")) {
    return Number(noCurrency.replace(/\./g, "").replace(",", "."));
  }
  const onlyDots = noCurrency.replace(/\./g, "");
  return Number(onlyDots);
}

export function parseMileageKmField(raw: unknown): number {
  const s = String(raw ?? "").trim().replace(/\s/g, "");
  if (!s) return NaN;
  if (/^\d+$/.test(s)) return Number(s);
  const digits = s.replace(/\D/g, "");
  return digits === "" ? NaN : Number(digits);
}
