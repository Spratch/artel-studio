import { getImageDimensions } from "@sanity/asset-utils";
import { defineType } from "@sanity/types";

export default defineType({
  name: "favicon",
  type: "image",
  options: {
    accept: "image/png",
  },
  validation: (Rule) =>
    Rule.required().custom((value) => {
      if (!value?.asset?._ref) return "Image is required";
      const { width, height } = getImageDimensions(value.asset._ref);
      if (
        !(
          (width === 16 && height === 16) ||
          (width === 32 && height === 32) ||
          (width === 48 && height === 48)
        )
      ) {
        return "L'icone doit être en 16x16px, 32x32px ou 48x48px";
      }
      return true;
    }),
});
