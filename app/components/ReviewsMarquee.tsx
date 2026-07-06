"use client";

import gsap from "gsap";
import { PortableText } from "next-sanity";
import { useEffect, useMemo, useRef } from "react";
import { ContentResultType } from "../utils";

type ReviewsType = ContentResultType<"reviews", "reviews">;
type SettingsType = ContentResultType<"reviews", "settings">;

const COLUMN_COUNT = 6; // 12/2

function splitIntoColumns<T>(items: T[], columns: number): T[][] {
  const result: T[][] = Array.from({ length: columns }, () => []);
  (items.length < 6 ? [...items, ...items] : items).forEach((item, index) =>
    result[index % columns].push(item)
  );
  return result;
}

function getMarginFromSlug(slug: string, gapRange: SettingsType["gapRange"]) {
  const hash = [...slug].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return gapRange.min + (hash % (gapRange.max - gapRange.min + 1));
}

function ReviewItem({
  review,
  gapRange
}: {
  review: ReviewsType[number];
  gapRange: SettingsType["gapRange"];
}) {
  const randomMargin = getMarginFromSlug(review.slug, gapRange);
  return (
    <div
      className=""
      style={{ marginBottom: `calc(var(--spacing) * ${randomMargin})` }}
    >
      <div className="font-serif text-sm **:font-normal [&_strong]:text-bleu-clair">
        <PortableText value={review.text} />
      </div>
      <p className="mt-6 text-xs font-medium text-bleu-clair/75">
        {review.person.name}
      </p>
      <p className="mt-0.5 text-xs text-bleu-clair">{review.client}</p>
    </div>
  );
}

function ReviewsColumn({
  reviews,
  duration,
  reverse = false,
  gapRange
}: {
  reviews: ReviewsType;
  duration: number;
  reverse?: boolean;
  gapRange: SettingsType["gapRange"];
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !reviews.length) return;

    const ctx = gsap.context(() => {
      // Wait for layout
      const halfHeight = track.scrollHeight / 2;

      gsap.fromTo(
        track,
        { y: reverse ? -halfHeight : 0 },
        {
          y: reverse ? 0 : -halfHeight,
          duration,
          ease: "none",
          repeat: -1
        }
      );
    }, track);

    return () => ctx.revert();
  }, [reviews, duration, reverse]);

  const looped = reviews.length < 4 ? [...reviews, ...reviews] : reviews;

  return (
    <div className="relative col-span-2 overflow-hidden">
      <div
        ref={trackRef}
        className="flex flex-col will-change-transform"
      >
        {[...looped, ...looped].map((review, i) => (
          <ReviewItem
            key={`${review.slug}-${i}`}
            review={review}
            gapRange={gapRange}
          />
        ))}
      </div>
    </div>
  );
}

export default function ReviewsMarquee({
  reviews,
  settings
}: {
  reviews: ReviewsType;
  settings: SettingsType;
}) {
  const columns = useMemo(
    () => splitIntoColumns(reviews, COLUMN_COUNT),
    [reviews]
  );

  return (
    <div className="absolute grid h-full grid-cols-2 gap-x-2.5 pr-4 sm:grid-cols-6 lg:grid-cols-12">
      {columns.map((columnReviews, index) => (
        <ReviewsColumn
          key={index}
          reviews={columnReviews}
          duration={gsap.utils.mapRange(
            0,
            COLUMN_COUNT - 1,
            settings.speedRange.min,
            settings.speedRange.max
          )(index)}
          reverse={
            settings.direction === "mixed"
              ? index % 2 === 1
              : settings.direction === "down"
          }
          gapRange={settings.gapRange}
        />
      ))}
    </div>
  );
}
