import { getHomePage } from "@/sanity/lib/getters";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Home() {
  const home = await getHomePage();
  if (!home) notFound();

  return (
    <div
      className="**:[path]:fill-(--color-logo)"
      style={
        {
          "--color-logo": home.logoColor
        } as React.CSSProperties
      }
    >
      {home.intro.type === "project" && home.intro.project && (
        <div className="w-full">
          <h2>{home.intro.project.slug}</h2>
          <Image
            src={home.intro.project.cover.src}
            alt=""
            width={100}
            height={100}
          />
        </div>
      )}
    </div>
  );
}
