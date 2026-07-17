import { HomePageQueryResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { Image } from "next-sanity/image";
import Link from "next/link";
import { cn } from "../utils";

type ThumbnailProps = {
  project: NonNullable<NonNullable<HomePageQueryResult>["intro"]["project"]>;
  className?: string;
  sizes: {
    w: number;
    h: number;
  };
  isFeatured?: boolean;
  isGrid?: boolean;
};

export default function Thumbnail({
  project,
  className,
  sizes,
  isFeatured = false,
  isGrid = false
}: ThumbnailProps) {
  const cover =
    sizes.w > sizes.h ? project.covers.landscape : project.covers.portrait;
  return (
    <div
      className={cn(
        "group/thumbnail pointer-events-none relative flex aspect-(--ratio) flex-col justify-between overflow-hidden rounded-xl bg-ardoise",
        className
      )}
      style={
        {
          "--ratio": (sizes.w / sizes.h).toString()
        } as React.CSSProperties
      }
    >
      <Image
        className="absolute z-10 h-full w-full object-contain transition-transform duration-300 ease-out group-focus-within/thumbnail:scale-103 group-hover/thumbnail:scale-103"
        src={urlFor(cover).width(sizes.w).height(sizes.h).fit("crop").url()}
        alt=""
        width={sizes.w}
        height={sizes.h}
        loading={isFeatured ? "eager" : "lazy"}
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

      {!isFeatured && (
        <div className="z-20 flex w-full flex-col gap-3 bg-linear-to-t from-noir-profond to-transparent p-4 pt-12">
          <div className="flex items-center gap-4">
            {project.client.logo && (
              <Image
                src={urlFor(project.client.logo).width(64).url()}
                alt={project.client.name}
                width={64}
                height={64}
                className="size-7 rounded-full bg-ardoise"
              />
            )}
            {isGrid && (
              <p className="text-sm text-creme">{project.client.name}</p>
            )}
          </div>
          {isGrid && (
            <div className="grid transition-[grid-template-rows] duration-300 group-focus-within/thumbnail:grid-rows-[1fr] group-hover/thumbnail:grid-rows-[1fr] sm:grid-rows-[0fr]">
              <div className="overflow-hidden font-serif text-base leading-tight text-balance text-creme transition-opacity duration-600 group-focus-within/thumbnail:opacity-100 group-hover/thumbnail:opacity-100 sm:opacity-0">
                <h3 className="">{project.title}</h3>
                {project.subtitle && (
                  <p className="opacity-50">{project.subtitle}</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Link */}
      <Link
        className="pointer-events-auto absolute inset-0 z-20"
        href={`/projets/${project.slug}`}
      />
      {isFeatured && (
        <div className="invisible absolute top-1/2 left-1/2 z-20 -translate-1/2 rounded-lg bg-orange px-2.5 py-1.5 font-serif opacity-0 ring-offset-1 transition-opacity duration-300 ease-out group-focus-within/thumbnail:visible group-focus-within/thumbnail:opacity-100 group-focus-within/thumbnail:ring-2 group-focus-within/thumbnail:ring-noir-profond group-hover/thumbnail:visible group-hover/thumbnail:opacity-100">
          Voir
        </div>
      )}
    </div>
  );
}
