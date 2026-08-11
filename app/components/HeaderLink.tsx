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
      className={`ml-6 text-sm font-medium underline-offset-2 outline-0 ${pathname === `/${item.slug}` ? "cursor-default underline" : "decoration-dashed underline-offset-2 hover:underline focus-visible:underline"}`}
    >
      {item.title}
    </Link>
  );
}
