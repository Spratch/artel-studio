import "@/app/globals.css";
import { getLayoutSettings } from "@/sanity/lib/getters";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const layoutSettings = await getLayoutSettings();
  const { title, description, favicons } = layoutSettings
    ? layoutSettings
    : {
        title: "Artel Studio",
        description: "Studio de design graphique basé à Lille",
        favicons: {
          light: "/favicon.ico",
          dark: "/favicon.ico"
        }
      };

  return {
    title,
    description,
    icons: {
      icon: [
        {
          url: favicons?.light || "/favicon.ico",
          media: "(prefers-color-scheme: dark)"
        },
        {
          url: favicons?.dark || "/favicon.ico",
          media: "(prefers-color-scheme: light)"
        }
      ]
    }
  };
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`antialiased`}
    >
      <body className="">{children}</body>
    </html>
  );
}
