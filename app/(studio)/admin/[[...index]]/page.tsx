import "@/app/globals.css";
import config from "@/sanity.config";
import { title } from "@/sanity/env";
import type { Metadata } from "next";
import { NextStudio, metadata as studioMetadata } from "next-sanity/studio";

export const dynamic = "force-static";

export const metadata: Metadata = {
  ...studioMetadata,
  title: `${title} | Admin`,
  description: `Administration du site ${title}`
};

export default function AdminPage() {
  return (
    <html lang="fr">
      <body>
        <NextStudio config={config} />
      </body>
    </html>
  );
}
