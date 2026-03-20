export type VehicleRow = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  price_cents: number;
  mileage_km: number;
  fuel: string;
  transmission: string;
  category: string;
  description: string | null;
  image_urls: string[] | null;
  is_featured_month: boolean;
  is_promotion: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
  created_by: string | null;
};

export type VehicleCardData = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  priceCents: number;
  mileageKm: number;
  fuel: string;
  transmission: string;
  category: string;
  imageUrl: string | null;
  isPromotion: boolean;
};

export function toVehicleCardData(row: VehicleRow): VehicleCardData {
  const urls = row.image_urls ?? [];
  return {
    id: row.id,
    slug: row.slug,
    brand: row.brand,
    model: row.model,
    year: row.year,
    priceCents: row.price_cents,
    mileageKm: row.mileage_km,
    fuel: row.fuel,
    transmission: row.transmission,
    category: row.category,
    imageUrl: urls[0] ?? null,
    isPromotion: row.is_promotion,
  };
}
