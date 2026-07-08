import { SanityDocument } from "sanity";
import { Iframe } from "sanity-plugin-iframe-pane";
import { type DefaultDocumentNodeResolver } from "sanity/structure";

type DocType = SanityDocument & { slug: { current: string } | undefined };

const routeMap = {
  home: () => ``,
  about: (doc: DocType) => `${doc.slug ? doc.slug.current : "infos"}`,
  projects: () => `projets`,
  project: (doc: DocType) => `projets/${doc.slug ? doc.slug.current : ""}`,
  service: (doc: DocType) => `services/${doc.slug ? doc.slug.current : ""}`,
  settings: () => ``,
  legal: (doc: DocType) => `legal/${doc.slug ? doc.slug.current : ""}`
};

const getPreviewUrl = (doc: DocType, schemaType: string) => {
  const timestamp = new Date().getTime();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const routeBase = routeMap[schemaType as keyof typeof routeMap]?.(doc);
  const previewPath = `${siteUrl}/${routeBase}`;

  return `${previewPath}?preview=true&revision=${doc._rev}&timestamp=${timestamp}`;
};

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  return schemaType in routeMap
    ? S.document().views([
        S.view.form().title("Édition"),
        S.view
          .component(Iframe)
          .options({
            url: (doc: DocType) => getPreviewUrl(doc, schemaType),
            defaultSize: "desktop",
            reload: {
              button: true,
              revision: true,
              on: ["mutation"]
            }
          })
          .title("Aperçu")
      ])
    : S.document();
};
