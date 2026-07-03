import Logo from "@/components/Logo";
import { getHomePage } from "@/sanity/lib/getters";
import Image from "next/image";
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

              <div className="absolute flex h-2/5 w-full items-start justify-between bg-linear-to-b from-noir-profond to-noir-profond/0 py-4 ps-4.5 pe-4 text-creme">
                <div className="flex items-center gap-2 py-0.5">
                  <span className="size-3 rounded-full bg-orange"></span>
                  <span className="font-serif">Projet récent</span>
                </div>

                {home.intro.project.tags.length > 0 && (
                  <div className="flex justify-end gap-1 text-xs">
                    {home.intro.project.tags.slice(0, 3).map((tag) => (
                      <span
                        className="rounded-lg border border-creme/20 bg-ardoise/15 px-3 py-1.5 backdrop-blur-xs"
                        key={tag.name}
                      >
                        {tag.name.toLowerCase()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
