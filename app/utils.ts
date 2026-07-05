import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ItemSizesType } from "./components/FloatingServices";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface LayoutItem {
  x: number;
  y: number;
  rotation: number;
  borderRadius: number;
}

export function generateServicesLayout(
  itemSizes: ItemSizesType,
  width: number,
  height: number,
  iterations = 150
): LayoutItem[] {
  const padding = 20;

  // Random positioning (centered for each item)
  const positions = itemSizes.map((size) => ({
    x: Math.random() * (width - size.width) + size.width / 2,
    y: Math.random() * (height - size.height) + size.height / 2,
    w: size.width,
    h: size.height
  }));

  // Repulsion algorithm to avoid overlaps
  for (let iter = 0; iter < iterations; iter++) {
    let moved = false;

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const a = positions[i];
        const b = positions[j];

        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const minDistX = (a.w + b.w) / 2 + padding;
        const minDistY = (a.h + b.h) / 2 + padding;

        const overlapX = minDistX - Math.abs(dx);
        const overlapY = minDistY - Math.abs(dy);

        // Overlap only if both x and y overlaps are positive
        if (overlapX > 0 && overlapY > 0) {
          moved = true;
          if (overlapX < overlapY) {
            const push = (overlapX / 2) * (dx >= 0 ? 1 : -1);
            a.x -= push;
            b.x += push;
          } else {
            const push = (overlapY / 2) * (dy >= 0 ? 1 : -1);
            a.y -= push;
            b.y += push;
          }
        }
      }
    }

    // Reclamping positions to stay within bounds
    positions.forEach((p) => {
      p.x = Math.max(p.w / 2, Math.min(width - p.w / 2, p.x));
      p.y = Math.max(p.h / 2, Math.min(height - p.h / 2, p.y));
    });

    if (!moved) break;
  }

  return positions.map((p) => ({
    x: p.x - p.w / 2,
    y: p.y - p.h / 2,
    rotation: (Math.random() - 0.5) * 32,
    borderRadius: Math.random() * 50 + -10
  }));
}
