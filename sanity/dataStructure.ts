import {
  CaseIcon,
  CommentIcon,
  DropIcon,
  HomeIcon,
  StringIcon,
  TextIcon,
  TiersIcon,
  UsersIcon
} from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";
import { sli, type StructureListItemType } from "./config/structure-builder";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const dataStructure: StructureResolver = (S, context) => {
  const li = (...a: StructureListItemType) =>
    sli(S, context, a[0], a[1], a[2], a[3]);

  return S.list()
    .title("Données")
    .items([
      li("project", "Projets", TiersIcon, "list"),
      li("service", "Services", CaseIcon, "list"),

      S.divider(),

      li("review", "Témoignages", CommentIcon, "list"),
      li("client", "Clients", HomeIcon, "list"),
      li("person", "Personnes", UsersIcon, "list"),

      S.divider(),

      li("paletteColor", "Palette de couleurs", DropIcon, "list"),
      li("otherColor", "Couleurs hors palette", DropIcon, "list"),

      S.divider(),

      li("typeface", "Typographies", TextIcon, "list"),
      li("foundry", "Fonderies", StringIcon, "list")
    ]);
};
