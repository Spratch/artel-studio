import type { Metadata } from "next";

import config from "@/sanity.config";
import { title } from "@/sanity/env";
import { NextStudio, metadata as studioMetadata } from "next-sanity/studio";

export const dynamic = "force-static";

export const metadata: Metadata = {
  ...studioMetadata,
  title: `${title} | Admin`,
  description: `Administration du site ${title}`
};

export default function AdminPage() {
  return <NextStudio config={config} />;
}
