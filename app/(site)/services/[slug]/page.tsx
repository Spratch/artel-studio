import SectionList from "@/app/components/SectionList";
import { getServicePage } from "@/sanity/lib/getters";
import { notFound } from "next/navigation";

export default async function Service({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  if (!slug) return notFound();
  const service = await getServicePage({
    params: { slug },
    searchParams: await searchParams
  });
  if (!service || !service.hasPage) return notFound();

  return (
    <main
      data-page-bg={service.pageColors?.backgroundColor.slug}
      data-page-text={service.pageColors?.textColor.slug}
      className={`service-page flex flex-col gap-3 overflow-x-hidden bg-(--background-color) px-3 pt-(--h-header) pb-3 text-(--text-color)`}
    >
      {service.sections && <SectionList sections={service.sections} />}
    </main>
  );
}
