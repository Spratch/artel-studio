import { LAYOUTS } from "@/lib/layouts";
import {
  AboutQueryResult,
  HomePageQueryResult,
  ProjectsPageQueryResult
} from "@/sanity.types";
import { Get } from "@sanity/codegen";

export type MediaSectionType = Extract<
  Get<AboutQueryResult, "sections", number>,
  { _type: "mediasSection" }
>;
export type SectionType = Get<HomePageQueryResult, "sections", number>;
type Content = NonNullable<SectionType["content"]>;
type ContentType<T extends Content["type"]> = Extract<Content, { type: T }>;
type NonNull<T> = Exclude<T, null | undefined>;
export type ContentResultType<
  T extends Content["type"],
  K extends keyof ContentType<T>
> = NonNull<ContentType<T>[K]>;

export interface LayoutItem {
  x: number;
  y: number;
  rotation: number;
  borderRadius: number;
}

type ProjectsLayoutValue = (typeof LAYOUTS)[number]["value"];
export type ProjectListItem = Get<
  ProjectsPageQueryResult,
  "projectsList",
  number
>;
export type ProjectItem = Extract<ProjectListItem, { type: "project" }>;
export type SectionItem = Extract<ProjectListItem, { type: "section" }>;

export type ProjectsRow =
  | { layout: "3"; items: [SectionItem] }
  | {
      layout: Exclude<ProjectsLayoutValue, "3">;
      items: (ProjectItem | null)[];
    };
