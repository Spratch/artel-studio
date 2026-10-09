import { client } from "@/sanity/config/client-config";
import type { MetadataRoute } from "next";

const BASE_URL = "https://artel-studio.com";

type Entry = { slug: string | null; _updatedAt: string } | null;

const QUERY = `{
  "services": *[_type == "service" && hasPage == true && defined(slug.current)]{
    "slug": slug.current,
    _updatedAt
  },
  "projects": *[_type == "projects"][0].projectsList[_type == "reference"]->{
    "slug": slug.current,
    _updatedAt
  }
}`;

function toEntries(
  items: Entry[] | null,
  prefix: string,
  changeFrequency: "weekly" | "monthly",
  priority: number
): MetadataRoute.Sitemap {
  const unique = new Map<string, string>();
  for (const item of items ?? []) {
    if (item?.slug) unique.set(item.slug, item._updatedAt);
  }

  return [...unique].map(([slug, updatedAt]) => ({
    url: `${BASE_URL}/${prefix}/${slug}`,
    lastModified: updatedAt,
    changeFrequency,
    priority
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { services, projects } = await client.fetch<{
    services: Entry[] | null;
    projects: Entry[] | null;
  }>(QUERY);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/infos`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/projets`, changeFrequency: "weekly", priority: 0.5 }
  ];

  return [
    ...staticPages,
    ...toEntries(projects, "projets", "monthly", 0.7),
    ...toEntries(services, "services", "monthly", 0.7)
  ];
}
