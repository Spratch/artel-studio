import { VideoIcon } from "@sanity/icons";
import { defineType } from "sanity";

export default defineType({
  name: "medias",
  title: "Médias",
  description:
    "Ajouter images et/ou vidéos. Si il plus d'un média, ils seront affichés en carrousel.\n⚠ Ne pas abuser de la quantité de carrousels sur l'ensemble du site.",
  type: "array",
  of: [
    { type: "imageAlt" },
    {
      type: "mux.video",
      title: "Vidéo",
      icon: VideoIcon
    }
  ]
});
