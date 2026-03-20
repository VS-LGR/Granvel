"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { buildVehicleSlug } from "@/lib/staff/slug";

export async function signOutStaff(): Promise<void> {
  const supabase = await createSupabaseServerClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  redirect("/staff/login");
}

function parseImageUrls(raw: string): string[] {
  return raw
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseForm(formData: FormData) {
  const brand = String(formData.get("brand") ?? "").trim();
  const model = String(formData.get("model") ?? "").trim();
  const year = Number(formData.get("year"));
  const priceReais = Number(String(formData.get("price_reais") ?? "").replace(",", "."));
  const mileageKm = Number(formData.get("mileage_km"));
  const fuel = String(formData.get("fuel") ?? "").trim();
  const transmission = String(formData.get("transmission") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  const imageUrls = parseImageUrls(String(formData.get("image_urls") ?? ""));
  const published = formData.get("published") === "on";
  const isFeaturedMonth = formData.get("is_featured_month") === "on";
  const isPromotion = formData.get("is_promotion") === "on";

  if (!brand || !model) return { error: "Marca e modelo são obrigatórios." as const };
  if (!Number.isFinite(year) || year < 1990 || year > 2035) return { error: "Ano inválido." as const };
  if (!Number.isFinite(priceReais) || priceReais <= 0) return { error: "Preço inválido." as const };
  if (!Number.isFinite(mileageKm) || mileageKm < 0) return { error: "Quilometragem inválida." as const };
  if (!fuel || !transmission || !category) return { error: "Preencha combustível, câmbio e categoria." as const };

  const price_cents = Math.round(priceReais * 100);

  return {
    error: null as null,
    payload: {
      brand,
      model,
      year,
      price_cents,
      mileage_km: Math.round(mileageKm),
      fuel,
      transmission,
      category,
      description,
      image_urls: imageUrls,
      published,
      is_featured_month: isFeaturedMonth,
      is_promotion: isPromotion,
    },
  };
}

export async function createVehicle(
  _prev: { error: string | null },
  formData: FormData,
): Promise<{ error: string | null }> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: "Supabase não configurado." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Sessão expirada." };

  const parsed = parseForm(formData);
  if (parsed.error) return { error: parsed.error };

  const baseSlug = buildVehicleSlug(parsed.payload.brand, parsed.payload.model, parsed.payload.year);
  let slug = baseSlug;
  for (let i = 0; i < 5; i++) {
    const { data: existing } = await supabase.from("vehicles").select("id").eq("slug", slug).maybeSingle();
    if (!existing) break;
    slug = `${baseSlug}-${Math.random().toString(36).slice(2, 7)}`;
  }

  const { error } = await supabase.from("vehicles").insert({
    slug,
    brand: parsed.payload.brand,
    model: parsed.payload.model,
    year: parsed.payload.year,
    price_cents: parsed.payload.price_cents,
    mileage_km: parsed.payload.mileage_km,
    fuel: parsed.payload.fuel,
    transmission: parsed.payload.transmission,
    category: parsed.payload.category,
    description: parsed.payload.description,
    image_urls: parsed.payload.image_urls,
    published: parsed.payload.published,
    is_featured_month: parsed.payload.is_featured_month,
    is_promotion: parsed.payload.is_promotion,
    created_by: user.id,
  });

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/inventory");
  revalidatePath("/highlight");
  revalidatePath("/promotions");
  revalidatePath("/staff");
  redirect("/staff");
}

export async function updateVehicle(
  vehicleId: string,
  _prev: { error: string | null },
  formData: FormData,
): Promise<{ error: string | null }> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: "Supabase não configurado." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Sessão expirada." };

  const parsed = parseForm(formData);
  if (parsed.error) return { error: parsed.error };

  const { error } = await supabase
    .from("vehicles")
    .update({
      brand: parsed.payload.brand,
      model: parsed.payload.model,
      year: parsed.payload.year,
      price_cents: parsed.payload.price_cents,
      mileage_km: parsed.payload.mileage_km,
      fuel: parsed.payload.fuel,
      transmission: parsed.payload.transmission,
      category: parsed.payload.category,
      description: parsed.payload.description,
      image_urls: parsed.payload.image_urls,
      published: parsed.payload.published,
      is_featured_month: parsed.payload.is_featured_month,
      is_promotion: parsed.payload.is_promotion,
    })
    .eq("id", vehicleId);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/inventory");
  revalidatePath("/highlight");
  revalidatePath("/promotions");
  revalidatePath("/staff");
  redirect("/staff");
}
