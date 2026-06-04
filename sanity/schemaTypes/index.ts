import type { SchemaPluginOptions } from "sanity";
import { clientSchema } from "./client";
import { foundrySchema } from "./foundry";
import { legalSchema } from "./legal";
import colorInput from "./objects/colorInput";
import customBlock from "./objects/customBlock";
import favicon from "./objects/favicon";
import imageAlt from "./objects/imageAlt";
import seoFields from "./objects/seoFields";
import { personSchema } from "./person";
import { projectSchema } from "./project";
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
  foundrySchema
];
const objects = [favicon, imageAlt, colorInput, customBlock, seoFields];
export const schema: SchemaPluginOptions = {
  types: [...singltetonDocs, ...listDocs, ...objects]
};
