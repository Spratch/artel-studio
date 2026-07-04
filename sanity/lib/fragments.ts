export const slugFragment = `"slug": slug.current`;
export const imageSrcFragment = `"src": coalesce(asset->url, "")`;

export const imageAltFragment = `{
  ${imageSrcFragment},
  "alt": coalesce(alt, ^.title, ""),
  crop,
  hotspot,
}`;

export const customBlockFragment = `[]{
  ...,
  markDefs[]{
    ...,
    _type == "internalLink" => {
      ...,
      "slug": *[_id == ^._ref][0].slug.current,
      "refType": *[_id == ^._ref][0]._type
    }
  }
}`;

export const projectThumbnailFragment = `{
  ${slugFragment},
  "cover": cover{
    ${imageSrcFragment},
    crop,
    hotspot
  },
  "tags": services[]->{
    name
  }
}`;

export const sectionsFragment = `"sections": sections[]{
  title,
  subtitle,
  "colors": colors{
    "backgroundColor": backgroundColor->value,
    "textColor": textColor->value,
    "buttonBgColor": buttonBgColor->value,
    "buttonFgColor": buttonFgColor->value
  },
  "description": description{
    layout,
    "col1": column1${customBlockFragment},
    "col2": column2${customBlockFragment},
    "col3": column3${customBlockFragment},
  },
  contentType,
  contentType == "project" => {
    "projects": projects[]->${projectThumbnailFragment}
  },
  contentType == "services" => {
    "services": coalesce(
      services[]->{
        name,
        ${slugFragment}
      },
      *[_type == "service" && hasPage == true && !(_id == ^._id)]{
        name,
        ${slugFragment}
      }
    )
  }
}`;
