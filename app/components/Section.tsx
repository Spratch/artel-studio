import { getPaletteColors } from "@/sanity/lib/getters";
import type { Get } from "@sanity/codegen";
import { Plus } from "iconoir-react";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { ContentResultType, SectionType } from "../types";
import Carousel from "./Carousel";
import FloatingServices from "./FloatingServices";
import Thumbnail from "./Thumbnail";
import VerticalMarquee from "./VerticalMarquee";

type SectionProps = {
  section: SectionType;
};

const VRAC_POSITIONS = [
  { x: "43", y: "45", r: "-5" },
  { x: "63", y: "33", r: "3" },
  { x: "82", y: "37", r: "-1" },
  { x: "22", y: "60", r: "5" }
];

export default async function Section({ section }: SectionProps) {
  const paletteColors = (await getPaletteColors()).filter(
    (color) =>
      !["ardoise", "noir-profond"].includes(color.slug) &&
      ![section.colors?.backgroundColor, section.colors?.textColor].includes(
        color.value
      )
  );
  let services: (ContentResultType<"services", "services">[number] & {
    color: string;
  })[] = [];

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
          "--section-services": section.colors?.servicesColor,
          "--section-reviews": section.colors?.reviewsColor,
          "--section-experience": section.colors?.experienceColor,
          "--section-method-step": section.colors?.methodStepColor,
          "--section-method-title": section.colors?.methodTitleColor,
          "--section-button-bg": section.colors?.buttonBgColor,
          "--section-button-fg": section.colors?.buttonFgColor
        } as React.CSSProperties
      }
    >
      <div
        className={`grid grid-cols-3 items-start gap-x-2.5 gap-y-12 p-4 sm:grid-cols-6 ${section.contentType !== "experience" && "grow"}`}
      >
        <div
          className={`col-span-3 grid h-full grid-cols-3 items-start gap-x-2.5 gap-y-12 ${section.content && section.content.type === "medias" ? "sm:col-span-4 sm:grid-cols-4" : "sm:col-span-6 sm:grid-cols-6"}`}
        >
          {/* Texts */}
          <div
            className={`col-span-3 flex flex-col gap-10 ${section.description?.layout.position === "bottom" ? "h-full justify-between" : "justify-start"} ${!section.content && "sticky top-16"} ${!section.content && section.button?.position === "bottom" ? "pb-16" : ""}`}
          >
            <div className="flex flex-col gap-2 sm:gap-5">
              {(section.subtitle || section.contentType === "experience") && (
                <h2 className="font-serif">{section.title}</h2>
              )}

              {section.subtitle && (
                <p className="text-2xl/tight text-balance md:max-w-[42ch] md:text-3xl">
                  {section.subtitle.split(/\[\[(.*?)\]\]/).map((s, i) => (
                    <span
                      key={s + i}
                      className={i === 1 ? "text-bleu-clair" : ""}
                    >
                      {s}
                    </span>
                  ))}
                </p>
              )}

              {!section.subtitle && section.contentType !== "experience" && (
                <h2 className="text-2xl/tight text-balance md:max-w-[42ch] md:text-3xl">
                  {section.title}
                </h2>
              )}
            </div>

            {section.description && section.description.col1 && (
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
                className={`group/button flex w-fit outline-0 ${section.button.position === "bottom" ? "flex-row-reverse" : "ml-auto flex-row"} items-center justify-end gap-6 underline-offset-2 hover:underline focus-visible:underline`}
              >
                {section.button.label}

                <span className="relative flex aspect-square h-11 items-center justify-center rounded-md bg-(--section-button-bg) transition-colors group-focus-within/button:bg-(--section-button-fg) group-hover/button:bg-(--section-button-fg)">
                  <Plus
                    className="**:[path]:stroke-(--section-button-fg) **:[path]:transition-colors group-focus-within/button:**:[path]:stroke-(--section-button-bg) group-hover/button:**:[path]:stroke-(--section-button-bg)"
                    width="32"
                    height="32"
                  />
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
        ["projects", "services", "experience"].includes(
          section.content.type
        ) && (
          <>
            {section.content.type === "projects" &&
              section.content.projects &&
              section.content.projectsLayout === "list" && (
                <div className="-ms-3 no-scrollbar flex w-screen gap-2.5 overflow-x-scroll px-7 pt-6 pb-4 md:pt-12">
                  {section.content.projects.map((project, i) => (
                    <Thumbnail
                      key={project.slug + i}
                      project={project}
                      sizes={{ w: 500, h: 750 }}
                      className="h-90 shrink-0 sm:h-135 md:h-180 xl:h-225"
                      isGrid={true}
                    />
                  ))}
                </div>
              )}

            {section.content.type === "projects" &&
              section.content.projects &&
              section.content.projectsLayout !== "list" && (
                <div className="relative min-h-(--h-section)">
                  {section.content.projects.map((project, i) => {
                    const pos = VRAC_POSITIONS[i % VRAC_POSITIONS.length];
                    return (
                      <div
                        key={project.slug + i}
                        style={{
                          position: "absolute",
                          top: `${pos.y}%`,
                          left: `${pos.x}%`,
                          transform: `translate(-50%, -50%) rotate(${pos.r}deg)`
                        }}
                        className="transition-transform focus-within:-rotate-1 hover:-rotate-1"
                      >
                        <Thumbnail
                          project={project}
                          sizes={{ w: 500, h: 750 }}
                          className="h-70 shrink-0 sm:h-120 md:h-135 xl:h-180"
                          isGrid={true}
                          isVrac={true}
                        />
                      </div>
                    );
                  })}
                </div>
              )}

            {section.content.type === "services" &&
              section.content.services && (
                <div className="mx-auto max-h-(--h-section) w-full grow overflow-visible p-4 sm:mb-12 sm:aspect-2/1">
                  <FloatingServices items={services} />
                </div>
              )}

            {section.content.type === "experience" &&
              section.content.expCategories && (
                <div className="flex w-full grow flex-col flex-wrap items-start justify-between gap-x-2.5 gap-y-12 p-4 pt-1 sm:flex-row">
                  {section.content.expCategories.map((category) => (
                    <div
                      key={category.title}
                      className="flex flex-col gap-5"
                    >
                      <p className="text-3xl">{category.title}</p>

                      <li className="flex list-none flex-col flex-wrap gap-4 font-serif sm:max-h-(--h-section) lg:pr-[calc((100vw-56px-4*10px)/6)]">
                        {category.experiences.map((exp) => (
                          <ul
                            key={exp.title + exp.date}
                            className="sm:max-w-[calc((100vw-56px-4*10px)/4)] lg:max-w-[calc((100vw-56px-4*10px)/6)]"
                          >
                            <p>{exp.date}</p>
                            {exp.project ? (
                              <Link
                                href={`/projets/${exp.project}`}
                                className="text-(--section-experience) underline underline-offset-3 outline-0 hover:decoration-dashed focus-visible:decoration-dashed"
                              >
                                {exp.title}
                              </Link>
                            ) : (
                              <p className="text-(--section-experience)">
                                {exp.title}
                              </p>
                            )}
                            {exp.services && <p>{exp.services.join(", ")}</p>}
                            {exp.description && <p>{exp.description}</p>}
                          </ul>
                        ))}
                      </li>
                    </div>
                  ))}
                </div>
              )}
          </>
        )}

      {/* Absolute content */}
      {section.content &&
        ["reviews", "method"].includes(section.content.type) && (
          <div className="absolute inset-0">
            {((section.content.type === "reviews" && section.content.reviews) ||
              (section.content.type === "method" &&
                section.content.method)) && (
              <div className="z-10 grid h-full grid-cols-2 grid-rows-1 gap-x-2.5 overflow-hidden mask-y-from-50% mask-y-to-100% px-4 sm:grid-cols-6 lg:grid-cols-12">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-[150%] border-x border-(--section-text)/10"
                  ></div>
                ))}
                <VerticalMarquee
                  items={
                    section.content.type === "reviews"
                      ? section.content.reviews!
                      : section.content.method!
                  }
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
      <div className="pt text-balance">
        <PortableText value={description.col1} />
      </div>
      {description.layout.columns > 1 && description.col2 && (
        <div className="pt text-balance">
          <PortableText value={description.col2} />
        </div>
      )}
      {description.layout.columns > 2 && description.col3 && (
        <div className="pt text-balance">
          <PortableText value={description.col3} />
        </div>
      )}
    </div>
  );
}
