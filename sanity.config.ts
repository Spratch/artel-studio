import { MicrophoneIcon } from "@sanity/icons";
import { frFRLocale } from "@sanity/locale-fr-fr";
import { defineConfig } from "sanity";
import { muxInput } from "sanity-plugin-mux-input";
import { tags } from "sanity-plugin-tags-v4";
import { structureTool } from "sanity/structure";
import { defaultDocumentNode } from "./sanity/config/deskStructure";
import { apiVersion, dataset, projectId, title } from "./sanity/env";
import { listDocs, schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const config = defineConfig({
  projectId,
  dataset,
  apiVersion,
  title,
  basePath: "/admin",
  plugins: [
    structureTool({ structure, defaultDocumentNode }),
    frFRLocale(),
    muxInput({
      disableUploadConfig: true,
      tool: {
        title: "Vidéos",
        icon: MicrophoneIcon
      }
    }),
    tags()
  ],
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        const listDocuments = listDocs.map((doc) => doc.name);
        return prev.filter((item) =>
          (listDocuments as string[]).includes(item.templateId)
        );
      }
      return prev;
    }
  },
  schema,
  releases: { enabled: false },
  scheduledDrafts: { enabled: false },
  tasks: { enabled: false },
  scheduledPublishing: { enabled: false }
});

export default config;
