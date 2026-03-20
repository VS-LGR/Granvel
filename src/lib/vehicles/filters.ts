import type { VehicleRow } from "@/lib/types/vehicle";
import type { VehicleCategory } from "@/config/filters";

export type InventorySearchParams = {
  category?: string;
  fuel?: string;
  transmission?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  brand?: string;
};

export function parseInventorySearchParams(
  raw: Record<string, string | string[] | undefined>,
): InventorySearchParams {
  const get = (key: string): string | undefined => {
    const v = raw[key];
    if (Array.isArray(v)) return v[0];
    return v;
  };

  const num = (key: string): number | undefined => {
    const v = get(key);
    if (v == null || v === "") return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  };

  return {
    category: get("category"),
    fuel: get("fuel"),
    transmission: get("transmission"),
    minPrice: num("minPrice"),
    maxPrice: num("maxPrice"),
    minYear: num("minYear"),
    maxYear: num("maxYear"),
    brand: get("brand"),
  };
}

export function filterVehicles(rows: VehicleRow[], filters: InventorySearchParams): VehicleRow[] {
  return rows.filter((v) => {
    if (filters.category && v.category !== filters.category) return false;
    if (filters.fuel && v.fuel !== filters.fuel) return false;
    if (filters.transmission && v.transmission !== filters.transmission) return false;
    if (filters.brand) {
      const q = filters.brand.trim().toLowerCase();
      if (!v.brand.toLowerCase().includes(q)) return false;
    }
    const priceReais = v.price_cents / 100;
    if (filters.minPrice != null && priceReais < filters.minPrice) return false;
    if (filters.maxPrice != null && priceReais > filters.maxPrice) return false;
    if (filters.minYear != null && v.year < filters.minYear) return false;
    if (filters.maxYear != null && v.year > filters.maxYear) return false;
    return true;
  });
}

export function isVehicleCategory(value: string): value is VehicleCategory {
  return (
    value === "hatch" ||
    value === "sedan" ||
    value === "suv" ||
    value === "pickup" ||
    value === "wagon" ||
    value === "coupe"
  );
}
