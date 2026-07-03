import { defineQuery } from "next-sanity";
import { projectThumbnailFragment, sectionsFragment } from "./fragments";

const layoutSettingsQuery = defineQuery(`*[_type == "settings"][0]{
    title,
    description,
    "favicons": favicon{
      "light": light.asset->url,
      "dark": dark.asset->url,
    }
  }`);

const homePageQuery = defineQuery(`*[_type == "home"][0]{
    "intro": intro{
      type,
      "video": video{
        "playbackId": coalesce(asset->playbackId, "")
      },
      "project": projectRef->${projectThumbnailFragment},
    },
    "logoColor": logoColor->value,
    ${sectionsFragment}
  }`);

const headerSettingsQuery =
  defineQuery(`*[_type == "settings"][0].navigation[]->{
    "title": coalesce(title, name),
    "slug": select(
      title != null => slug.current,
      name != null => "services/" + slug.current,
    )
  }`);

export const queries = {
  layoutSettingsQuery,
  homePageQuery,
  headerSettingsQuery
};
