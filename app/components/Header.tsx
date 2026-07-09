import { getHeaderSettings } from "@/sanity/lib/getters";
import Link from "next/link";
import Logo from "./Logo";

export default async function Header() {
  const navigation = await getHeaderSettings();
  return (
    <header className="fixed top-0 z-40 flex h-(--h-header) w-full items-center justify-between gap-2.5 px-7 py-3 font-serif">
      <Link
        href="/"
        className="flex h-full items-center justify-center rounded-md bg-(--background-color)/80 px-4 backdrop-blur-sm"
      >
        <Logo className="h-5 fill-(--text-color)" />
      </Link>

      {navigation && (
        <nav className="flex h-full grow items-center justify-end rounded-md bg-(--background-color)/80 px-4 text-(--text-color) backdrop-blur-sm">
          {navigation.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              className="ml-6 text-sm font-medium"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
