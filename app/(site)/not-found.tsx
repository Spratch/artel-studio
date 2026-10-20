import { getHomePage, getPaletteColors } from "@/sanity/lib/getters";
import FloatingServices from "../components/FloatingServices";
import SectionList from "../components/SectionList";

export default async function NotFound() {
  const home = await getHomePage();
  const paletteColors = (await getPaletteColors()).filter(
    (color) => !["ardoise", "noir-profond", "creme"].includes(color.slug)
  );

  const sizes = [
    "scale-110",
    "",
    "",
    "scale-90",
    "scale-125",
    "scale-75",
    "scale-110",
    "scale-200",
    ""
  ];
  const variations = Array.from({ length: 100 }).map((_, i) => {
    return {
      slug: i.toString(),
      name: "404",
      hasPage: false,
      color: paletteColors[i % paletteColors.length].value,
      size: sizes[i % sizes.length]
    };
  });

  const projectsSection = home?.sections?.filter(
    (s) => s.contentType === "projects"
  );

  return (
    <main
      data-page-bg={home?.pageColors.backgroundColor.slug}
      data-page-text={home?.pageColors.textColor.slug}
      className="flex flex-col gap-3 bg-(--background-color) px-3 pt-(--h-header) pb-3"
    >
      <section
        className="flex min-h-(--h-section) flex-col items-center justify-center"
        style={
          {
            "--section-bg": home?.pageColors?.backgroundColor.value,
            "--section-text": home?.pageColors?.textColor.value
          } as React.CSSProperties
        }
      >
        <FloatingServices items={variations} />
      </section>
      {home && projectsSection && <SectionList sections={projectsSection} />}
    </main>
  );
}
