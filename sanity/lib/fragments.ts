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
  cover,
  "tags": services[]->{
    name
  },
  "client": client->{
    name,
    logo
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
  "button": button{
    label,
    "page": page->{
      "title": coalesce(title, name),
      "slug": select(
        _type == "project" => "projet/" + slug.current,
        title != null => slug.current,
        name != null => "services/" + slug.current,
      )
    },
    position
  },
  "description": description{
    layout,
    "col1": column1${customBlockFragment},
    "col2": column2${customBlockFragment},
    "col3": column3${customBlockFragment},
  },
  contentType,
  "content": select(
    contentType == "medias" => {
      "type": "medias",
      "medias": medias[]
    },
    contentType == "reviews" => {
      "type": "reviews",
      "settings": coalesce(reviewsObject.settings, {
        "direction": "mixed",
        "speedRange": {"min":26,"max":46},
        "gapRange": {"min":20,"max":96}
      }),
      "reviews": reviewsObject.reviews[]->{
        "person": person->{
          name,
          position,
        },
        "client": client->name,
        ${slugFragment},
        "text": text${customBlockFragment}
      }
    },
    contentType == "projects" => {
      "type": "projects",
      "projects": projects[]->${projectThumbnailFragment}
    },
    contentType == "services" => {
      "type": "services",
      "services": coalesce(
        services[]->{
          name,
          ${slugFragment}
        },
        *[_type == "service" && !(_id == ^._id)]{
          name,
          ${slugFragment}
        }
      )
    }
  )
}`;

// && hasPage == true
