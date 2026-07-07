import { InfoOutlineIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const aboutSchema = defineType({
  name: "about",
  title: "Page Infos",
  type: "document",
  icon: InfoOutlineIcon,
  description: "Contenu de la page Infos",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      description: "Titre principal de la page Infos",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "Slug de la page Infos",
      type: "slug",
      options: { source: "title" },
      readOnly: true,
      hidden: true,
      validation: (Rule) => Rule.required()
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
        "Ajouter à la suite les différentes sections pour former la page Infos",
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
