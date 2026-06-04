import { defineField, Rule } from "@sanity/types";
import { Stack, Text } from "@sanity/ui";
import { InputProps } from "sanity";

function SeoInput(props: InputProps & { value: string | undefined }) {
  return (
    <Stack gap={3}>
      {props.renderDefault(props)}
      <Text size={1}>Caractères: {props.value?.length || 0}</Text>
    </Stack>
  );
}

export default defineField({
  name: "seoFields",
  type: "object",
  fields: [
    {
      name: "seoTitle",
      title: "Titre SEO",
      type: "string",
      description: "Entrez le titre SEO pour cette page",
      components: {
        input: SeoInput
      },
      validation: (Rule: Rule) =>
        Rule.max(60).warning(
          "Le titre SEO doit contenir moins de 60 caractères"
        )
    },
    {
      name: "seoDescription",
      title: "Description SEO",
      type: "text",
      rows: 3,
      components: {
        input: SeoInput
      },
      description: "Entrez la description SEO pour cette page",
      validation: (Rule: Rule) =>
        Rule.max(160).warning(
          "La description SEO doit contenir moins de 160 caractères"
        )
    },
    {
      name: "seoImage",
      title: "Image",
      type: "image",
      description: "Sélectionnez l'image SEO pour cette page"
    }
  ]
});
