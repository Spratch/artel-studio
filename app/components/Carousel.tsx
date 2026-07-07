"use client";

import { useAutoplayProgress } from "@/hooks/useAutoplayProgress";
import { urlFor } from "@/sanity/lib/image";
import { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import ClassNames from "embla-carousel-class-names";
import useEmblaCarousel from "embla-carousel-react";
import { useReducedMotion } from "motion/react";
import { Image } from "next-sanity/image";
import { useEffect, useState } from "react";
import { ContentResultType } from "../types";

type CarouselProps = {
  medias: ContentResultType<"medias", "medias">;
};
export default function Carousel({ medias }: CarouselProps) {
  const isMultiple = medias.length > 1;
  const prefersReducedMotion = useReducedMotion();
  const carouselPlugins =
    prefersReducedMotion || !isMultiple
      ? []
      : [Autoplay({ stopOnInteraction: false }), ClassNames()];
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, active: isMultiple },
    carouselPlugins
  );
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const { selectedIndex, duration, tick } = useAutoplayProgress(emblaApi);

  const goTo = (index: number) => emblaApi?.scrollTo(index);
  const setupSnaps = (emblaApi: EmblaCarouselType) =>
    setScrollSnaps(emblaApi.scrollSnapList());

  useEffect(() => {
    if (!emblaApi || !isMultiple) return;
    emblaApi.plugins().autoplay?.play();

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setupSnaps(emblaApi);
    emblaApi.on("reInit", setupSnaps);

    return () => {
      emblaApi.off("reInit", setupSnaps);
    };
  }, [emblaApi, isMultiple]);

  return (
    <div className="embla relative aspect-2/3 max-h-(--h-section) overflow-hidden rounded-md max-sm:mx-auto">
      <div
        className={`embla__viewport h-full overflow-hidden ${isMultiple ? "cursor-grab" : ""}`}
        ref={emblaRef}
      >
        <div
          className={`embla__container h-full ${isMultiple ? "flex touch-pan-y touch-pinch-zoom" : ""}`}
        >
          {medias.map((media) => (
            <div
              key={media._key}
              className="embla__slide h-full min-w-0 shrink-0 grow-0 basis-full"
            >
              {media._type === "imageAlt" && (
                <Image
                  src={urlFor(media).width(720).height(1080).fit("crop").url()}
                  alt={media.alt}
                  width={720}
                  height={1080}
                  className={`h-full w-full object-cover`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {isMultiple && (
        <div className="embla__dots absolute inset-x-2 top-2 flex h-1 gap-1 transition-[height] hover:h-1.5">
          {scrollSnaps.map((_, index) => (
            <button
              className="embla__dot h-full flex-1 cursor-pointer overflow-hidden rounded-full bg-creme/50 transition-colors duration-300 ease-out hover:bg-creme"
              key={index}
              onClick={() => goTo(index)}
            >
              {index === selectedIndex ? (
                <span
                  key={tick}
                  className="embla__dot-progress block h-full rounded-full bg-creme"
                  style={{ animationDuration: `${duration}ms` }}
                />
              ) : null}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
