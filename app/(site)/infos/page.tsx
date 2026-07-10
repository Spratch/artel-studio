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
      data-page-bg={about.pageColors.backgroundColor.slug}
      data-page-text={about.pageColors.textColor.slug}
      className={`flex flex-col gap-3 overflow-x-hidden bg-(--background-color) px-3 pt-(--h-header) pb-3 text-(--text-color)`}
    >
      {about.sections && <SectionList sections={about.sections} />}
    </main>
  );
}
