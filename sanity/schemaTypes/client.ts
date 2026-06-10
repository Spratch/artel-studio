import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const clientSchema = defineType({
  name: "client",
  title: "Clients",
  icon: HomeIcon,
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      description: "Nom de l'entreprise, si possible pas trop long",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "Identifiant unique de l'entreprise, cliquer sur Générer après avoir renseigné le nom du client ci-dessus",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Logo de l'entreprise, il faut que ça rentre dans un cercle"
    })
  ],
  preview: {
    select: {
      title: "name",
      logo: "logo"
    },
    prepare: (value) => ({
      title: value.title,
      media: value.logo ?? HomeIcon
    })
  }
});
