import type { SchemaPluginOptions } from "sanity";
import { aboutSchema } from "./about";
import { clientSchema } from "./client";
import { contactSchema } from "./contact";
import { foundrySchema } from "./foundry";
import { homeSchema } from "./home";
import { legalSchema } from "./legal";
import colorInput from "./objects/colorInput";
import { colorRef } from "./objects/colorRef";
import columns from "./objects/columns";
import customBlock from "./objects/customBlock";
import favicon from "./objects/favicon";
import imageAlt from "./objects/imageAlt";
import medias from "./objects/medias";
import mediaSection from "./objects/mediaSection";
import pageColors from "./objects/pageColors";
import section from "./objects/section";
import seoFields from "./objects/seoFields";
import { otherColorSchema } from "./otherColor";
import { paletteColorSchema } from "./paletteColor";
import { personSchema } from "./person";
import { projectSchema } from "./project";
import { projectsSchema } from "./projects";
import { reviewSchema } from "./review";
import { serviceSchema } from "./service";
import { settingsSchema } from "./settings";
import { typefaceSchema } from "./typeface";

export const singltetonDocs = [
  settingsSchema,
  homeSchema,
  aboutSchema,
  projectsSchema,
  contactSchema
];
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
  colorRef,
  section,
  columns,
  medias,
  pageColors,
  mediaSection
];
export const schema: SchemaPluginOptions = {
  types: [...singltetonDocs, ...listDocs, ...objects]
};
