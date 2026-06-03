import { SchemaIcon } from "@sanity/icons";
import { Stack } from "@sanity/ui";
import { defineType, type ArrayOfObjectsInputProps } from "sanity";

function CustomBlockInput(props: ArrayOfObjectsInputProps) {
    return (
        <Stack gap={3}>
            <style>
                {`
          [data-testid="pt-editor"][data-fullscreen="false"] {
            height: 10rem;
            &:has(:focus) {
              height: 19em;
            }
          }
          [data-testid="autocomplete-popover"] {
          max-height: 50svh !important;
          }
        `}
            </style>
            <div data-testid="pt-editor-container">
                {props.renderDefault({
                    ...props,
                    initialActive: true
                })}
            </div>
        </Stack>
    );
}

export default defineType({
    name: "customBlock",
    type: "array",
    components: {
        input: CustomBlockInput
    },
    of: [
        {
            type: "block",
            marks: {
                decorators: [
                    { title: "Gras", value: "strong" },
                    { title: "Italique", value: "em" },
                    { title: "Souligné", value: "underline" }
                ],
                annotations: [
                    {
                        name: "link",
                        type: "object",
                        title: "Lien",
                        fields: [
                            {
                                name: "href",
                                type: "url",
                                validation: (Rule) =>
                                    Rule.uri({
                                        allowRelative: false,
                                        scheme: [
                                            "http",
                                            "https",
                                            "mailto",
                                            "tel"
                                        ]
                                    })
                            }
                        ]
                    },
                    {
                        name: "internalLink",
                        icon: SchemaIcon,
                        title: "Référence",
                        type: "reference",
                        to: [{ type: "project" }],
                        options: {
                            creationTypeFilter: ({}, toTypes) => {
                                return toTypes.filter(
                                    (t) =>
                                        t.type !== "research" &&
                                        t.type !== "transmission"
                                );
                            }
                        }
                    }
                ]
            }
        }
    ]
});
