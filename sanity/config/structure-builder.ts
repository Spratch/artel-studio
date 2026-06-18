import type {
  StructureBuilder,
  StructureResolverContext
} from "sanity/structure";
import { defaultDocumentNode } from "./defaultDocumentNode";

export type StructureListItemType = [
  id: string,
  title: string,
  Icon: React.ComponentType,
  type: "singleton" | "list"
];

export const sli = (
  S: StructureBuilder,
  context: StructureResolverContext,
  ...args: StructureListItemType
) => {
  const [id, title, Icon, type] = args;
  return type === "list"
    ? S.documentTypeListItem(id).icon(Icon).title(title)
    : S.listItem()
        .title(title)
        .icon(Icon)
        .child(
          (
            defaultDocumentNode(S, {
              ...context,
              schemaType: id,
              documentId: id
            }) || S.document()
          )
            .schemaType(id)
            .documentId(id)
            .title(title)
        );
};
