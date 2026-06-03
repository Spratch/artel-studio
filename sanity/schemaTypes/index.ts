import type { SchemaPluginOptions } from "sanity";
import customBlock from "./objects/customBlock";
import favicon from "./objects/favicon";
import imageAlt from "./objects/imageAlt";
import { settingsSchema } from "./settings";
import colorInput from "./objects/colorInput";
import seoFields from "./objects/seoFields";
import { projectSchema } from "./project";
import { legalSchema } from "./legal";

const singltetonDocs = [
    settingsSchema,
];
export const listDocs = [projectSchema, legalSchema];
const objects = [
    favicon,
    imageAlt,
    colorInput,
    customBlock,
    seoFields,
];
export const schema: SchemaPluginOptions = {
    types: [...singltetonDocs, ...listDocs, ...objects]
};
