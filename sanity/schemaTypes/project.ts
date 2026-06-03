import { defineField, defineType } from "sanity";
import { PackageIcon } from "@sanity/icons";


export const projectSchema = defineType({
  name: "project",
  title: "Projet",
  type: "document",
  icon: PackageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {source: "title"},
    }),
  ],
})
