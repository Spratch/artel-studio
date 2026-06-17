import {
  BlockContentIcon,
  CaseIcon,
  CommentIcon,
  InfoOutlineIcon,
  TiersIcon
} from "@sanity/icons";
import {
  ALL_FIELDS_GROUP,
  defineArrayMember,
  defineField,
  defineType,
  SanityDocument
} from "sanity";
import { getClient } from "../config/client-config";
import { LayoutPickerInput } from "./objects/layoutPicker";

async function asyncSlugifier(input: string) {
  const clientSlug = await getClient().fetch(
    '*[_type=="client" && _id == $clientRef][0].slug.current',
    { clientRef: input }
  );

  const query = 'count(*[_type=="project" && slug.current == $slug]{_id})';
  return getClient()
    .fetch(query, { slug: clientSlug })
    .then((count) => {
      if (count > 0) {
        return `${clientSlug}-${count + 1}`;
      }
      return clientSlug;
    });
}

export const projectSchema = defineType({
  name: "project",
  title: "Projet",
  description:
    "Un projet peut inclure plusieurs services et un client peut être référencé dans plusieurs projets. Le site a une page dédiée pour chaque projet.",
  type: "document",
  icon: TiersIcon,
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
      group: "infos",
      validation: (Rule) => Rule.required()
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
      type: "array",
      of: [
        defineArrayMember({
          name: "service",
          title: "Service",
          type: "reference",
          to: [{ type: "service" }]
        })
      ],
      validation: (Rule) => Rule.required().min(1),
      group: "infos"
    }),
    defineField({
      name: "colors",
      title: "Couleurs du projet",
      description:
        "Couleurs utilisées pour cette page. Attention aux contrastes, prévisualiser en ouvrant un volet 'aperçu' avec l'icône en haut à droite.",
      type: "object",
      options: {
        columns: 2
      },
      fields: [
        defineField({
          name: "primary",
          title: "Couleur principale",
          description: "Fond de la page",
          type: "colorRef",
          initialValue: { _ref: "R4ugbcAV6zqTaKrvgR7o1y" },
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: "secondary",
          title: "Couleur secondaire",
          description: "Texte et éléments graphiques",
          type: "colorRef",
          initialValue: { _ref: "R4ugbcAV6zqTaKrvgRLdgC" },
          validation: (Rule) => Rule.required()
        })
      ],
      group: "page"
    }),
    defineField({
      name: "pageContent",
      title: "Contenu de la page",
      description: "Éditer le contenu de la page rangée par rangée",
      type: "array",
      group: "page",
      of: [
        defineArrayMember({
          name: "row",
          title: "Rangée",
          description:
            "Éditer le contenu de la rangée dans une grille de 3 colonnes",
          type: "object",
          preview: {
            select: {
              layout: "layout",
              element1: "elements.0._type",
              element2: "elements.1._type",
              first: "elements.0",
              reviewTitle: "elements.0.text.0.children.0.text",
              reviewPerson: "elements.0.person.name"
            },
            prepare: (value) => {
              const layout = value.layout || "non défini";
              const elements: string[] = [
                value.element1,
                value.element2
              ].filter(Boolean);
              const titleLayoutPrefix = `${layout.replaceAll("0", "▒ ").replaceAll("1", "▓ ").replaceAll("-", "").replaceAll("2", "▓▓\xa0")} • `;

              const elementTitle = {
                textCol: value.first.title,
                imageAlt: value.first.alt,
                review: value.reviewTitle
              };
              const elementTypes = {
                textCol: "Texte",
                imageAlt: "Image",
                review: `Témoignage (${value.reviewPerson})`
              };
              const elementMedia = {
                textCol: BlockContentIcon,
                imageAlt: value.first,
                review: CommentIcon
              };

              return {
                title: `${titleLayoutPrefix}${elementTitle[value.first._type as keyof typeof elementTitle] || value.first._type}`,
                subtitle: elements
                  ? `${elements
                      .map((el) => {
                        return (
                          elementTypes[el as keyof typeof elementTypes] || el
                        );
                      })
                      .join(
                        ", "
                      )}${value.first._type === "textCol" ? " : " + value.first.body[0].children[0].text : ""}`
                  : "Rangée vide",
                media:
                  elementMedia[value.first._type as keyof typeof elementMedia]
              };
            }
          },
          fields: [
            defineField({
              name: "layout",
              title: "Disposition",
              type: "string",
              description:
                "Choisir la disposition de la rangée. Sur petit écran, les rangées s'affichent toujours en une colonne.",
              components: {
                input: LayoutPickerInput
              },
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: "elements",
              title: "Éléments",
              type: "array",
              description:
                "Ajouter du texte ou une image dans chaque colonne de la rangée. Le nombre d'éléments doit correspondre à la disposition choisie.",
              of: [
                defineArrayMember({
                  name: "textCol",
                  title: "Texte",
                  icon: BlockContentIcon,
                  type: "object",
                  fields: [
                    defineField({
                      name: "title",
                      title: "Titre",
                      type: "string"
                    }),
                    defineField({
                      name: "body",
                      title: "Corps de texte",
                      type: "customBlock",
                      validation: (Rule) => Rule.required()
                    })
                  ],
                  preview: {
                    select: {
                      title: "title",
                      text: "body.0.children.0.text"
                    },
                    prepare: (value) => ({
                      title: value.title || "Texte sans titre",
                      subtitle: value.text
                    })
                  }
                }),
                defineArrayMember({
                  title: "Image",
                  type: "imageAlt"
                }),
                defineArrayMember({
                  name: "review",
                  title: "Témoignage",
                  type: "reference",
                  to: [{ type: "review" }]
                })
              ],

              validation: (Rule) =>
                Rule.custom((columns, context) => {
                  const layout = (
                    context.parent as { layout: string | undefined }
                  ).layout;
                  if (!layout) return true;

                  const requiredItems =
                    {
                      "3": 1,
                      "2-0": 1,
                      "0-2": 1,
                      "1-1-0": 2,
                      "0-1-1": 2,
                      "1-0-1": 2,
                      "1-1-1": 3
                    }[layout] ?? 0;

                  if (!columns || (columns as []).length !== requiredItems) {
                    return `La disposition de cette rangée nécessite exactement ${requiredItems} item${requiredItems > 1 ? "s" : ""}`;
                  }
                  return true;
                })
            })
          ]
        })
      ]
    })
  ],
  preview: {
    select: {
      title: "title",
      client: "client.name",
      cover: "cover"
    },
    prepare: (value) => ({
      title: value.title,
      subtitle: value.client,
      media: value.cover
    })
  }
});
