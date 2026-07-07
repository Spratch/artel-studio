"use client";
import { useReducedMotion } from "motion/react";

import gsap from "gsap";
import { PortableText } from "next-sanity";
import { useEffect, useMemo, useRef } from "react";
import { ContentResultType } from "../types";
import { cn } from "../utils";

type ReviewsType = ContentResultType<"reviews", "reviews">;
type SettingsType = ContentResultType<"reviews", "settings">;

const COLUMN_COUNT = 6; // 12/2
const COLUMN_VISIBILITY = [
  "block",
  "hidden sm:block",
  "hidden sm:block",
  "hidden lg:block",
  "hidden lg:block",
  "hidden lg:block"
];

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
  gapRange,
  className
}: {
  reviews: ReviewsType;
  duration: number;
  reverse?: boolean;
  gapRange: SettingsType["gapRange"];
  className: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !reviews.length || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const buildTween = () => {
        tweenRef.current?.kill();
        const halfHeight = track.scrollHeight / 2;

        tweenRef.current = gsap.fromTo(
          track,
          { y: reverse ? -halfHeight : 0 },
          {
            y: reverse ? 0 : -halfHeight,
            duration,
            ease: "none",
            repeat: -1
          }
        );
      };

      buildTween();

      const ro = new ResizeObserver(() => {
        buildTween();
      });
      ro.observe(track);

      return () => ro.disconnect();
    }, track);

    return () => ctx.revert();
  }, [reviews, duration, reverse, prefersReducedMotion]);

  const looped = reviews.length < 4 ? [...reviews, ...reviews] : reviews;

  return (
    <div className={cn("relative col-span-2 overflow-hidden", className)}>
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
    <>
      <div
        className="absolute grid h-full grid-cols-2 gap-x-2.5 pr-4 sm:grid-cols-6 lg:grid-cols-12"
        aria-hidden="true"
        role="presentation"
      >
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
            className={COLUMN_VISIBILITY[index]}
          />
        ))}
      </div>
      <ul className="sr-only">
        {reviews.map((review) => (
          <li key={review.slug}>
            <blockquote>
              <PortableText value={review.text} />
              <footer>
                {review.person.name}, {review.client}
              </footer>
            </blockquote>
          </li>
        ))}
      </ul>
    </>
  );
}
