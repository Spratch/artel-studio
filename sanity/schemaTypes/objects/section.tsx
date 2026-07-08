"use client";

import { getClient } from "@/sanity/config/client-config";
import {
  ArrowTopRightIcon,
  BlockContentIcon,
  BlockElementIcon,
  DropIcon,
  OlistIcon,
  StringIcon
} from "@sanity/icons";
import { Flex, Text } from "@sanity/ui";
import { useEffect, useState } from "react";
import {
  ALL_FIELDS_GROUP,
  defineArrayMember,
  defineField,
  defineType,
  ObjectInputProps
} from "sanity";

function SectionColorsInput(props: ObjectInputProps) {
  const { value, renderDefault } = props;
  const [resolvedColors, setResolvedColors] = useState<
    { id: string; color: string; _ref: string }[]
  >([]);

  useEffect(() => {
    if (!value) return;

    const entries = Object.entries(value);

    Promise.all(
      entries.map(async ([key, val]) => ({
        id: key,
        _ref: val._ref,
        color: await getClient()
          .fetch(
            '*[(_type=="otherColor" || _type=="paletteColor") && _id == $ref][0].value',
            { ref: val._ref }
          )
          .then((c) => c || "#fff")
      }))
    ).then(setResolvedColors);
  }, [value]);

  return (
    <Flex
      direction="column"
      gap={5}
      className="object-section-colors"
    >
      {resolvedColors.length > 0 && (
        <Flex
          direction="column"
          gap={4}
          align="flex-start"
        >
          <Text
            weight="medium"
            size={1}
          >
            Aperçu des couleurs
          </Text>
          <Text
            size={1}
            muted
            style={{ whiteSpace: "pre-line" }}
          >
            {
              "Pour un aperçu plus poussé, ouvrir un nouveau volet \navec le bouton en haut à droite, puis sur aperçu."
            }
          </Text>

          <div
            className="flex aspect-video h-48 flex-col justify-between rounded-[5px] bg-(--backgroundColor) p-3 text-(--textColor)"
            style={
              {
                "--backgroundColor":
                  resolvedColors.find((c) => c.id === "backgroundColor")
                    ?.color || "#fff",
                "--textColor":
                  resolvedColors.find((c) => c.id === "textColor")?.color ||
                  "#000",
                "--buttonBgColor":
                  resolvedColors.find((c) => c.id === "buttonBgColor")?.color ||
                  "#fff",
                "--buttonFgColor":
                  resolvedColors.find((c) => c.id === "buttonFgColor")?.color ||
                  "#000"
              } as React.CSSProperties
            }
          >
            <div className="flex flex-col">
              <p className="font-serif text-2xs">Titre de section</p>
              <p className="text-sm">Sous-titre de section</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex aspect-square size-6 items-center justify-center rounded-sm bg-(--buttonBgColor) text-xs text-(--buttonFgColor)">
                +
              </div>
              <p className="font-serif text-2xs">En savoir plus</p>
            </div>
          </div>
        </Flex>
      )}
      {renderDefault(props)}
    </Flex>
  );
}

const CONTENT_TYPES = [
  { title: "Projets", value: "projects" },
  { title: "Services", value: "services" },
  { title: "Témoignages", value: "reviews" },
  { title: "Méthode", value: "method" },
  { title: "Expérience", value: "experience" },
  { title: "Médias", value: "medias" }
];

export default defineType({
  name: "section",
  title: "Section",
  type: "object",
  icon: BlockElementIcon,
  groups: [
    {
      name: "texts",
      title: "Textes",
      default: true,
      icon: StringIcon
    },
    {
      name: "content",
      title: "Contenu",
      icon: BlockContentIcon
    },
    {
      name: "button",
      title: "Bouton",
      icon: ArrowTopRightIcon
    },
    {
      name: "colors",
      title: "Couleurs",
      icon: DropIcon
    },
    {
      ...ALL_FIELDS_GROUP,
      hidden: true
    }
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      description:
        "Titre de la section, apparaît soit en grand sans-serif,\nsoit en petit et en serif si un sous-titre est renseigné",
      group: "texts",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "subtitle",
      title: "Sous-titre",
      type: "text",
      rows: 2,
      description: "Sous-titre de la section, apparaît en grand sans-serif",
      group: "texts"
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "columns",
      group: "texts",
      description: "Le texte apparaissant sous le titre, en serif"
    }),
    defineField({
      name: "contentType",
      title: "Type de contenu",
      type: "string",
      description: "Choisir le type de contenu parmi les options ci-dessous",
      options: {
        list: CONTENT_TYPES,
        layout: "dropdown"
      },
      group: "content"
    }),
    defineField({
      name: "projects",
      title: "Projets",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      group: "content",
      hidden: ({ parent }) => parent?.contentType !== "projects",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (
            (context.parent as { contentType: string })?.contentType ===
              "projects" &&
            (!value || value.length === 0)
          ) {
            return "Veuillez fournir au moins un projet.";
          }
          return true;
        })
    }),
    defineField({
      name: "services",
      title: "Services",
      description:
        "Si aucun service n'est sélectionné, tous les services ayant une page dédiée seront affichés (sauf celui de la page courante)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      group: "content",
      hidden: ({ parent }) => parent?.contentType !== "services"
    }),
    defineField({
      name: "reviewsObject",
      title: "Témoignages",
      type: "object",
      group: "content",
      hidden: ({ parent }) => parent?.contentType !== "reviews",
      fields: [
        defineField({
          name: "settings",
          title: "Paramètres",
          type: "object",
          validation: (Rule) => Rule.required(),
          fields: [
            defineField({
              name: "direction",
              title: "Direction",
              description: "Définir la direction de défilement des témoignages",
              type: "string",
              options: {
                list: [
                  { value: "mixed", title: "Mixte" },
                  { value: "up", title: "Vers le haut" },
                  { value: "down", title: "Vers le bas" }
                ]
              },
              initialValue: "mixed",
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: "speedRange",
              title: "Vitesses",
              description:
                "Définir les vitesses minimales et maximales de défilement d'un cycle. En secondes. (Par défaut : 26, 46)",
              type: "object",
              options: {
                collapsed: false,
                columns: 2
              },
              fields: [
                defineField({
                  name: "min",
                  title: "Vitesse minimale",
                  type: "number",
                  initialValue: 26,
                  validation: (Rule) => Rule.min(1).required()
                }),
                defineField({
                  name: "max",
                  title: "Vitesse maximale",
                  type: "number",
                  initialValue: 46,
                  validation: (Rule) => Rule.min(1).required()
                })
              ],
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: "gapRange",
              title: "Espacements",
              description:
                "Définir les espacements minimal et maximal entre deux témoignages. 1=4px. (Par défaut : 20 (80px), 96 (384px))",
              type: "object",
              options: {
                collapsed: false,
                columns: 2
              },
              fields: [
                defineField({
                  name: "min",
                  title: "Espacement minimal",
                  type: "number",
                  initialValue: 20,
                  validation: (Rule) => Rule.min(1).required()
                }),
                defineField({
                  name: "max",
                  title: "Espacement maximal",
                  type: "number",
                  initialValue: 96,
                  validation: (Rule) => Rule.min(1).required()
                })
              ],
              validation: (Rule) => Rule.required()
            })
          ]
        }),
        defineField({
          name: "reviews",
          title: "Témoignages",
          type: "array",
          of: [
            defineArrayMember({
              type: "reference",
              to: [{ type: "review" }],
              options: {
                filter: ({ parent }) => {
                  const refs = (parent as { _ref?: string }[])
                    .map((m) => m._ref)
                    .filter(Boolean) as string[];
                  if (refs.length === 0) {
                    return { filter: "true" };
                  }
                  const refList = refs.map((id) => `"${id}"`).join(", ");

                  return {
                    filter: `!(_id in [${refList}])`
                  };
                }
              }
            })
          ],
          validation: (Rule) =>
            Rule.custom((value, context) => {
              if (
                (context.parent as { contentType: string })?.contentType ===
                  "reviews" &&
                (!value || value.length === 0)
              ) {
                return "Veuillez fournir au moins un témoignage.";
              }
              return true;
            })
        })
      ]
    }),
    defineField({
      name: "methodObject",
      title: "Méthode",
      type: "object",
      group: "content",
      hidden: ({ parent }) => parent?.contentType !== "method",
      fields: [
        defineField({
          name: "settings",
          title: "Paramètres",
          type: "object",
          validation: (Rule) => Rule.required(),
          fields: [
            defineField({
              name: "direction",
              title: "Direction",
              description: "Définir la direction de défilement des témoignages",
              type: "string",
              options: {
                list: [
                  { value: "mixed", title: "Mixte" },
                  { value: "up", title: "Vers le haut" },
                  { value: "down", title: "Vers le bas" }
                ]
              },
              initialValue: "mixed",
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: "speedRange",
              title: "Vitesses",
              description:
                "Définir les vitesses minimales et maximales de défilement d'un cycle. En secondes. (Par défaut : 26, 46)",
              type: "object",
              options: {
                collapsed: false,
                columns: 2
              },
              fields: [
                defineField({
                  name: "min",
                  title: "Vitesse minimale",
                  type: "number",
                  initialValue: 26,
                  validation: (Rule) => Rule.min(1).required()
                }),
                defineField({
                  name: "max",
                  title: "Vitesse maximale",
                  type: "number",
                  initialValue: 46,
                  validation: (Rule) => Rule.min(1).required()
                })
              ],
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: "gapRange",
              title: "Espacements",
              description:
                "Définir les espacements minimal et maximal entre deux témoignages. 1=4px. (Par défaut : 20 (80px), 96 (384px))",
              type: "object",
              options: {
                collapsed: false,
                columns: 2
              },
              fields: [
                defineField({
                  name: "min",
                  title: "Espacement minimal",
                  type: "number",
                  initialValue: 20,
                  validation: (Rule) => Rule.min(1).required()
                }),
                defineField({
                  name: "max",
                  title: "Espacement maximal",
                  type: "number",
                  initialValue: 96,
                  validation: (Rule) => Rule.min(1).required()
                })
              ],
              validation: (Rule) => Rule.required()
            })
          ]
        }),
        defineField({
          name: "method",
          title: "Méthode",
          description:
            "Définir les étapes, elles seront numérotées automatiquement",
          type: "array",
          of: [
            {
              name: "step",
              title: "Étape",
              type: "object",
              icon: OlistIcon,
              fields: [
                defineField({
                  name: "title",
                  title: "Titre",
                  type: "string",
                  validation: (Rule) => Rule.required()
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 3,
                  validation: (Rule) => Rule.required()
                })
              ]
            }
          ]
        })
      ]
    }),
    defineField({
      name: "experience",
      title: "Expériences",
      type: "array",
      of: [{ type: "reference", to: [{ type: "review" }] }],
      group: "content",
      hidden: ({ parent }) => parent?.contentType !== "experience"
    }),
    defineField({
      name: "medias",
      title: "Médias",
      type: "medias",
      group: "content",
      hidden: ({ parent }) => parent?.contentType !== "medias",
      validation: (Rule) =>
        Rule.custom((value: unknown[], context) => {
          if (
            (context.parent as { contentType: string })?.contentType ===
              "medias" &&
            (!value || value.length === 0)
          ) {
            return "Veuillez fournir au moins un média.";
          }
          return true;
        })
    }),
    defineField({
      name: "button",
      title: "Bouton",
      type: "object",
      description:
        "Ajouter un bouton à la section, pour rediriger vers une autre page",
      group: "button",
      fields: [
        defineField({
          name: "label",
          title: "Texte",
          type: "string",
          description: "Texte du bouton, court et explicite, avec un verbe",
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: "page",
          title: "Page",
          type: "reference",
          to: [
            { type: "about" },
            { type: "projects" },
            { type: "project" },
            { type: "service" }
          ],
          description: "Page du site vers laquelle le bouton redirige",
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: "position",
          title: "Position",
          type: "string",
          options: {
            list: [
              { title: "En haut à droite", value: "top" },
              { title: "En bas à gauche", value: "bottom" }
            ],
            layout: "dropdown"
          },
          validation: (Rule) => Rule.required()
        })
      ]
    }),
    defineField({
      name: "colors",
      title: "Couleurs",
      type: "object",
      description:
        "Sélectionner les couleurs utilisées sur cette section,\nattention aux contrastes, et aux accords avec les sections voisines",
      group: "colors",
      components: {
        input: SectionColorsInput
      },
      fields: [
        defineField({
          name: "backgroundColor",
          title: "Fond",
          description:
            "Couleur de fond de la section,\nattention aux accords avec les autres sections",
          type: "colorRef",
          initialValue: { _ref: "GmY8EMdQcEdG09jOJ4pWgC" },
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: "textColor",
          title: "Texte",
          description:
            "Couleur du texte de la section,\nattention au contraste avec la couleur de fond",
          type: "colorRef",
          initialValue: { _ref: "R4ugbcAV6zqTaKrvgRLdgC" },
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: "buttonBgColor",
          title: "Fond du bouton / Contours des services",
          description:
            "Couleur de fond des boutons de la section/Couleur des contours et textes des services,\nattention au contraste avec la couleur du texte du bouton",
          type: "colorRef",
          initialValue: { _ref: "R4ugbcAV6zqTaKrvgR7o1y" },
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: "buttonFgColor",
          title: "Contenu du bouton",
          description:
            "Couleur du texte et des icônes des boutons de la section,\nattention au contraste avec la couleur de fond du bouton",
          type: "colorRef",
          initialValue: { _ref: "R4ugbcAV6zqTaKrvgRLdgC" },
          validation: (Rule) => Rule.required()
        })
      ]
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      backgroundColor: "colors.backgroundColor.value",
      textColor: "colors.textColor.value",
      buttonColor: "colors.buttonBgColor.value",
      columns: "description.layout.columns",
      contentType: "contentType"
    },
    prepare(selection) {
      const {
        title,
        subtitle,
        backgroundColor,
        textColor,
        buttonColor,
        columns,
        contentType
      } = selection;
      const contentTypeTitle =
        contentType &&
        CONTENT_TYPES.find((c) => c.value === contentType)?.title;
      return {
        title,
        subtitle: `${contentTypeTitle ? `[${contentTypeTitle}] ` : ""}${subtitle || ""}`,
        media: (
          <div
            className="flex size-full flex-col items-start justify-between rounded-sm bg-(--section-bg-color) p-0.75"
            style={
              {
                "--section-bg-color": backgroundColor,
                "--section-fg-color": textColor,
                "--button-bg-color": buttonColor
              } as React.CSSProperties
            }
          >
            <div className="flex flex-col gap-0.5">
              {subtitle && (
                <span className="h-px w-1 bg-(--section-fg-color)" />
              )}
              <span className="h-0.75 w-4.5 bg-(--section-fg-color)" />
              {columns > 1 && (
                <div className="flex gap-0.5">
                  {Array.from({ length: columns }).map((_, index) => (
                    <div
                      className="flex flex-col gap-px"
                      key={index}
                    >
                      <span className="h-px w-1.5 bg-(--section-fg-color)" />
                      <span className="h-px w-1 bg-(--section-fg-color)" />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <span className="size-1.25 bg-(--button-bg-color)" />
          </div>
        )
      };
    }
  }
});
