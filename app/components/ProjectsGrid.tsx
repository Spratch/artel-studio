import GridRow from "@/app/components/GridRow";
import Thumbnail from "@/app/components/Thumbnail";
import { ProjectsPageQueryResult } from "@/sanity.types";
import { Get } from "@sanity/codegen";
import { ProjectItem, SectionItem } from "../types";
import { buildProjectsRows } from "../utils";

export default function ProjectsGrid({
  projectsList
}: {
  projectsList: Get<ProjectsPageQueryResult, "projectsList">;
}) {
  const rows = buildProjectsRows(projectsList);
  return (
    <>
      {rows.map((row, i) => {
        if (row.layout === "3") {
          return (
            <GridRow<SectionItem>
              key={i}
              layout={row.layout}
              items={row.items}
              renderItem={(item) => (
                <div
                  key={item.section._key}
                  className="flex flex-col gap-5 px-4 py-24 sm:py-48"
                >
                  <h3 className="font-serif text-base sm:text-lg">
                    {item.section.title}
                  </h3>
                  <p className="text-xl sm:text-3xl">{item.section.subtitle}</p>
                </div>
              )}
            />
          );
        }

        return (
          <GridRow<ProjectItem | null>
            key={i}
            layout={row.layout}
            items={row.items}
            renderItem={(item) => {
              if (!item) return null;
              const sizes = row.layout.includes("2")
                ? { w: 1010, h: 750 }
                : { w: 500, h: 750 };
              return (
                <Thumbnail
                  key={item.project.slug}
                  project={item.project}
                  sizes={sizes}
                />
              );
            }}
          />
        );
      })}
    </>
  );
}
