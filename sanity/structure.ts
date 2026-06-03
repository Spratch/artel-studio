import { ControlsIcon, DocumentsIcon, PackageIcon } from "@sanity/icons";
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
                  .child(
                      S.document().schemaType(id).documentId(id).title(title)
                  );
    };

    return S.list()
        .title("Contenus")
        .items([
            li("project", "Projets", PackageIcon, "list"),

            S.divider(),

            li("settings", "Paramètres", ControlsIcon, "singleton"),
            li("legal", "Pages légales", DocumentsIcon, "list")
        ]);
};
