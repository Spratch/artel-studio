"use client";

import { getClient } from "@/sanity/config/client-config";
import { BlockContentIcon, DropIcon, StringIcon } from "@sanity/icons";
import { Flex, Text } from "@sanity/ui";
import {
  ALL_FIELDS_GROUP,
  defineField,
  defineType,
  ObjectInputProps
} from "sanity";

import { useEffect, useState } from "react";

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

export default defineType({
  name: "section",
  title: "Section",
  type: "object",
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
      type: "object",
      description: "Le texte apparaissant sous le titre, en serif",
      group: "texts",
      fields: [
        defineField({
          name: "layout",
          title: "Mise en page",
          description: "Choisir le nombre de colonnes et la position du texte",
          type: "object",
          options: {
            columns: 2,
            collapsible: true,
            collapsed: true,
            modal: { type: "popover" }
          },
          fields: [
            defineField({
              name: "columns",
              title: "Colonnes",
              type: "number",
              options: {
                list: [
                  { title: "1 colonne", value: 1 },
                  { title: "2 colonnes", value: 2 },
                  { title: "3 colonnes", value: 3 }
                ],
                layout: "dropdown"
              },
              initialValue: 2,
              validation: (Rule) => Rule.required().min(1).max(3)
            }),
            defineField({
              name: "position",
              title: "Position",
              type: "string",
              options: {
                list: [
                  { title: "Haut", value: "top" },
                  { title: "Bas", value: "bottom" }
                ],
                layout: "dropdown"
              },
              initialValue: "top",
              validation: (Rule) => Rule.required()
            })
          ]
        }),
        defineField({
          name: "column1",
          title: "Colonne 1",
          type: "customBlock",
          description: "Contenu de la première colonne",
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: "column2",
          title: "Colonne 2",
          type: "customBlock",
          description: "Contenu de la deuxième colonne",
          hidden: ({ parent }) => parent?.layout.columns < 2,
          validation: (Rule) =>
            Rule.custom((value, context) => {
              if (
                (context.parent as { layout: { columns: number } })?.layout
                  .columns >= 2 &&
                !value
              ) {
                return "Veuillez fournir un contenu pour la deuxième colonne.";
              }
              return true;
            })
        }),
        defineField({
          name: "column3",
          title: "Colonne 3",
          type: "customBlock",
          description: "Contenu de la troisième colonne",
          hidden: ({ parent }) => parent?.layout.columns < 3,
          validation: (Rule) =>
            Rule.custom((value, context) => {
              if (
                (context.parent as { layout: { columns: number } })?.layout
                  .columns >= 3 &&
                !value
              ) {
                return "Veuillez fournir un contenu pour la troisième colonne.";
              }
              return true;
            })
        })
      ]
    }),
    defineField({
      name: "contentType",
      title: "Type de contenu",
      type: "string",
      description: "Choisir le type de contenu parmi les options ci-dessous",
      options: {
        list: [
          { title: "Projets", value: "projects" },
          { title: "Services", value: "services" },
          { title: "Témoignages", value: "reviews" },
          { title: "Expérience", value: "experience" },
          { title: "Image", value: "image" },
          { title: "Vidéo", value: "video" }
        ],
        layout: "dropdown"
      },
      group: "content"
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
          title: "Fond du bouton",
          description:
            "Couleur de fond des boutons de la section,\nattention au contraste avec la couleur du texte du bouton",
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
  ]
});
