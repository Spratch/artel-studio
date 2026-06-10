import { DocumentsIcon, HomeIcon, StringIcon } from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const dataStructure: StructureResolver = (S) => {
  const li = (
    id: string,
    title: string,
    Icon: React.ComponentType,
    type: "singleton" | "list"
  ) => {
    return type === "list"
      ? S.documentTypeListItem(id).icon(Icon).title(title)
      : S.listItem()
          .title(title)
          .icon(Icon)
          .child(S.document().schemaType(id).documentId(id).title(title));
  };

  return S.list()
    .title("Données")
    .items([
      li("typeface", "Typographies", StringIcon, "list"),
      li("foundry", "Fonderies", HomeIcon, "list"),

      S.divider(),

      li("legal", "Pages légales", DocumentsIcon, "list")
    ]);
};
