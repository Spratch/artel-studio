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
      description: "Nom complet de la personne",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "Identifiant unique de la personne. Cliquer sur Générer après avoir renseigné son nom.",
      type: "slug",
      options: {
        source: "name"
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "position",
      title: "Position",
      description:
        "Renseigner la position actuelle de la personne au sein de l'entreprise",
      type: "string"
    }),
    defineField({
      name: "company",
      title: "Entreprise",
      description: "Renseigner l'entreprise actuelle",
      type: "reference",
      to: [{ type: "client" }]
    })
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "position"
    }
  }
});
