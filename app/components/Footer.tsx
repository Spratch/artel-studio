import { getFooterSettings } from "@/sanity/lib/getters";
import Link from "next/link";
import Logo from "./Logo";

export default async function Footer() {
  const footer = await getFooterSettings();

  if (!footer) return null;
  return (
    <footer className="relative flex min-h-(--h-section) grid-cols-6 flex-col content-start gap-x-2.5 gap-y-10 overflow-hidden bg-ardoise px-3 pt-16 pb-44 font-serif text-creme sm:grid sm:gap-y-17 sm:px-6 sm:pt-34 sm:pb-96">
      {/* Contact */}
      <div className="col-span-1 flex flex-col gap-6 sm:gap-10">
        <h2>Contact</h2>

        <div className="flex flex-col gap-5">
          {footer.contact.email && (
            <Link
              className="text-sm"
              href={`mailto:${footer.contact.email}`}
            >
              {footer.contact.email.replace("@", "(at)")}
            </Link>
          )}

          {footer.contact.phone && (
            <Link
              className="text-sm"
              href={`tel:${footer.contact.phone}`}
            >
              {footer.contact.phone}
            </Link>
          )}

          {footer.contact.address && (
            <Link
              className="text-sm whitespace-pre-line"
              href={`https://maps.google.com/?q=${footer.contact.address.replace(/\s+/g, "+")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {footer.contact.address}
            </Link>
          )}
        </div>
      </div>

      {/* Sentence */}
      <p
        className="col-span-3 text-3xl text-balance sm:text-4xl"
        style={{
          textBox: "trim-both cap alphabetic"
        }}
      >
        {footer.footerSentence}
      </p>

      {/* Social */}
      {footer.socials && footer.socials.length > 0 && (
        <div className="col-span-1 col-start-2 flex flex-col gap-6 sm:gap-10">
          <h2>Social</h2>

          <div className="flex flex-col text-sm">
            {footer.socials.map((social) => (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Jobs */}
      {footer.jobs && (
        <div className="col-span-2 col-start-3 flex flex-col gap-6 sm:gap-10">
          <h2>{footer.jobs.title}</h2>

          <p className="text-sm">{footer.jobs.text}</p>

          {footer.jobs.link && (
            <Link
              href={footer.jobs.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline"
            >
              En savoir plus
            </Link>
          )}
        </div>
      )}

      {/* Logo */}
      <Logo className="footer-logo absolute bottom-[-7vw] mask-b-from-20% mask-b-to-80% fill-transparent stroke-creme stroke-1 pr-3 sm:px-6" />
    </footer>
  );
}
