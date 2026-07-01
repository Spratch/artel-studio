import { getHeaderSettings } from "@/sanity/lib/getters";
import Link from "next/link";
import Logo from "./Logo";

export default async function Header() {
  const navigation = await getHeaderSettings();
  console.log(navigation);
  return (
    <header className="sticky top-0 flex items-center justify-between p-3">
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
