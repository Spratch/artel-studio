import { CaseIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const serviceSchema = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      description: "En un ou deux mots",
      placeholder: "par ex. Identité visuelle",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "Identifiant unique du service apparaissant dans l'url. Cliquer sur Générer après avoir renseigné son nom.",
      type: "slug",
      options: {
        source: "name"
      },
      validation: (Rule) => Rule.required()
    })
  ]
});
