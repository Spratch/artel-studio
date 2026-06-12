import { defineType } from "sanity";

export const colorRef = defineType({
  name: "colorRef",
  type: "reference",
  to: [{ type: "paletteColor" }, { type: "otherColor" }],
  options: {
    creationTypeFilter: (_, toTypes) => {
      return toTypes.filter((t) => t.type === "otherColor");
    }
  }
});
