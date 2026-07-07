import { getPaletteColors } from "@/sanity/lib/getters";
import type { Get } from "@sanity/codegen";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { SectionType } from "../utils";
import Carousel from "./Carousel";
import FloatingServices from "./FloatingServices";
import ReviewsMarquee from "./ReviewsMarquee";
import Thumbnail from "./Thumbnail";

type SectionProps = {
  section: SectionType;
};

export default async function Section({ section }: SectionProps) {
  const paletteColors = (await getPaletteColors()).filter(
    (color) =>
      !["ardoise", "noir-profond"].includes(color.slug) &&
      ![section.colors?.backgroundColor, section.colors?.textColor].includes(
        color.value
      )
  );
  let services: {
    name: string;
    slug: string;
    color: string;
  }[] = [];

  if (section.content && section.content.type === "services") {
    services = section.content.services?.map((service, i) => {
      return {
        ...service,
        color: paletteColors[i % paletteColors.length].value
      };
    });
  }

  return (
    <section
      className={`relative flex flex-col rounded-xl bg-(--section-bg) text-(--section-text) ${
        section.content && ["projects", "medias"].includes(section.content.type)
          ? ""
          : "min-h-(--h-section)"
      }`}
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
        className={`grid grow grid-cols-3 items-start gap-x-2.5 gap-y-12 p-4 sm:grid-cols-6`}
      >
        <div
          className={`col-span-3 grid h-full grid-cols-3 items-start gap-x-2.5 gap-y-12 ${section.content && section.content.type === "medias" ? "sm:col-span-4 sm:grid-cols-4" : "sm:col-span-6 sm:grid-cols-6"}`}
        >
          {/* Texts */}
          <div
            className={`col-span-3 flex flex-col gap-10 ${section.description?.layout.position === "bottom" ? "justify-between" : "justify-start"}`}
          >
            <div className="flex flex-col gap-5">
              {section.subtitle && (
                <h2 className="font-serif">{section.title}</h2>
              )}
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

          {/* Button */}
          {section.button && (
            <div
              className={`col-span-3 font-serif ${section.button.position === "top" ? "col-end-7 text-end" : "col-start-1 mt-auto"}`}
            >
              <Link
                href={section.button.page.slug}
                title={section.button.page.title}
                className={`flex ${section.button.position === "bottom" ? "flex-row-reverse" : "flex-row"} items-center justify-end gap-6`}
              >
                {section.button.label}

                <span className="relative aspect-square h-11 rounded-md bg-(--section-button-bg)">
                  <span className="absolute inset-x-3 top-1/2 h-[1.5px] -translate-y-1/2 bg-(--section-button-fg)"></span>
                  <span className="absolute inset-y-3 left-1/2 w-[1.5px] -translate-x-1/2 bg-(--section-button-fg)"></span>
                </span>
              </Link>
            </div>
          )}
        </div>

        {/* Right side content */}
        {section.content &&
          section.content.type === "medias" &&
          section.content.medias && (
            <div className="col-span-3 flex h-full justify-end max-sm:aspect-2/3 sm:col-span-2 sm:col-end-7">
              {section.content.medias.length > 0 && (
                <Carousel medias={section.content.medias}></Carousel>
              )}
            </div>
          )}
      </div>

      {/* Bottom content */}
      {section.content &&
        ["projects", "services"].includes(section.content.type) && (
          <div className="py-4">
            {section.content.type === "projects" &&
              section.content.projects && (
                <div className="-ms-3 no-scrollbar flex w-screen gap-2.5 overflow-x-scroll px-7">
                  {section.content.projects.map((project, i) => (
                    <Thumbnail
                      key={project.slug + i}
                      project={project}
                      ratio="9/16"
                      className="h-90 shrink-0 sm:h-135 md:h-180 xl:h-225"
                    />
                  ))}
                </div>
              )}

            {section.content.type === "services" &&
              section.content.services && (
                <div className="mx-auto mb-12 aspect-1/1.5 w-full max-w-7xl p-4 sm:aspect-2/1">
                  <FloatingServices items={services} />
                </div>
              )}
          </div>
        )}

      {/* Absolute content */}
      {section.content && ["reviews"].includes(section.content.type) && (
        <div className="absolute inset-0">
          {section.content.type === "reviews" && section.content.reviews && (
            <div className="z-10 grid h-full grid-cols-2 grid-rows-1 gap-x-2.5 overflow-hidden mask-y-from-50% mask-y-to-100% px-4 sm:grid-cols-6 lg:grid-cols-12">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[150%] border-x border-creme/10"
                ></div>
              ))}
              <ReviewsMarquee
                reviews={section.content.reviews}
                settings={section.content.settings}
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
}

type DescriptionProps = {
  description: NonNullable<Get<SectionType, "description">>;
};

function Desctiption({ description }: DescriptionProps) {
  return (
    <div
      className={`flex flex-col gap-x-2.5 gap-y-4 font-serif text-base/tight sm:grid sm:grid-cols-(--cols) lg:grid-cols-3 ${description.layout.position === "bottom" ? "items-end" : "items-start"} `}
      style={
        {
          "--cols": `repeat(${description.layout.columns}, minmax(0, 1fr))`
        } as React.CSSProperties
      }
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
