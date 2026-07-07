import { defineField, defineType } from "sanity";

export default defineType({
  name: "pageColors",
  title: "Couleurs de la page",
  description:
    "Couleurs utilisées pour cette page. Attention aux contrastes, prévisualiser en ouvrant un volet 'aperçu' avec l'icône 'Diviser le volet' en haut à droite.",
  type: "object",
  options: {
    collapsed: true,
    columns: 2
  },
  fields: [
    defineField({
      name: "primary",
      title: "Couleur principale",
      description: "Fond de la page",
      type: "colorRef",
      initialValue: { _ref: "R4ugbcAV6zqTaKrvgR7o1y" },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "secondary",
      title: "Couleur secondaire",
      description: "Texte et éléments graphiques",
      type: "colorRef",
      initialValue: { _ref: "R4ugbcAV6zqTaKrvgRLdgC" },
      validation: (Rule) => Rule.required()
    })
  ],
  validation: (Rule) => Rule.required()
});
