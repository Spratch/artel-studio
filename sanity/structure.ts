import {
  CaseIcon,
  ComponentIcon,
  ControlsIcon,
  DocumentsIcon,
  EnvelopeIcon,
  HomeIcon,
  InfoOutlineIcon
} from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";
import { sli, type StructureListItemType } from "./config/structure-builder";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) => {
  const li = (...a: StructureListItemType) =>
    sli(S, context, a[0], a[1], a[2], a[3]);

  return S.list()
    .title("Site")
    .items([
      S.divider().title("Pages"),
      li("home", "Accueil", HomeIcon, "singleton"),
      li("about", "Infos", InfoOutlineIcon, "singleton"),
      li("contact", "Contact", EnvelopeIcon, "singleton"),

      S.divider(),

      li("projects", "Page projets", ComponentIcon, "singleton"),
      li("service", "Services", CaseIcon, "list"),

      S.divider().title("Général"),

      li("settings", "Paramètres", ControlsIcon, "singleton"),
      li("legal", "Pages légales", DocumentsIcon, "list")
    ]);
};
