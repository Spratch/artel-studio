import { getHeaderSettings } from "@/sanity/lib/getters";
import Link from "next/link";
import HeaderLink from "./HeaderLink";
import Logo from "./Logo";

export default async function Header() {
  const navigation = await getHeaderSettings();
  return (
    <header className="fixed top-0 z-40 flex h-(--h-header) w-full items-center justify-between gap-2.5 px-3 py-3 font-serif sm:px-7">
      <Link
        href="/"
        className="flex h-full items-center justify-center rounded-md bg-(--background-color) px-4"
      >
        <Logo className="h-5 fill-(--text-color)" />
      </Link>

      {navigation && (
        <nav className="flex h-full grow items-center justify-end rounded-md bg-(--background-color) px-4 text-(--text-color)">
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
