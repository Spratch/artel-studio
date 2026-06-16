import { DocumentTextIcon } from "@sanity/icons";
import { defineType } from "sanity";

export const legalSchema = defineType({
  name: "legal",
  title: "Pages légales",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    {
      name: "title",
      title: "Titre",
      type: "string",
      description: "Entrer le titre de la page",
      validation: (Rule) =>
        Rule.required()
          .max(60)
          .warning("Le titre doit contenir moins de 60 caractères")
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Cliquer sur 'Générer' pour générer un identifiant unique pour cette page",
      options: { source: "title" },
      validation: (Rule) => Rule.required()
    },
    {
      name: "content",
      title: "Contenu",
      type: "customBlock",
      description: "Entrer le contenu de la politique de confidentialité",
      validation: (Rule) => Rule.required()
    }
  ]
});
