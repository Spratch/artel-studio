import "@/app/globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getLayoutSettings, getPaletteColors } from "@/sanity/lib/getters";
import type { Metadata } from "next";
import { sagace } from "../fonts";

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

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const paletteColors = await getPaletteColors();
  return (
    <html
      lang="fr"
      className={`antialiased`}
    >
      <body className={`${sagace.className}`}>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/wuo5zvg.css"
        />
        <style>
          {`
            :root {
              ${paletteColors
                .map((color) => `--palette-${color.slug}: ${color.value};`)
                .join("\n")}
            }
          `}
        </style>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
