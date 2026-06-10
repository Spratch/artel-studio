import { CommentIcon } from "@sanity/icons";
import { defineField, defineType, SanityDocument } from "sanity";
import { getClient } from "../config/client-config";

async function asyncSlugifier(input: string) {
  const clientSlug = await getClient().fetch(
    '*[_type=="client" && _id == $clientRef][0].slug.current',
    { clientRef: input.split("+")[0] }
  );
  const personSlug = await getClient().fetch(
    '*[_type=="person" && _id == $personRef][0].slug.current',
    { personRef: input.split("+")[1] }
  );
  return `${clientSlug}-${personSlug}`;
}

export const reviewSchema = defineType({
  name: "review",
  title: "Témoignages",
  icon: CommentIcon,
  type: "document",
  fields: [
    defineField({
      name: "person",
      title: "Interlocuteur·ice",
      type: "reference",
      to: [{ type: "person" }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "reference",
      to: [{ type: "client" }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "Identifiant unique du témoignage, cliquer sur Générer après avoir renseigné les champs ci-dessus",
      type: "slug",
      options: {
        source: (doc) => {
          const clientRef = (
            doc as SanityDocument & { client: { _ref: string } }
          ).client._ref;
          const personRef = (
            doc as SanityDocument & { person: { _ref: string } }
          ).person._ref;
          return `${clientRef}+${personRef}`;
        },
        slugify: asyncSlugifier
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "text",
      title: "Texte",
      type: "customBlock",
      description:
        "Contenu du témoignage, mettre en gras les mots à mettre en couleur"
    })
  ],
  preview: {
    select: {
      title: "person.name",
      subtitle: "client.name"
    }
  }
});
