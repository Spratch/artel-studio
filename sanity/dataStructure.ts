import { CaseIcon } from "@sanity/icons/Case";
import { CommentIcon } from "@sanity/icons/Comment";
import { DropIcon } from "@sanity/icons/Drop";
import { HomeIcon } from "@sanity/icons/Home";
import { StringIcon } from "@sanity/icons/String";
import { TextIcon } from "@sanity/icons/Text";
import { TiersIcon } from "@sanity/icons/Tiers";
import { UsersIcon } from "@sanity/icons/Users";
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
