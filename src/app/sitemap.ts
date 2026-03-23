import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { fetchPublishedVehicles } from "@/lib/vehicles/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url.replace(/\/$/, "");
  const lastModified = new Date();
  const staticPaths = ["", "/inventory", "/highlight", "/promotions", "/financing", "/join"];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  let vehicleEntries: MetadataRoute.Sitemap = [];
  try {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const rows = await fetchPublishedVehicles(supabase);
      vehicleEntries = rows.map((v) => ({
        url: `${base}/veiculo/${v.slug}`,
        lastModified: new Date(v.updated_at),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    }
  } catch {
    /* sem Supabase em build ou offline */
  }

  return [...staticEntries, ...vehicleEntries];
}
