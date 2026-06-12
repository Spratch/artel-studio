import type { SchemaPluginOptions } from "sanity";
import { clientSchema } from "./client";
import { foundrySchema } from "./foundry";
import { legalSchema } from "./legal";
import colorInput from "./objects/colorInput";
import { colorRef } from "./objects/colorRef";
import customBlock from "./objects/customBlock";
import favicon from "./objects/favicon";
import imageAlt from "./objects/imageAlt";
import seoFields from "./objects/seoFields";
import { otherColorSchema } from "./otherColor";
import { paletteColorSchema } from "./paletteColor";
import { personSchema } from "./person";
import { projectSchema } from "./project";
import { reviewSchema } from "./review";
import { serviceSchema } from "./service";
import { settingsSchema } from "./settings";
import { typefaceSchema } from "./typeface";

const singltetonDocs = [settingsSchema];
export const listDocs = [
  projectSchema,
  legalSchema,
  clientSchema,
  personSchema,
  serviceSchema,
  typefaceSchema,
  foundrySchema,
  reviewSchema,
  paletteColorSchema,
  otherColorSchema
];
const objects = [
  favicon,
  imageAlt,
  colorInput,
  customBlock,
  seoFields,
  colorRef
];
export const schema: SchemaPluginOptions = {
  types: [...singltetonDocs, ...listDocs, ...objects]
};
