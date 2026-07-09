import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const homeSchema = defineType({
  name: "home",
  title: "Page d'accueil",
  type: "document",
  icon: HomeIcon,
  description: "Contenu de la page d'accueil du site",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      description: "Titre principal de la page d'accueil",
      type: "string",
      validation: (Rule) => Rule.required(),
      hidden: true
    }),
    defineField({
      name: "intro",
      title: "Introduction",
      description: "Choisir une vidéo ou un projet récent à mettre en avant",
      type: "object",
      fields: [
        defineField({
          name: "type",
          title: "Type de contenu",
          type: "string",
          description: "Choisir si l'introduction est une vidéo ou un projet",
          options: {
            list: [
              { title: "Vidéo", value: "video" },
              { title: "Projet", value: "project" }
            ],
            layout: "dropdown"
          },
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: "video",
          title: "Vidéo de présentation",
          description:
            "Courte vidéo sans son présentant les qualités des services",
          type: "mux.video",
          hidden: ({ parent }) => parent?.type !== "video",
          validation: (Rule) =>
            Rule.custom((value, context) => {
              if (
                (context.parent as { type: string })?.type === "video" &&
                !value
              ) {
                return "Veuillez fournir une vidéo de présentation.";
              }
              return true;
            })
        }),
        defineField({
          name: "projectRef",
          title: "Projet phare",
          description:
            "Sélectionner un projet à mettre en avant sur la page d'accueil",
          type: "reference",
          to: [{ type: "project" }],
          hidden: ({ parent }) => parent?.type !== "project",
          validation: (Rule) =>
            Rule.custom((value, context) => {
              if (
                (context.parent as { type: string })?.type === "project" &&
                !value
              ) {
                return "Veuillez sélectionner un projet à mettre en avant.";
              }
              return true;
            })
        })
      ],
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value?.video && !value?.projectRef) {
            return "Veuillez fournir au moins une vidéo ou un projet à mettre en avant.";
          }
          return true;
        })
    }),
    defineField({
      name: "logoColor",
      title: "Couleur du logo",
      description:
        "Choisir la couleur du gros logo placé derrière la vidéo/le projet d'intro",
      type: "colorRef"
    }),
    defineField({
      name: "pageColors",
      title: "Couleurs de la page",
      type: "pageColors"
    }),
    defineField({
      name: "sections",
      title: "Sections",
      description:
        "Ajouter à la suite les différentes sections pour former la page d'accueil",
      type: "array",
      of: [{ type: "section" }]
    })
  ]
});
