import { defineField, defineType } from "sanity";

export default defineType({
  name: "columns",
  title: "Colonnes",
  type: "object",
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
              { title: "Pas de description", value: 0 },
              { title: "1 colonne", value: 1 },
              { title: "2 colonnes", value: 2 },
              { title: "3 colonnes", value: 3 }
            ],
            layout: "dropdown"
          },
          initialValue: 0,
          validation: (Rule) => Rule.required().min(0).max(3)
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
      ],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "column1",
      title: "Colonne 1",
      type: "customBlock",
      description: "Contenu de la première colonne",
      hidden: ({ parent }) => parent?.layout.columns < 1,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (
            (context.parent as { layout: { columns: number } })?.layout
              .columns >= 1 &&
            !value
          ) {
            return "Veuillez fournir un contenu pour la deuxième colonne.";
          }
          return true;
        })
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
});
