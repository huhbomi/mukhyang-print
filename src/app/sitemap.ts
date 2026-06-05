import { SITE_URL } from "@/lib/site-url";
import type { MetadataRoute } from "next";

const SITEMAP_PATHS = [
  "/",
  "/company/greeting",
  "/company/location",
  "/product/business-card",
  "/product/catalog",
  "/product/leaflet",
  "/product/sticker",
  "/product/flyer",
  "/product/envelope",
  "/portfolio",
  "/inquiry",
  "/customer/notice",
  "/privacy",
  "/terms",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));
}
