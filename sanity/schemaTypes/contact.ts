import { EnvelopeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const contactSchema = defineType({
  name: "contact",
  title: "Page contact",
  type: "document",
  icon: EnvelopeIcon,
  description: "Contenu de la page contact",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      description: "Titre principal de la page contact",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "Slug de la page contact",
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
      name: "sectionColors",
      title: "Couleurs de la section",
      type: "object",
      description:
        "Sélectionner les couleurs utilisées sur cette section,\nattention aux contrastes",
      options: {
        collapsed: true,
        columns: 2
      },
      validation: (Rule) => Rule.required(),
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
        })
      ]
    }),
    defineField({
      name: "sentence",
      title: "Phrase d'accroche",
      description: "Courte phrase affichée en grand",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      type: "medias"
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
