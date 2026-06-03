import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "imageAlt",
  title: "Image",
  type: "image",
  icon: ImageIcon,
  fields: [
    defineField({
      title: "Texte alternatif",
      name: "alt",
      type: "string",
      description: "Entrez le texte alternatif pour l'image",
      validation: (Rule) => Rule.required(),
    }),
  ],
  options: {
    hotspot: true,
  },
});
