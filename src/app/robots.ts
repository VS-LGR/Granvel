import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const host = site.url;
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/staff"],
      },
    ],
    sitemap: `${host}/sitemap.xml`,
  };
}
