import { queries } from "./queries";
import { withPreview } from "./withPreview";

export const getLayoutSettings = withPreview(
  () => queries.layoutSettingsQuery,
  ["settings"]
);

export const getHomePage = withPreview(() => queries.homePageQuery, ["home"]);

export const getHeaderSettings = withPreview(
  () => queries.headerSettingsQuery,
  ["settings"]
);

export const getPaletteColors = withPreview(
  () => queries.paletteColorsQuery,
  ["paletteColor"]
);

export const getFooterSettings = withPreview(
  () => queries.footerSettingsQuery,
  ["settings"]
);

export const getAboutPage = withPreview(() => queries.aboutQuery, ["about"]);

export const getContactPage = withPreview(
  () => queries.contactQuery,
  ["contact"]
);

export const getServicePage = withPreview(
  () => queries.serviceQuery,
  ["service"]
);

export const getProjectsPage = withPreview(
  () => queries.projectsPageQuery,
  ["projects"]
);

export const getProjectPage = withPreview(
  () => queries.projectQuery,
  ["project"]
);
