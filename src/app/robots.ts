import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/delete-subscription"],
    },
    sitemap: "https://www.few-letter.com/sitemap.xml",
  };
}
