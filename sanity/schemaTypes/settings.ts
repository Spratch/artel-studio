import { InfoOutlineIcon, MenuIcon } from "@sanity/icons";
import {
  ALL_FIELDS_GROUP,
  defineArrayMember,
  defineField,
  defineType
} from "sanity";

export const settingsSchema = defineType({
  name: "settings",
  title: "Paramètres",
  type: "document",
  groups: [
    {
      ...ALL_FIELDS_GROUP,
      hidden: true
    },
    {
      name: "infos",
      title: "Infos",
      icon: InfoOutlineIcon,
      default: true
    },
    {
      name: "header",
      title: "Menu de navigation",
      icon: MenuIcon
    }
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titre du site",
      description: "Titre du site affiché sur les pages et les métadonnées",
      type: "string",
      group: "infos",
      validation: (Rule) =>
        Rule.required()
          .max(60)
          .warning("Le titre du site doit contenir moins de 60 caractères")
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Entrer la description du site",
      group: "infos",
      validation: (Rule) =>
        Rule.required()
          .max(160)
          .warning(
            "La description du site doit contenir moins de 160 caractères"
          )
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "object",
      description: "Entrer les favicons à utiliser sur le site",
      options: {
        columns: 2
      },
      fields: [
        {
          name: "dark",
          title: "Foncé",
          type: "favicon",
          description:
            "Choisir le favicon foncé utilisé sur les fonds clairs (PNG)"
        },
        {
          name: "light",
          title: "Clair",
          type: "favicon",
          description:
            "Choisir le favicon clair utilisé sur les fonds sombres (PNG)"
        }
      ],
      group: "infos"
    }),
    defineField({
      name: "navigation",
      title: "Menu de navigation",
      description:
        "Renseigner les éléments composant le menu de navigation présent dans le header",
      type: "array",
      of: [
        defineArrayMember({
          name: "page",
          title: "Page",
          type: "reference",
          to: [
            { type: "about" },
            { type: "projects" },
            { type: "legal" },
            { type: "service" }
            // { type: "contact" }
          ],
          description:
            "Ajouter une page existante pour créer un lien vers cette page",
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
      group: "header",
      validation: (Rule) => Rule.required()
    })
  ]
});
