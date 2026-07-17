import GridRow from "@/app/components/GridRow";
import { PreviewScrollGate } from "@/app/components/PreviewScrollGate";
import { getProjectPage } from "@/sanity/lib/getters";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import { Image } from "next-sanity/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Project({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const { slug } = await params;
  if (!slug) return notFound();
  const { preview } = await searchParams;
  const project = await getProjectPage({
    params: { slug },
    searchParams: { preview }
  });
  if (!project) return notFound();

  return (
    <>
      <main
        data-page-bg={project.pageColors.backgroundColor.slug}
        data-page-text={project.pageColors.textColor.slug}
        className={`service-page flex min-h-screen flex-col gap-16 overflow-x-hidden bg-(--background-color) px-3 pt-(--h-header) pb-3 text-(--text-color) sm:gap-20`}
        style={
          {
            "--background-color": project.pageColors.backgroundColor.value,
            "--text-color": project.pageColors.textColor.value
          } as React.CSSProperties
        }
      >
        <section className="mx-auto w-full max-w-7xl overflow-hidden rounded-[1.875rem]">
          <Image
            src={urlFor(project.covers.landscape)
              .width(1280)
              .height(720)
              .fit("crop")
              .url()}
            alt={project.covers.landscape.alt}
            width={1280}
            height={720}
            loading="eager"
          />
        </section>

        <section className="mx-auto grid max-w-7xl grid-cols-6 gap-x-2.5 gap-y-16 py-5 sm:gap-y-24">
          <div className="col-span-6 flex flex-col gap-5 sm:col-span-4 sm:col-start-3 sm:pr-4">
            <h1 className="font-serif text-base sm:text-lg">{project.title}</h1>
            {project.introduction && (
              <p className="text-xl sm:text-3xl">{project.introduction}</p>
            )}
          </div>

          <ul className="col-span-6 flex flex-col sm:col-span-2 sm:pl-4">
            <h2 className="sr-only">Services</h2>
            {project.services.map((service) => (
              <li
                key={service.slug}
                className="font-serif text-sm"
              >
                {service.hasPage ? (
                  <Link href={`/services/${service.slug}`}>
                    {service.name} ↝
                  </Link>
                ) : (
                  <span>{service.name}</span>
                )}
              </li>
            ))}
          </ul>

          <div className="col-span-6 grid grid-cols-2 content-start gap-x-2.5 gap-y-0 font-serif text-sm sm:col-span-4 sm:grid-cols-4">
            <h2 className="sr-only">Infos</h2>
            <div className="contents">
              <h3 className="col-start-1">Client</h3>
              <p className="sm:col-span-2">{project.client}</p>
            </div>
            <div className="contents">
              <h3 className="col-start-1">Date</h3>
              <p className="sm:col-span-2">{project.date.slice(0, 4)}</p>
            </div>
            {project.credits &&
              project.credits.map((credit) => (
                <div
                  key={credit.service}
                  className="contents"
                >
                  <h3 className="col-start-1">{credit.service}</h3>
                  {credit.contributors.map((person) => (
                    <p
                      key={person}
                      className="sm:col-span-2"
                    >
                      {person}
                    </p>
                  ))}
                </div>
              ))}
            {project.typefaces && (
              <div className="contents">
                <h3 className="col-start-1">
                  Typographie{project.typefaces.length > 1 && "s"}
                </h3>
                <ul className="sm:col-span-2">
                  {project.typefaces.map((typeface) => (
                    <li key={typeface.name}>
                      {typeface.name},{" "}
                      {typeface.url ? (
                        <Link
                          href={typeface.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {typeface.foundry}
                        </Link>
                      ) : (
                        <span>{typeface.foundry}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {project.sectors && (
              <div className="contents">
                <h3 className="col-start-1">
                  Secteur{project.sectors.length > 1 && "s"}
                </h3>
                <ul className="sm:col-span-2">
                  {project.sectors.map((sector) => (
                    <li key={sector}>{sector}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {project.pageContent && (
          <section className="mx-auto flex min-h-(--h-section) max-w-7xl flex-col gap-y-2.5">
            <h2
              className="sr-only"
              id="page-content"
            >
              Contenu du projet
            </h2>
            {project.pageContent.map((row) => {
              if (!row.elements) return null;
              return (
                <GridRow
                  key={row._key}
                  layout={row.layout}
                  items={row.elements}
                  renderItem={(element, index) => {
                    if (element.type === "textCol") {
                      return (
                        <div
                          key={index}
                          className="flex flex-col gap-5 px-4 py-24 sm:py-48"
                        >
                          <h3 className="font-serif text-base sm:text-lg">
                            {element.title}
                          </h3>
                          <div className="text-xl sm:text-3xl">
                            <PortableText value={element.body} />
                          </div>
                        </div>
                      );
                    }
                    if (element.type === "review") {
                      return (
                        <div
                          key={index}
                          className="flex flex-col gap-5 px-4 py-24 sm:py-48"
                        >
                          <h3 className="text-base sm:text-lg">
                            Témoignage client
                          </h3>
                          <div className="font-serif text-xl **:font-normal sm:text-3xl [&_p]:first:before:content-['“'] [&_p]:last:after:content-['”']">
                            <PortableText value={element.review.text} />
                          </div>
                        </div>
                      );
                    }
                    if (element.type === "imageAlt") {
                      const sizes = row.layout.includes("2")
                        ? { w: 1010, h: 750 }
                        : { w: 500, h: 750 };
                      return (
                        <Image
                          key={index}
                          src={urlFor(element.imageAlt)
                            .width(sizes.w)
                            .height(sizes.h)
                            .fit("crop")
                            .url()}
                          alt={element.imageAlt.alt}
                          width={sizes.w}
                          height={sizes.h}
                          loading="lazy"
                        />
                      );
                    }
                    return null;
                  }}
                />
              );
            })}
          </section>
        )}
      </main>
      <PreviewScrollGate preview={preview} />
    </>
  );
}
