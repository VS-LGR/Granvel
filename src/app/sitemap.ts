import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const lastModified = new Date();
  const paths = ["", "/inventory", "/highlight", "/promotions", "/financing", "/join"];

  return paths.map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
