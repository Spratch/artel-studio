"use client";
import { useReducedMotion } from "motion/react";

import { MethodObjectSettings } from "@/sanity.types";
import gsap from "gsap";
import { PortableText } from "next-sanity";
import { useEffect, useMemo, useRef } from "react";
import { ContentResultType } from "../types";
import { cn } from "../utils";

type ReviewItemType = ContentResultType<"reviews", "reviews">[number];
type MethodItemType = ContentResultType<"method", "method">[number];
type ItemType = ReviewItemType | MethodItemType;
type SettingsType = MethodObjectSettings;

const COLUMN_COUNT = 6; // 12/2
const COLUMN_VISIBILITY = [
  "block",
  "hidden sm:block",
  "hidden sm:block",
  "hidden lg:block",
  "hidden lg:block",
  "hidden lg:block"
];

function rotateArray<T>(items: T[], offset: number): T[] {
  if (items.length === 0) return items;
  const adaptedOffset = offset % items.length;
  return [...items.slice(adaptedOffset), ...items.slice(0, adaptedOffset)];
}

function splitIntoColumns<T>(
  items: T[],
  columns: number,
  isReview: boolean = false
): T[][] {
  if (isReview) {
    const result: T[][] = Array.from({ length: columns }, () => []);
    (items.length < 6 ? [...items, ...items] : items).forEach((item, index) =>
      result[index % columns].push(item)
    );
    return result;
  } else {
    if (items.length === 0) return Array.from({ length: columns }, () => []);

    return Array.from({ length: columns }, (_, i) => {
      return rotateArray(items, (i - 1) % items.length);
    });
  }
}

function getMarginFromSlug(slug: string, gapRange: SettingsType["gapRange"]) {
  const hash = [...slug].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return gapRange.min + (hash % (gapRange.max - gapRange.min + 1));
}

function ReviewItem({
  review,
  gapRange
}: {
  review: ReviewItemType;
  gapRange: SettingsType["gapRange"];
}) {
  const randomMargin = getMarginFromSlug(review.slug, gapRange);
  return (
    <div style={{ marginBottom: `calc(var(--spacing) * ${randomMargin})` }}>
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

function MethodItem({
  method,
  gapRange
}: {
  method: MethodItemType & { position: string };
  gapRange: SettingsType["gapRange"];
}) {
  const randomMargin = getMarginFromSlug(method._key, gapRange);
  return (
    <div style={{ marginTop: `calc(var(--spacing) * ${randomMargin})` }}>
      <div className="flex items-center gap-1.5 py-0.5 sm:gap-2">
        <span className="size-2 rounded-full bg-orange sm:size-3"></span>
        <span className="text-sm text-nowrap text-orange">
          {method.position}
        </span>
      </div>

      <p className="mb-4 text-sm text-bleu-clair">{method.title}</p>
      <p className="font-serif text-sm">{method.description}</p>
    </div>
  );
}

function ItemsColumn({
  items,
  duration,
  reverse = false,
  gapRange,
  className
}: {
  items: (ItemType & { position: string })[];
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
    if (!track || !items.length || prefersReducedMotion) return;

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
  }, [items, duration, reverse, prefersReducedMotion]);
  if (items.length === 0) return;

  const looped = items.length < 4 ? [...items, ...items] : items;

  return (
    <div className={cn("relative col-span-2 overflow-hidden", className)}>
      <div
        ref={trackRef}
        className="flex flex-col will-change-transform"
      >
        {[...looped, ...looped].map((item, i) => {
          return "slug" in item ? (
            <ReviewItem
              key={`${item.slug}-${i}`}
              review={item}
              gapRange={gapRange}
            />
          ) : (
            <MethodItem
              key={`${item._key}-${i}`}
              method={item}
              gapRange={gapRange}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function VerticalMarquee({
  items,
  settings
}: {
  items: ItemType[];
  settings: SettingsType;
}) {
  const columns = useMemo(
    () =>
      splitIntoColumns(
        items.map((item, index) => ({
          ...item,
          position: `${index + 1} sur ${items.length}`
        })),
        COLUMN_COUNT,
        "slug" in items[0]
      ),
    [items]
  );

  return (
    <>
      <div
        className="absolute grid h-full grid-cols-2 gap-x-2.5 pr-4 sm:grid-cols-6 lg:grid-cols-12"
        aria-hidden="true"
        role="presentation"
      >
        {columns.map((columnReviews, index) => (
          <ItemsColumn
            key={index}
            items={columnReviews}
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
        {items.map((item) => {
          return "slug" in item ? (
            <li key={item.slug}>
              <blockquote>
                <PortableText value={item.text} />
                <footer>
                  {item.person.name}, {item.client}
                </footer>
              </blockquote>
            </li>
          ) : (
            <li key={item._key}>
              <p>{item.title}</p>
              <p>{item.description}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
