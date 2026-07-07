import { MediaSectionType, SectionType } from "../types";
import Carousel from "./Carousel";
import Section from "./Section";

type SectionListProps = {
  sections: Array<SectionType | MediaSectionType>;
};

export default function SectionList({ sections }: SectionListProps) {
  return (
    <>
      {sections.map((section, index) => {
        return section._type === "section" ? (
          <Section
            key={index}
            section={section}
          />
        ) : (
          <div key={index}>
            {section.medias && (
              <Carousel
                medias={section.medias}
                orientation="landscape"
              />
            )}
          </div>
        );
      })}
    </>
  );
}
