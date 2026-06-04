import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const personSchema = defineType({
  name: "person",
  title: "Personne",
  icon: UserIcon,
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name"
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "string"
    })
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "position"
    }
  }
});
