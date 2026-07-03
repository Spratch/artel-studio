import { InfoOutlineIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const aboutSchema = defineType({
  name: "about",
  title: "Page À propos",
  type: "document",
  icon: InfoOutlineIcon,
  description: "Contenu de la page à propos",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      description: "Titre principal de la page à propos",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "Slug de la page à propos",
      type: "slug",
      options: { source: "title" },
      readOnly: true,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "sections",
      title: "Sections",
      description:
        "Ajouter à la suite les différentes sections pour former la page d'accueil",
      type: "array",
      of: [
        { type: "section" },
        {
          name: "mediasSection",
          title: "Section médias",
          type: "mediasSection"
        }
      ]
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current"
    },
    prepare({ title, subtitle }) {
      const displaySubtitle = subtitle ? `artel-studio.com / ${subtitle}` : "";
      return {
        title: title,
        subtitle: displaySubtitle
      };
    }
  }
});
