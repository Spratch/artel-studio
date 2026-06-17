import { ComponentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const projectsSchema = defineType({
  name: "projects",
  title: "Page Projets",
  type: "document",
  icon: ComponentIcon,
  description: "Contenu de la page projets",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      description:
        "Titre de la page projets, apparaît soit en grand sans-serif,\nsoit en petit et en serif si un sous-titre est renseigné",

      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "subtitle",
      title: "Sous-titre",
      type: "text",
      rows: 2,
      description: "Sous-titre de la section, apparaît en grand sans-serif"
    }),
    defineField({
      name: "pageColors",
      title: "Couleurs de la page",
      type: "pageColors"
    }),
    defineField({
      name: "projectsList",
      title: "Liste des projets",
      description:
        "Ajouter à la suite les différents projets à afficher sur la page. \nIl est également possible de placer des sections génériques entre des projets",
      type: "array",
      of: [
        {
          title: "Projet",
          type: "reference",
          to: [{ type: "project" }]
        },
        { type: "section" }
      ],
      options: {},
      validation: (Rule) => Rule.required().min(1)
    })
  ]
});
