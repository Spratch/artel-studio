"use client";

import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useReducedMotion } from "motion/react";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { generateServicesLayout } from "../utils";

gsap.registerPlugin(Draggable, InertiaPlugin);

type FloatingServicesProps = {
  items: {
    name: string;
    slug: string;
    color: string;
  }[];
};

export type ItemSizesType = { width: number; height: number }[];

export default function FloatingServices({ items }: FloatingServicesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [itemSizes, setItemSizes] = useState<ItemSizesType>([]);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let timeout: NodeJS.Timeout;
    const observer = new ResizeObserver((entries) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const { width, height } = entries[0].contentRect;
        setContainerSize({ width, height });
      }, 150);
    });
    observer.observe(el);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    if (!containerSize.width) return;
    const sizes = itemsRef.current.map((el) => {
      if (!el) return { width: 0, height: 0 };
      const rect = el.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    });
    setItemSizes(sizes);
  }, [containerSize, items.length]);

  const layout = useMemo(() => {
    if (!itemSizes || !containerSize.width || !containerSize.height) return [];
    return generateServicesLayout(
      itemSizes,
      containerSize.width,
      containerSize.height
    );
  }, [itemSizes, containerSize]);

  useLayoutEffect(() => {
    if (!layout || !layout.length) return;

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el, i) => {
        if (!el || !layout[i]) return;

        gsap.set(el, {
          x: layout[i].x / 1.2,
          y: layout[i].y,
          rotation: layout[i].rotation,
          "--border-radius": `${layout[i].borderRadius}px`
        });

        let floatTween = createFloatTween(el);

        function createFloatTween(target: HTMLDivElement) {
          if (prefersReducedMotion) return gsap.to(target, {});
          return gsap.to(target, {
            y: `+=14`,
            x: `+=6`,
            rotation: `+=${gsap.utils.random(-3, 3)}`,
            duration: gsap.utils.random(2.5, 4.5),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: gsap.utils.random(0, 1.2)
          });
        }

        Draggable.create(el, {
          bounds: containerRef.current,
          inertia: true,
          onPress() {
            gsap.to(el, { scale: 0.85, duration: 0.2 });
            el.setAttribute("data-dragging", "true");
            floatTween.kill();
          },
          onDrag() {
            gsap.to(el, {
              rotation: gsap.utils.clamp(-16, 16, this.deltaX * 1.5),
              duration: 0.3,
              overwrite: "auto"
            });
          },
          onRelease() {
            gsap.to(el, { scale: 1, duration: 0.2 });
            el.removeAttribute("data-dragging");
          },
          onThrowComplete() {
            floatTween = createFloatTween(el);
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [layout, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      {items.map((item, i) => (
        <div
          key={item.slug}
          ref={(el) => {
            itemsRef.current[i] = el;
          }}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            opacity: layout.length ? 1 : 0
          }}
          className="group/service transition-opacity duration-500"
        >
          <div
            className="rounded-(--border-radius) border border-(--section-button-bg) bg-(--section-bg) px-5 py-3 font-serif text-2xl text-(--section-button-bg) transition-colors group-data-dragging/service:border-(--item-color) group-data-dragging/service:bg-(--item-color) group-data-dragging/service:text-noir-profond hover:border-(--item-color) hover:bg-(--item-color) hover:text-noir-profond sm:px-7 sm:pt-4.5 sm:pb-5 sm:text-3xl"
            style={
              {
                "--item-color": item.color
              } as React.CSSProperties
            }
          >
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
}
