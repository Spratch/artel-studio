import { HomeIcon } from "@sanity/icons";
import Image from "next/image";
import { defineField, defineType } from "sanity";

export const foundrySchema = defineType({
  name: "foundry",
  title: "Fonderie",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      description: "Nom de la fonderie",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Identifiant unique de la fonderie. Cliquer sur Générer après avoir renseigné son nom.",
      options: { source: "name" },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "link",
      title: "Lien",
      type: "url",
      description: "Lien vers le site web de la fonderie"
    })
  ],
  preview: {
    select: {
      title: "name",
      link: "link"
    },
    prepare: (value) => {
      const domain = new URL(value.link).hostname.replace("www.", "");
      return {
        title: value.title,
        subtitle: domain,
        media: value.link ? (
          <Image
            src={`https://www.google.com/s2/favicons?domain=${domain}&sz=40`}
            alt="favicon"
            width={40}
            height={40}
          />
        ) : (
          <HomeIcon />
        )
      };
    }
  }
});
