import {
  BlockContentIcon,
  CaseIcon,
  InfoOutlineIcon,
  PackageIcon
} from "@sanity/icons";
import {
  ALL_FIELDS_GROUP,
  defineArrayMember,
  defineField,
  defineType,
  SanityDocument
} from "sanity";
import slugify from "slugify";
import { getClient } from "../config/client-config";

async function asyncSlugifier(input: string) {
  const clientSlug = await getClient().fetch(
    '*[_type=="client" && _id == $clientRef][0].slug.current',
    { clientRef: input }
  );
  const slug = slugify(clientSlug);
  const query = 'count(*[_type=="project" && slug.current == $slug]{_id})';
  return getClient()
    .fetch(query, { slug })
    .then((count) => {
      if (count > 0) {
        return `${slug}-${count + 1}`;
      }
      return slug;
    });
}

export const projectSchema = defineType({
  name: "project",
  title: "Projet",
  type: "document",
  icon: PackageIcon,
  groups: [
    {
      name: "infos",
      title: "Informations",
      default: true,
      icon: InfoOutlineIcon
    },
    {
      name: "page",
      title: "Page",
      icon: BlockContentIcon
    },
    {
      ...ALL_FIELDS_GROUP,
      hidden: true
    }
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      description:
        "Titre long, pas le nom du client. Ne pas terminer par un point.",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: ["infos"]
    }),
    defineField({
      name: "client",
      title: "Client",
      description: "Nom du client",
      type: "reference",
      to: [{ type: "client" }],
      validation: (Rule) => Rule.required(),
      group: "infos"
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "Identifiant unique du projet apparaissant dans l'url. Cliquer sur Générer après avoir renseigné le nom du client.",
      type: "slug",
      options: {
        source: (doc) =>
          (doc as SanityDocument & { client: { _ref: string } }).client._ref,
        slugify: asyncSlugifier
      },
      group: "infos"
    }),
    defineField({
      name: "subtitle",
      title: "Sous-titre",
      description:
        "Courte description du projet ou du client. Ne pas terminer par un point.",
      type: "string",
      placeholder: "par ex. Fermes-relais de priximité",
      group: "infos"
    }),
    defineField({
      name: "date",
      title: "Date",
      description: "Année de publication du projet (YYYY)",
      type: "date",
      options: {
        dateFormat: "YYYY"
      },
      validation: (Rule) => Rule.required(),
      group: "infos"
    }),
    defineField({
      name: "cover",
      title: "Image de couverture",
      description:
        "L'image utilisée sur les vignettes, en haut de la page projet, et sur les réseaux sociaux",
      type: "imageAlt",
      validation: (Rule) => Rule.required(),
      group: "infos"
    }),
    defineField({
      name: "credits",
      title: "Crédits",
      description: "",
      type: "array",
      of: [
        defineArrayMember({
          name: "credit",
          title: "Crédit",
          type: "object",
          icon: CaseIcon,
          fields: [
            defineField({
              name: "service",
              title: "Service",
              type: "string",
              placeholder: "par ex. Direction artistique",
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: "contributors",
              title: "Personnes",
              type: "array",
              of: [
                defineArrayMember({
                  name: "person",
                  title: "Personne",
                  type: "reference",
                  to: [{ type: "person" }]
                })
              ],
              validation: (Rule) => Rule.required().min(1)
            })
          ],
          preview: {
            select: {
              title: "service",
              contributor0: "contributors.0.name",
              contributor1: "contributors.1.name"
            },
            prepare: (value) => ({
              title: value.title,
              subtitle:
                value.contributor0 +
                (value.contributor1 ? `, ${value.contributor1}` : "")
            })
          }
        })
      ],
      group: "infos"
    }),
    defineField({
      name: "typefaces",
      title: "Typographies",
      type: "array",
      of: [
        defineArrayMember({
          name: "typeface",
          title: "Typographie",
          type: "reference",
          to: [{ type: "typeface" }]
        })
      ],
      group: "infos"
    }),
    defineField({
      name: "services",
      title: "Services",
      description: "Liste des services vendus sur ce projet",
      type: "tags",
      options: {
        includeFromReference: "service",
        customLabel: "name",
        customValue: "slug"
      },
      validation: (Rule) => Rule.required().min(1),
      group: "infos"
    })
  ]
});
