import { getHomePage } from "@/sanity/lib/getters";
import { notFound } from "next/navigation";
import Logo from "../components/Logo";
import Section from "../components/Section";
import Thumbnail from "../components/Thumbnail";

export default async function Home({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const home = await getHomePage({ searchParams: await searchParams });
  if (!home) notFound();

  return (
    <main
      className="flex flex-col gap-3 bg-creme px-3 pt-(--h-header) pb-3 **:[path]:fill-(--color-logo)"
      style={
        {
          "--color-logo": home.logoColor
        } as React.CSSProperties
      }
    >
      <section className="relative h-(--h-section) max-h-[70vw]">
        <Logo className="absolute inset-x-0 bottom-2 z-0" />
        <div className="relative z-10 mx-4 grid h-full grid-cols-6 items-center gap-2.5">
          {home.intro.type === "project" && home.intro.project && (
            <Thumbnail
              project={home.intro.project}
              className="col-span-6 mx-auto max-h-[80svh] w-[min(100%,calc(80svh*16/9))] sm:col-span-4 sm:col-start-2"
              ratio="16/9"
              isFeatured={true}
            />
          )}
        </div>
      </section>
      {home.sections &&
        home.sections.map((section, index) => (
          <Section
            key={index}
            section={section}
          />
        ))}
    </main>
  );
}
