import { HomePageQueryResult } from "@/sanity.types";
import { PortableText } from "next-sanity";

type SectionProps = {
  section: NonNullable<NonNullable<HomePageQueryResult>["sections"]>[number];
};

export default function Section({ section }: SectionProps) {
  return (
    <section
      className={`grid min-h-(--h-section) grid-cols-6 gap-2.5 rounded-xl bg-(--section-bg) p-4 text-(--section-text)`}
      style={
        {
          "--section-bg": section.colors?.backgroundColor,
          "--section-text": section.colors?.textColor,
          "--section-button-bg": section.colors?.buttonBgColor,
          "--section-button-fg": section.colors?.buttonFgColor
        } as React.CSSProperties
      }
    >
      <div className="col-span-3 flex flex-col gap-5">
        {section.subtitle && <h2 className="font-serif">{section.title}</h2>}
        {section.subtitle ? (
          <p className="text-3xl">{section.subtitle}</p>
        ) : (
          <h2 className="text-3xl">{section.title}</h2>
        )}
        {section.description &&
          section.description.layout?.position === "top" && (
            <div
              className="grid gap-2.5 font-serif text-base/snug"
              style={{
                gridTemplateColumns: `repeat(${section.description.layout.columns}, minmax(0, 1fr))`
              }}
            >
              <PortableText value={section.description.col1} />
              {section.description.layout.columns > 1 &&
                section.description.col2 && (
                  <PortableText value={section.description.col2} />
                )}
              {section.description.layout.columns > 2 &&
                section.description.col3 && (
                  <PortableText value={section.description.col3} />
                )}
            </div>
          )}
      </div>
    </section>
  );
}
