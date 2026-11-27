import { MetadataRoute } from "next";
import { BIKES } from "@/data/bikes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const staticRoutes = ["", "/bikes", "/compare", "/search", "/about", "/contact"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1.0 : 0.8,
    })
  );

  const bikeRoutes = BIKES.map((bike) => ({
    url: `${baseUrl}/bikes/${bike.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...bikeRoutes];
}
