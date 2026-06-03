import { defineConfig, InputProps } from "sanity";
import { structureTool } from "sanity/structure";

import { defaultDocumentNode } from "./sanity/config/deskStructure";
import { apiVersion, dataset, projectId, title } from "./sanity/env";
import { listDocs, schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

import { MicrophoneIcon } from "@sanity/icons";
import { frFRLocale } from "@sanity/locale-fr-fr";
import { ReactNode } from "react";
import { muxInput } from "sanity-plugin-mux-input";

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
                title: "Audios et vidéos",
                icon: MicrophoneIcon
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
        }
    },
    schema,
    form: {
        components: {
            input: (
                props: InputProps & {
                    groups?: Array<{ name: string }>;
                    renderDefault: (props: InputProps) => ReactNode;
                }
            ) => {
                if (Array.isArray(props.groups) && props.groups.length > 0) {
                    if (props.groups[0].name === "all-fields") {
                        props.groups.shift();
                    }
                }
                return props.renderDefault(props);
            }
        }
    },
    releases: { enabled: false },
    scheduledDrafts: { enabled: false },
    tasks: { enabled: false },
    scheduledPublishing: { enabled: false }
});

export default config;
