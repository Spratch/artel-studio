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
      description:
        "Description de l’image pour l’accessibilité. Décrire ce qui est important à comprendre dans l’image en une phrase concise",
      validation: (Rule) => Rule.required()
    })
  ],
  options: {
    hotspot: true
  }
});
