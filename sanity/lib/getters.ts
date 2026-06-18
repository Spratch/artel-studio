import { queries } from "./queries";
import { withPreview } from "./withPreview";

export const getLayoutSettings = withPreview(
  () => queries.layoutSettingsQuery,
  ["settings"]
);

export const getHomePage = withPreview(() => queries.homePageQuery, ["home"]);
