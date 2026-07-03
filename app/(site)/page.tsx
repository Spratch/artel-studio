import Logo from "@/components/Logo";
import { getHomePage } from "@/sanity/lib/getters";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Home({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const home = await getHomePage({ searchParams: await searchParams });
  if (!home) notFound();

  return (
    <main
      className="bg-creme px-3 pt-(--h-header) **:[path]:fill-(--color-logo)"
      style={
        {
          "--color-logo": home.logoColor
        } as React.CSSProperties
      }
    >
      <section className="relative h-(--h-section) max-h-[70vw]">
        <Logo className="absolute inset-x-0 bottom-2 z-0" />
        <div className="relative z-10 mx-3 grid h-full grid-cols-6 items-center gap-2.5">
          {home.intro.type === "project" && home.intro.project && (
            <div className="group/thumbnail relative col-span-4 col-start-2 mx-auto aspect-video max-h-[80svh] w-[min(100%,calc(80svh*16/9))] overflow-hidden rounded-xl bg-ardoise">
              <Image
                className="h-full w-full object-cover transition-transform duration-300 ease-out group-focus-within/thumbnail:scale-103 group-hover/thumbnail:scale-103"
                src={home.intro.project.cover.src}
                alt=""
                fill={true}
              />

              <div className="absolute flex h-2/5 w-full items-start justify-between bg-linear-to-b from-noir-profond to-noir-profond/0 py-2 text-creme max-sm:px-2.5 sm:py-4 sm:ps-4.5 sm:pe-4">
                <div className="flex items-center gap-1.5 py-0.5 sm:gap-2">
                  <span className="size-2 rounded-full bg-orange sm:size-3"></span>
                  <span className="font-serif text-sm text-nowrap sm:text-base">
                    Projet récent
                  </span>
                </div>

                {home.intro.project.tags.length > 0 && (
                  <div className="flex justify-end gap-1 text-2xs sm:text-xs">
                    {home.intro.project.tags.slice(0, 3).map((tag) => (
                      <span
                        className="overflow-hidden rounded-lg border border-creme/20 bg-ardoise/15 px-2 py-1 text-nowrap backdrop-blur-xs max-sm:max-w-[12ch] max-sm:text-ellipsis sm:px-3 sm:py-1.5"
                        key={tag.name}
                      >
                        {tag.name.toLowerCase()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <Link
                href={`/project/${home.intro.project.slug}`}
                className="invisible absolute top-1/2 left-1/2 -translate-1/2 rounded-lg bg-orange px-2.5 py-1.5 font-serif opacity-0 transition-opacity duration-300 ease-out group-hover/thumbnail:visible group-hover/thumbnail:opacity-100 focus-visible:visible focus-visible:opacity-100"
              >
                Voir
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
