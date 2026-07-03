import { getHeaderSettings } from "@/sanity/lib/getters";
import Link from "next/link";
import Logo from "./Logo";

export default async function Header() {
  const navigation = await getHeaderSettings();
  return (
    <header className="fixed top-0 flex h-(--h-header) w-full items-center justify-between p-3 font-serif">
      <Link href="/">
        <Logo className="h-5" />
      </Link>
      {navigation && (
        <nav className="flex items-baseline justify-end">
          {navigation.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              className="ml-6 text-sm font-medium text-gray-900 hover:text-gray-700"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
