"use client";

import { DatabaseIcon, DocumentsIcon, VideoIcon } from "@sanity/icons";
import { frFRLocale } from "@sanity/locale-fr-fr";
import { defineConfig } from "sanity";
import { muxInput } from "sanity-plugin-mux-input";
import { structureTool } from "sanity/structure";
import { defaultDocumentNode } from "./sanity/config/defaultDocumentNode";
import { dataStructure } from "./sanity/dataStructure";
import { apiVersion, dataset, projectId, title } from "./sanity/env";
import { listDocs, schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const config = defineConfig({
  projectId,
  dataset,
  apiVersion,
  name: title,
  title: "Artel Studio",
  basePath: "/admin",
  plugins: [
    structureTool({
      structure,
      defaultDocumentNode,
      name: "content",
      title: "Contenus",
      icon: DocumentsIcon
    }),
    structureTool({
      structure: dataStructure,
      defaultDocumentNode,
      name: "data",
      title: "Données",
      icon: DatabaseIcon
    }),
    frFRLocale(),
    muxInput({
      disableUploadConfig: true,
      tool: {
        title: "Vidéos",
        icon: VideoIcon
      }
    })
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
    },
    inspectors: (prev) =>
      prev.map((inspector) =>
        inspector.name === "sanity/structure/incoming-references"
          ? {
              ...inspector,
              useMenuItem(props) {
                return {
                  ...props,
                  title: "Références entrantes",
                  icon: DocumentsIcon,
                  showAsAction: true
                };
              }
            }
          : inspector
      ),
    comments: { enabled: false }
  },
  schema,
  releases: { enabled: false },
  scheduledDrafts: { enabled: false },
  tasks: { enabled: false },
  scheduledPublishing: { enabled: false },
  announcements: { enabled: false }
});

export default config;
