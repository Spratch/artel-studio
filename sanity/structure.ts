import {
  CaseIcon,
  ComponentIcon,
  ControlsIcon,
  DocumentsIcon,
  HomeIcon,
  InfoOutlineIcon
} from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) => {
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
    .title("Contenus")
    .items([
      li("home", "Accueil", HomeIcon, "singleton"),
      li("about", "À propos", InfoOutlineIcon, "singleton"),

      S.divider(),

      li("projects", "Page projets", ComponentIcon, "singleton"),
      li("service", "Services", CaseIcon, "list"),

      S.divider(),

      li("settings", "Paramètres", ControlsIcon, "singleton"),
      li("legal", "Pages légales", DocumentsIcon, "list")
    ]);
};
