import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Allow crawlers to read the global noindex metadata from app/layout.tsx.
  // Disallowing every page would prevent them from seeing that directive.
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: site.origin + "/sitemap.xml",
  };
}
