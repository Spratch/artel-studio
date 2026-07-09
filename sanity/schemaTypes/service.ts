import { CaseIcon, DocumentTextIcon, InfoOutlineIcon } from "@sanity/icons";
import { ALL_FIELDS_GROUP, defineField, defineType } from "sanity";

export const serviceSchema = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: CaseIcon,
  groups: [
    {
      name: "general",
      title: "Général",
      default: true,
      icon: InfoOutlineIcon
    },
    {
      name: "page",
      title: "Page dédiée",
      hidden: ({ value }) => !value?.hasPage,
      icon: DocumentTextIcon
    },
    {
      ...ALL_FIELDS_GROUP,
      hidden: true
    }
  ],
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      description: "En un ou deux mots",
      placeholder: "par ex. Identité visuelle",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "general"
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
      validation: (Rule) => Rule.required(),
      group: "general"
    }),
    defineField({
      name: "hasPage",
      title: "Page dédiée",
      description:
        "Cocher cette case si le service a une page dédiée sur le site web, puis compléter le contenu de la page via l'onglet 'Page dédiée'.",
      type: "boolean",
      initialValue: false,
      options: {
        layout: "switch"
      },
      group: "general"
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      description:
        "Court paragraphe introduisant le service. Mettre le nom du service en gras pour qu'il apparaisse en bleu sur le site.",
      type: "customBlock",
      group: "page"
    }),
    defineField({
      name: "introMedia",
      title: "Média d'introduction",
      description:
        "Image ou vidéo apparaissant dans la section d'introduction du service. Si il plus d'un média, ils seront affichés en carrousel.\n⚠ Ne pas abuser de la quantité de carrousels sur l'ensemble du site.",
      type: "medias",
      group: "page"
    }),
    defineField({
      name: "description",
      title: "Description",
      description:
        "Le texte apparaissant dans la section d'introduction, en serif",
      type: "columns",
      group: "page"
    }),
    defineField({
      name: "sections",
      title: "Sections",
      description:
        "Ajouter à la suite les différentes sections et médias. Celles ci apparaîtront sous la section d'introduction",
      type: "array",
      of: [
        { type: "section" },
        {
          name: "mediasSection",
          title: "Section médias",
          type: "mediasSection"
        }
      ],
      group: "page"
    })
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "introduction",
      media: "introMedia.0"
    }
  }
});
