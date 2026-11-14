import type { MetadataRoute } from "next"; import { site } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap { return ["/", "/nossa-historia/", "/produtos/", "/contato/"].map(path => ({ url: site.origin + path })); }
