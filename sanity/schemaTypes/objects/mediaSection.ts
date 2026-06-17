import { ImagesIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "mediasSection",
  title: "Section médias",
  icon: ImagesIcon,
  type: "object",
  fields: [
    defineField({
      name: "medias",
      title: "Médias",
      type: "medias"
    })
  ],
  preview: {
    select: {
      title: "medias.0.alt",
      media: "medias.0.asset"
    }
  }
});
