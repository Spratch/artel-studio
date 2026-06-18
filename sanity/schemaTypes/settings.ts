import { defineArrayMember, defineField, defineType } from "sanity";

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
          .warning("Le titre du site doit contenir moins de 60 caractères")
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Entrer la description du site",
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
      ]
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
            { type: "home" },
            { type: "about" },
            { type: "projects" },
            { type: "legal" },
            { type: "service" }
            // { type: "contact" }
          ],
          description:
            "Ajouter une page existante pour créer un lien vers cette page"
        })
      ],
      validation: (Rule) => Rule.required()
    })
  ]
});
