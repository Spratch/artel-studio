export const slugFragment = `"slug": slug.current`;
export const imageSrcFragment = `"src": coalesce(asset->url, "")`;

export const imageAltFragment = `{
  ${imageSrcFragment},
  "alt": coalesce(alt, ^.title, ""),
  crop,
  hotspot,
}`;

export const customBlockFragment = `[count(children[text != ""]) > 0]{
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

export const sectionDescriptionFragment = `description{
  layout,
  "col1": column1${customBlockFragment},
  "col2": column2${customBlockFragment},
  "col3": column3${customBlockFragment},
}`;

export const reviewFragment = `{
  "person": person->{
    name,
    position,
  },
  "client": client->name,
  ${slugFragment},
  "text": text${customBlockFragment}
}`;

export const sectionsFragment = `"sections": sections[]{
  _type,
  ...select(
    _type == "mediasSection" => {
      _type,
      "medias": medias[]
    },
    _type == "section" => {
      _type,
      title,
      subtitle,
      "colors": colors{
        "backgroundColor": backgroundColor->value,
        "textColor": textColor->value,
        "servicesColor": servicesColor->value,
        "reviewsColor": reviewsColor->value,
        "experienceColor": experienceColor->value,
        "methodStepColor": methodStepColor->value,
        "methodTitleColor": methodTitleColor->value,
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
      "description": ${sectionDescriptionFragment},
      contentType,
      "content": select(
        contentType == "method" => {
          "type": "method",
          "method": methodObject.method,
          "settings": coalesce(methodObject.settings, {
            "direction": "mixed",
            "speedRange": {"min":26,"max":46},
            "gapRange": {"min":20,"max":96}
          }),
        },
        contentType == "experience" => {
          "type": "experience",
          "expCategories": experiences[]{
            title,
            "experiences": experiences[]{
              date,
              title,
              "services": services[]->name,
              description,
              "project": project->slug.current
            }
          }
        },
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
          "reviews": reviewsObject.reviews[]->${reviewFragment}
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
              ${slugFragment},
              hasPage
            },
            *[_type == "service" && !(_id == ^.^._id)]{
              name,
              ${slugFragment},
              hasPage
            }
          )
        }
      )
    }
  )
}`;

// && hasPage == true

export const pageColorsFragment = `
  "pageColors": pageColors{
    "backgroundColor": primary->{
      ${slugFragment},
      value
    },
    "textColor": secondary->{
      ${slugFragment},
      value
    },
  }
  `;
