import SectionList from "@/app/components/SectionList";
import { getAboutPage } from "@/sanity/lib/getters";
import { notFound } from "next/navigation";

export default async function About({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const about = await getAboutPage({ searchParams: await searchParams });
  if (!about) notFound();

  return (
    <main
      className={`flex flex-col gap-3 overflow-x-hidden bg-(--background-color) px-3 pt-(--h-header) pb-3 text-(--text-color) pbg-${about.pageColors.backgroundColor.slug} ptxt-${about.pageColors.textColor.slug}`}
      style={
        {
          "--background-color": about.pageColors.backgroundColor.value,
          "--text-color": about.pageColors.textColor.value
        } as React.CSSProperties
      }
    >
      {about.sections && <SectionList sections={about.sections} />}
    </main>
  );
}
