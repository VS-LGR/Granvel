import type { SupabaseClient } from "@supabase/supabase-js";
import type { VehicleRow } from "@/lib/types/vehicle";
import { toVehicleCardData, type VehicleCardData } from "@/lib/types/vehicle";

function normalizeRow(raw: Record<string, unknown>): VehicleRow {
  const imageUrls = raw.image_urls;
  let urls: string[] | null = null;
  if (Array.isArray(imageUrls)) {
    urls = imageUrls.filter((u): u is string => typeof u === "string");
  } else if (typeof imageUrls === "string") {
    try {
      const parsed = JSON.parse(imageUrls) as unknown;
      if (Array.isArray(parsed)) {
        urls = parsed.filter((u): u is string => typeof u === "string");
      }
    } catch {
      urls = null;
    }
  }

  return {
    id: String(raw.id),
    slug: String(raw.slug),
    brand: String(raw.brand),
    model: String(raw.model),
    year: Number(raw.year),
    price_cents: Number(raw.price_cents),
    mileage_km: Number(raw.mileage_km),
    fuel: String(raw.fuel),
    transmission: String(raw.transmission),
    category: String(raw.category),
    description: raw.description == null ? null : String(raw.description),
    image_urls: urls,
    is_featured_month: Boolean(raw.is_featured_month),
    is_promotion: Boolean(raw.is_promotion),
    published: Boolean(raw.published),
    created_at: String(raw.created_at),
    updated_at: String(raw.updated_at),
    created_by: raw.created_by == null ? null : String(raw.created_by),
  };
}

export async function fetchPublishedVehicles(
  supabase: SupabaseClient,
): Promise<VehicleRow[]> {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map((row) => normalizeRow(row as Record<string, unknown>));
}

export async function fetchPublishedVehiclesForStaff(
  supabase: SupabaseClient,
): Promise<VehicleRow[]> {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map((row) => normalizeRow(row as Record<string, unknown>));
}

export async function fetchVehicleById(
  supabase: SupabaseClient,
  id: string,
): Promise<VehicleRow | null> {
  const { data, error } = await supabase.from("vehicles").select("*").eq("id", id).maybeSingle();
  if (error || !data) return null;
  return normalizeRow(data as Record<string, unknown>);
}

export async function fetchVehicleBySlug(
  supabase: SupabaseClient,
  slug: string,
): Promise<VehicleRow | null> {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error || !data) return null;
  return normalizeRow(data as Record<string, unknown>);
}

export async function fetchFeaturedVehicle(
  supabase: SupabaseClient,
): Promise<VehicleRow | null> {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("published", true)
    .eq("is_featured_month", true)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;
  return normalizeRow(data as Record<string, unknown>);
}

export async function fetchPromotionVehicles(
  supabase: SupabaseClient,
): Promise<VehicleCardData[]> {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("published", true)
    .eq("is_promotion", true)
    .order("price_cents", { ascending: true });

  if (error || !data) return [];
  return data.map((row) => toVehicleCardData(normalizeRow(row as Record<string, unknown>)));
}

export function mapRowsToCards(rows: VehicleRow[]): VehicleCardData[] {
  return rows.map(toVehicleCardData);
}
