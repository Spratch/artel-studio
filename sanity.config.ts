"use client";

import {
  DatabaseIcon,
  DocumentsIcon,
  SortIcon,
  VideoIcon
} from "@sanity/icons";
import { frFRLocale } from "@sanity/locale-fr-fr";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { muxInput } from "sanity-plugin-mux-input";
import { structureTool } from "sanity/structure";
import { defaultDocumentNode } from "./sanity/config/defaultDocumentNode";
import { dataStructure } from "./sanity/dataStructure";
import { apiVersion, dataset, projectId, title } from "./sanity/env";
import { listDocs, schema, singltetonDocs } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const vision = process.env.NODE_ENV === "development" ? visionTool() : null;
const tools = [
  structureTool({
    structure,
    defaultDocumentNode,
    name: "site",
    title: "Site",
    icon: DocumentsIcon
  }),
  structureTool({
    structure: dataStructure,
    defaultDocumentNode,
    name: "content",
    title: "Contenus",
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
];

const config = defineConfig({
  projectId,
  dataset,
  apiVersion,
  name: title,
  title: "Artel Studio",
  basePath: "/admin",
  plugins: vision ? [...tools, vision] : [...tools],
  tools: (prev) =>
    prev.sort((a) => {
      if (a.name === "site") return -1;
      return 1;
    }),
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (
        creationContext.type === "global" ||
        creationContext.type === "document"
      ) {
        const listDocuments = listDocs.map((doc) => doc.name);
        return prev.filter((item) =>
          (listDocuments as string[]).includes(item.templateId)
        );
      }
      return prev;
    },
    actions: (prev, context) => {
      const singletonDocuments: string[] = singltetonDocs.map(
        (doc) => doc.name
      );
      if (singletonDocuments.includes(context.schemaType)) {
        return prev.filter((action) => action.action !== "duplicate");
      } else {
        return prev;
      }
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
                  icon: SortIcon,
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
