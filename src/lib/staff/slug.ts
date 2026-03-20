export function slugifySegment(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildVehicleSlug(brand: string, model: string, year: number): string {
  const b = slugifySegment(brand);
  const m = slugifySegment(model);
  return [b, m, String(year)].filter(Boolean).join("-") || "veiculo";
}
