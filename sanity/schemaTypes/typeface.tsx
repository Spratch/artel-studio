import { StringIcon } from "@sanity/icons";
import Image from "next/image";
import { defineField, defineType } from "sanity";

export const typefaceSchema = defineType({
  name: "typeface",
  title: "Typographie",
  type: "document",
  icon: StringIcon,
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      description: "Nom court de la typographie",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Identifiant unique de la typographie. Cliquer sur Générer après avoir renseigné son nom.",
      options: { source: "name" },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "foundry",
      title: "Fonderie",
      description: "Éditeur de la typographie",
      type: "reference",
      to: [{ type: "foundry" }],
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: {
      title: "name",
      foundry: "foundry.name",
      link: "foundry.link"
    },
    prepare(value) {
      const domain = new URL(value.link).hostname.replace("www.", "");
      return {
        title: value.title,
        subtitle: value.foundry,
        media: value.link ? (
          <Image
            src={`https://www.google.com/s2/favicons?domain=${domain}&sz=40`}
            alt="favicon"
            width={40}
            height={40}
          />
        ) : (
          <StringIcon />
        )
      };
    }
  }
});
