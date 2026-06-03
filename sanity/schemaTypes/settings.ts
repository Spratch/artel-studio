import { InlineElementIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const settingsSchema = defineType({
  name: "settings",
  title: "Paramètres",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre du site",
      description: "Titre du site affiché sur les pages et les métadonnées",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .max(60)
          .warning("Le titre du site doit contenir moins de 60 caractères"),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Entrez la description du site",
      validation: (Rule) =>
        Rule.required()
          .max(160)
          .warning(
            "La description du site doit contenir moins de 160 caractères",
          ),
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "object",
      description: "Entrez les favicons à utiliser sur le site",
      options: {
        columns: 2,
      },
      fields: [
        {
          name: "dark",
          title: "Foncé",
          type: "favicon",
          description:
            "Choisissez le favicon foncé utilisé sur les fonds clairs (PNG)",
        },
        {
          name: "light",
          title: "Clair",
          type: "favicon",
          description:
            "Choisissez le favicon clair utilisé sur les fonds sombres (PNG)",
        },
      ],
    }),
    defineField({
      name: "navigation",
      title: "Menu de navigation",
      description:
        "Renseigner les éléments composant le menu de navigation présent dans le footer",
      type: "array",
      of: [
        defineField({
          name: "item",
          title: "Item",
          description: "Un élément du menu de navigation",
          icon: InlineElementIcon,
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Titre",
              type: "string",
              description: "Le titre de l'élément du menu de navigation",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "slug",
              title: "Slug",
              type: "slug",
              options: {
                source: (_, context) =>
                  (context.parent as Record<string, unknown>).title as string,
              },
              description: "Le slug de l'élément du menu de navigation",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: "colors",
        title: "Couleurs",
        type: "object",
        description: "Entrez les couleurs à utiliser sur le site",
        fields: [
            defineField({
                name: "primary",
                title: "Couleur principale",
                type: "colorInput",
                description: "Entrez la couleur principale (textes)"
            }),
            defineField({
                name: "secondary",
                title: "Couleur secondaire",
                type: "colorInput",
                description: "Entrez la couleur secondaire (fonds)"
            })
        ]
    })
  ],
});
