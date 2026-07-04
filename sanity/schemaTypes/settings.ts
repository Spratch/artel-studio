import {
  EarthGlobeIcon,
  InfoOutlineIcon,
  MenuIcon,
  SplitHorizontalIcon
} from "@sanity/icons";
import {
  ALL_FIELDS_GROUP,
  defineArrayMember,
  defineField,
  defineType
} from "sanity";

export const settingsSchema = defineType({
  name: "settings",
  title: "Paramètres",
  type: "document",
  groups: [
    {
      ...ALL_FIELDS_GROUP,
      hidden: true
    },
    {
      name: "infos",
      title: "Infos",
      icon: InfoOutlineIcon,
      default: true
    },
    {
      name: "header",
      title: "Menu de navigation",
      icon: MenuIcon
    },
    {
      name: "footer",
      title: "Footer",
      icon: SplitHorizontalIcon
    }
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titre du site",
      description: "Titre du site affiché sur les pages et les métadonnées",
      type: "string",
      group: "infos",
      validation: (Rule) =>
        Rule.required()
          .max(60)
          .warning("Le titre du site doit contenir moins de 60 caractères")
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Entrer la description du site",
      group: "infos",
      validation: (Rule) =>
        Rule.required()
          .max(160)
          .warning(
            "La description du site doit contenir moins de 160 caractères"
          )
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "object",
      description: "Entrer les favicons à utiliser sur le site",
      options: {
        columns: 2
      },
      fields: [
        {
          name: "dark",
          title: "Foncé",
          type: "favicon",
          description:
            "Choisir le favicon foncé utilisé sur les fonds clairs (PNG)"
        },
        {
          name: "light",
          title: "Clair",
          type: "favicon",
          description:
            "Choisir le favicon clair utilisé sur les fonds sombres (PNG)"
        }
      ],
      group: "infos"
    }),
    defineField({
      name: "navigation",
      title: "Menu de navigation",
      description:
        "Renseigner les éléments composant le menu de navigation présent dans le header",
      type: "array",
      of: [
        defineArrayMember({
          name: "page",
          title: "Page",
          type: "reference",
          to: [
            { type: "about" },
            { type: "projects" },
            { type: "legal" },
            { type: "service" }
            // { type: "contact" }
          ],
          description:
            "Ajouter une page existante pour créer un lien vers cette page",
          options: {
            filter: ({ parent }) => {
              const refs = (parent as { _ref?: string }[])
                .map((m) => m._ref)
                .filter(Boolean) as string[];
              if (refs.length === 0) {
                return { filter: "true" };
              }
              const refList = refs.map((id) => `"${id}"`).join(", ");

              return {
                filter: `!(_id in [${refList}])`
              };
            }
          }
        })
      ],
      group: "header",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "footerSentence",
      title: "Phrase du footer",
      description: "Renseigner la phrase à afficher dans le footer",
      type: "text",
      rows: 2,
      group: "footer",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "contact",
      title: "Contact",
      description:
        "Renseigner les informations de contact à afficher dans le footer",
      type: "object",
      group: "footer",
      fields: [
        defineField({
          name: "email",
          title: "Email",
          type: "string",
          description: "Adresse email de contact",
          validation: (Rule) => Rule.email().required()
        }),
        defineField({
          name: "phone",
          title: "Téléphone",
          description:
            "Formats national ou international acceptés, pas de parenthèses, de tirets ou de points",
          type: "string",
          validation: (Rule) => Rule.regex(/^(?:\+33|0)[1-9](?: ?\d{2}){4}$/)
        }),
        defineField({
          name: "address",
          title: "Adresse",
          description: "Adresse postale de contact",
          type: "text",
          rows: 2
        })
      ],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "socials",
      title: "Réseaux sociaux",
      type: "array",
      group: "footer",
      of: [
        defineArrayMember({
          type: "object",
          icon: EarthGlobeIcon,
          fields: [
            defineField({
              name: "name",
              title: "Nom",
              type: "string",
              description: "Entrez le nom du réseau social",
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              description: "Entrez l'URL du réseau social",
              validation: (Rule) => Rule.required()
            })
          ]
        })
      ],
      description: "Entrez les réseaux sociaux à afficher dans le menu du site"
    }),
    defineField({
      name: "jobs",
      title: "Offres d'emploi",
      type: "object",
      description: "Renseigner les informations pour les offres d'emploi",
      group: "footer",
      fields: [
        defineField({
          name: "title",
          title: "Titre",
          type: "string",
          description: "Titre de la section des offres d'emploi",
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: "text",
          title: "Texte",
          type: "text",
          rows: 2,
          description: "Texte de la section des offres d'emploi",
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: "link",
          title: "Lien",
          type: "url",
          description:
            "Lien vers la page des offres d'emploi (externe ou interne)"
        })
      ]
    })
  ]
});
