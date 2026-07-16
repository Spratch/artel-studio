import ProjectsGrid from "@/app/components/ProjectsGrid";
import Section from "@/app/components/Section";
import { getProjectsPage } from "@/sanity/lib/getters";
import { notFound } from "next/navigation";

export default async function Projects({
  searchParams
}: {
  searchParams: Promise<{ preview?: string }>;
}) {
  const { preview } = await searchParams;
  const page = await getProjectsPage({ searchParams: { preview } });
  if (!page) notFound();

  return (
    <main
      data-page-bg={page.pageColors.backgroundColor.slug}
      data-page-text={page.pageColors.textColor.slug}
      className={`service-page flex min-h-screen flex-col gap-16 overflow-x-hidden bg-(--background-color) px-3 pt-(--h-header) pb-3 text-(--text-color) sm:gap-20`}
    >
      <Section
        section={{
          title: page.title,
          subtitle: page.subtitle,
          _type: "section",
          _key: "section-0",
          description: null,
          button: null,
          colors: {
            backgroundColor: page.pageColors.backgroundColor.value,
            textColor: page.pageColors.textColor.value,
            buttonBgColor: null,
            buttonFgColor: null,
            experienceColor: null,
            methodStepColor: null,
            methodTitleColor: null,
            reviewsColor: null,
            servicesColor: null
          },
          contentType: null,
          content: {
            type: "projects",
            projects: null
          }
        }}
      />

      <section className="flex flex-col gap-2.5">
        <ProjectsGrid projectsList={page.projectsList} />
      </section>
    </main>
  );
}
