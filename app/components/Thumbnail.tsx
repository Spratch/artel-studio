import { HomePageQueryResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { Image } from "next-sanity/image";
import Link from "next/link";
import { cn } from "../utils";

type ThumbnailProps = {
  project: NonNullable<NonNullable<HomePageQueryResult>["intro"]["project"]>;
  className?: string;
  ratio?: "16/9" | "9/16";
  isFeatured?: boolean;
};

export default function Thumbnail({
  project,
  className,
  ratio = "16/9",
  isFeatured = false
}: ThumbnailProps) {
  return (
    <div
      className={cn(
        "group/thumbnail pointer-events-none relative flex aspect-(--ratio) flex-col justify-between overflow-hidden rounded-xl bg-ardoise",
        className
      )}
      style={
        {
          "--ratio": ratio
        } as React.CSSProperties
      }
    >
      <Image
        className="absolute z-10 h-full w-full object-contain transition-transform duration-300 ease-out group-focus-within/thumbnail:scale-103 group-hover/thumbnail:scale-103"
        src={urlFor(project.cover)
          .width(ratio === "16/9" ? 1280 : 506.25)
          .height(ratio === "16/9" ? 720 : 900)
          .fit("crop")
          .url()}
        alt=""
        width={ratio === "16/9" ? 1280 : 506.25}
        height={ratio === "16/9" ? 720 : 900}
      />

      <div className="z-20 flex h-2/5 w-full items-start justify-between gap-2 bg-linear-to-b from-noir-profond to-noir-profond/0 py-2 ps-2.5 pe-2 text-creme sm:py-4 sm:ps-4.5 sm:pe-4">
        {isFeatured && (
          <div className="flex items-center gap-1.5 py-0.5 sm:gap-2">
            <span className="size-2 rounded-full bg-orange sm:size-3"></span>
            <span className="font-serif text-sm text-nowrap sm:text-base">
              Projet récent
            </span>
          </div>
        )}

        {project.tags.length > 0 && (
          <div className="ms-auto flex justify-end gap-1 text-2xs sm:text-xs">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                className={cn(
                  "overflow-hidden rounded-lg border border-creme/20 bg-ardoise/15 px-2 py-1 text-nowrap backdrop-blur-xs max-sm:max-w-[14ch] max-sm:text-ellipsis max-sm:last:hidden sm:px-3 sm:py-1.5"
                )}
                key={tag.name}
              >
                {tag.name.toLowerCase()}
              </span>
            ))}
          </div>
        )}
      </div>

      {!isFeatured && project.client && project.client.logo && (
        <Image
          src={urlFor(project.client.logo).width(64).url()}
          alt={project.client.name}
          width={64}
          height={64}
          className="z-20 ms-4 mb-4 size-7 rounded-full bg-ardoise object-contain"
        />
      )}

      {/* Link */}
      <Link
        className="pointer-events-auto absolute inset-0 z-20"
        href={`/project/${project.slug}`}
      />
      {isFeatured && (
        <div className="invisible absolute top-1/2 left-1/2 z-20 -translate-1/2 rounded-lg bg-orange px-2.5 py-1.5 font-serif opacity-0 ring-offset-1 transition-opacity duration-300 ease-out group-focus-within/thumbnail:visible group-focus-within/thumbnail:opacity-100 group-focus-within/thumbnail:ring-2 group-focus-within/thumbnail:ring-noir-profond group-hover/thumbnail:visible group-hover/thumbnail:opacity-100">
          Voir
        </div>
      )}
    </div>
  );
}
