"use client";

import { HeaderSettingsQueryResult } from "@/sanity.types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function Header({
  navigation
}: {
  navigation: HeaderSettingsQueryResult;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const threshold = 50;

    const onScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-40 flex h-(--h-header) w-full items-center justify-between gap-2.5 py-3 font-serif transition-[padding] ${isScrolled ? "px-5 sm:px-7" : "px-3"}`}
    >
      <Link
        href="/"
        className="flex h-full items-center justify-center rounded-md bg-(--background-color) px-4 outline-0 transition-colors hover:[--text-color:var(--color-rouge)] focus-visible:[--text-color:var(--color-rouge)]"
      >
        <Logo className="h-5 fill-(--text-color)" />
      </Link>

      {navigation && (
        <nav className="flex h-full grow items-center justify-end gap-6 rounded-md bg-(--background-color) px-4 text-(--text-color)">
          {navigation.map((item) => (
            <HeaderLink
              key={item.slug}
              item={item}
            />
          ))}
        </nav>
      )}
    </header>
  );
}

type HeaderLinkProps = {
  item: NonNullable<HeaderSettingsQueryResult>[number];
};

function HeaderLink({ item }: HeaderLinkProps) {
  const pathname = usePathname();
  return (
    <Link
      href={`/${item.slug}`}
      className={`text-sm font-medium underline-offset-2 outline-0 ${pathname === `/${item.slug}` ? "cursor-default underline" : "decoration-dashed underline-offset-2 hover:underline focus-visible:underline"}`}
    >
      {item.title}
    </Link>
  );
}
