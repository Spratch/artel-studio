"use client";

import { HeaderSettingsQueryResult } from "@/sanity.types";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderLinkProps = {
  item: NonNullable<HeaderSettingsQueryResult>[number];
};

export default function HeaderLink({ item }: HeaderLinkProps) {
  const pathname = usePathname();
  return (
    <Link
      href={`/${item.slug}`}
      className={`ml-6 text-sm font-medium underline-offset-2 ${pathname === `/${item.slug}` ? "underline" : ""}`}
    >
      {item.title}
    </Link>
  );
}
