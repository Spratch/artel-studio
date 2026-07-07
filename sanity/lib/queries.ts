import { defineQuery } from "next-sanity";
import {
  pageColorsFragment,
  projectThumbnailFragment,
  sectionsFragment,
  slugFragment
} from "./fragments";

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

const paletteColorsQuery = defineQuery(`
  *[_type == "paletteColor"]{
    label,
    ${slugFragment},
    value
  }
`);

const footerSettingsQuery = defineQuery(`
    *[_type == "settings"][0]{
      footerSentence,
      "contact": contact{
        email,
        phone,
        address,
      },
      "socials": socials[]{
        name,
        url
      },
      "jobs": jobs{
        title,
        text,
        link
      }
    }
  `);

const aboutQuery = defineQuery(`*[_type == "about"][0]{
    title,
    ${pageColorsFragment},
    ${sectionsFragment}
}`);

export const queries = {
  layoutSettingsQuery,
  homePageQuery,
  headerSettingsQuery,
  paletteColorsQuery,
  footerSettingsQuery,
  aboutQuery
};
