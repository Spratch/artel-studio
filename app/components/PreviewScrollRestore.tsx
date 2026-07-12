"use client";

import { useEffect } from "react";

export function PreviewScrollRestore() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("preview") !== "true") return;

    const key = `preview-scroll:${window.location.pathname}`;

    // Restaure la position dès que possible
    const saved = sessionStorage.getItem(key);
    if (saved) {
      const y = parseInt(saved, 10);
      // rAF x2 pour laisser le layout se stabiliser après hydratation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => window.scrollTo(0, y));
      });
    }

    // Sauvegarde en continu
    const onScroll = () => {
      sessionStorage.setItem(key, String(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
