import { HomePageQueryResult } from "@/sanity.types";
import type { Get } from "@sanity/codegen";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Thumbnail from "./Thumbnail";

type SectionProps = {
  section: Get<HomePageQueryResult, "sections", number>;
};
type DescriptionProps = {
  description: NonNullable<
    Get<HomePageQueryResult, "sections", number, "description">
  >;
};

export default function Section({ section }: SectionProps) {
  return (
    <section
      className={`relative grid h-(--h-section) max-h-[80svh] grid-cols-3 items-start gap-2.5 rounded-xl bg-(--section-bg) p-4 text-(--section-text) sm:grid-cols-6`}
      style={
        {
          "--section-bg": section.colors?.backgroundColor,
          "--section-text": section.colors?.textColor,
          "--section-button-bg": section.colors?.buttonBgColor,
          "--section-button-fg": section.colors?.buttonFgColor
        } as React.CSSProperties
      }
    >
      <div
        className={`col-span-3 flex flex-col gap-10 ${section.description?.layout.position === "bottom" ? "justify-between" : "justify-start"}`}
      >
        <div className="flex flex-col gap-5">
          {section.subtitle && <h2 className="font-serif">{section.title}</h2>}
          {section.subtitle ? (
            <p className="text-3xl">{section.subtitle}</p>
          ) : (
            <h2 className="text-3xl">{section.title}</h2>
          )}
        </div>

        {section.description && (
          <Desctiption description={section.description} />
        )}
      </div>

      {section.button && (
        <div
          className={`col-span-2 font-serif ${section.button.position === "top" ? "col-end-7 text-end" : "col-start-1 mt-auto"}`}
        >
          <Link
            href={section.button.page.slug}
            title={section.button.page.title}
            className={`flex ${section.button.position === "bottom" ? "flex-row-reverse" : "flex-row"} items-center justify-end gap-6`}
          >
            {section.button.label}

            <span className="relative aspect-square h-11 rounded-md bg-(--section-button-bg)">
              <span className="absolute inset-x-3 inset-y-[calc((var(--spacing)*11)/2-0.75px)] bg-(--section-button-fg)"></span>
              <span className="absolute inset-x-[calc((var(--spacing)*11)/2-0.75px)] inset-y-3 bg-(--section-button-fg)"></span>
            </span>
          </Link>
        </div>
      )}

      {section.content?.type === "projects" && section.content.projects && (
        <div className="bottom-20 -ms-7 no-scrollbar flex w-screen gap-2.5 overflow-x-scroll ps-6 pe-6">
          {section.content.projects.map((project, i) => (
            <Thumbnail
              key={project.slug + i}
              project={project}
              ratio="9/16"
              className="h-180 max-h-[calc(var(--h-section)/1.5)] shrink-0"
            />
          ))}
        </div>
      )}
    </section>
  );
}

function Desctiption({ description }: DescriptionProps) {
  return (
    <div
      className={`flex grid-cols-3 flex-col gap-x-2.5 gap-y-4 font-serif text-base/snug sm:grid ${description.layout.position === "bottom" ? "items-end" : "items-start"}`}
    >
      <div className="text-balance">
        <PortableText value={description.col1} />
      </div>
      {description.layout.columns > 1 && description.col2 && (
        <div className="text-balance">
          <PortableText value={description.col2} />
        </div>
      )}
      {description.layout.columns > 2 && description.col3 && (
        <div className="text-balance">
          <PortableText value={description.col3} />
        </div>
      )}
    </div>
  );
}
