import { DropIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const paletteColorSchema = defineType({
  name: "paletteColor",
  title: "Palette",
  type: "document",
  icon: DropIcon,
  fields: [
    defineField({
      name: "label",
      title: "Nom de la couleur",
      type: "string",
      description: "Nom de la couleur, par exemple : Bleu foncé",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "Identifiant unique de la couleur. Cliquer sur Générer après avoir renseigné son nom.",
      type: "slug",
      options: {
        source: "label"
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "value",
      title: "Valeur",
      type: "colorInput",
      description:
        "Valeur de la couleur au format hexadécimal, par exemple : #003366",
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: {
      label: "label",
      value: "value"
    },
    prepare: (value) => ({
      title: value.label,
      subtitle: value.value,
      media: (
        <div
          className="flex size-full items-center justify-center bg-(--drop-color)"
          style={{ "--drop-color": value.value } as React.CSSProperties}
        />
      )
    })
  }
});
