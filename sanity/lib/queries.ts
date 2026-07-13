import { defineQuery } from "next-sanity";
import {
  customBlockFragment,
  pageColorsFragment,
  projectThumbnailFragment,
  reviewFragment,
  sectionDescriptionFragment,
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
    ${pageColorsFragment},
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
      "colors": colors{
        "backgroundColor": backgroundColor->value,
        "textColor": textColor->value,
      },
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

const contactQuery = defineQuery(`*[_type == "contact"][0]{
    title,
    ${pageColorsFragment},
    sectionColors{
      "backgroundColor": backgroundColor->value,
      "textColor": textColor->value
    },
    sentence,
    gallery
}`);

const serviceQuery =
  defineQuery(`*[_type == "service" && slug.current == $slug][0]{
  name,
  ${slugFragment},
  ...select(
    hasPage == false => {
      "hasPage": false
    },
    hasPage == true => {
      "hasPage": true,
      ${pageColorsFragment},
      introTitle,
      "introduction": introduction${customBlockFragment},
      introMedia,
      "description": ${sectionDescriptionFragment},
      ${sectionsFragment}
    }
  )
}`);

const projectQuery =
  defineQuery(`*[_type == "project" && slug.current == $slug][0]{
    title,
    ${slugFragment},
    ${pageColorsFragment},
    cover,
    introduction,
    "services": services[]->{
      name,
      ${slugFragment},
      hasPage
    },
    "client": client->name,
    date,
    "credits": credits[]{
      service,
      "contributors": contributors[]->name
    },
    "typefaces": typefaces[]->{
      name,
      "foundry": foundry->name,
      "url": foundry->link
    },
    sectors,
    "pageContent": pageContent[]{
      _key,
      layout,
      "elements": elements[]{
        ...select(
          _type == "textCol" => {
              "type": "textCol",
              title,
              "body": body${customBlockFragment}
          },
          _type == "imageAlt" => {
            "type": "imageAlt",
            "imageAlt": @
          },
          (_type == "review" || _type == "reference") => {
            "type": "review",
            "review": @->${reviewFragment}
          }
        )
      }
    }
  }
`);

export const queries = {
  layoutSettingsQuery,
  homePageQuery,
  headerSettingsQuery,
  paletteColorsQuery,
  footerSettingsQuery,
  aboutQuery,
  contactQuery,
  serviceQuery,
  projectQuery
};
