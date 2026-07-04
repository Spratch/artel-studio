import { getFooterSettings } from "@/sanity/lib/getters";
import Link from "next/link";
import Logo from "./Logo";

export default async function Footer() {
  const footer = await getFooterSettings();

  if (!footer) return null;
  return (
    <footer className="relative grid min-h-(--h-section) grid-cols-6 content-start gap-x-2.5 gap-y-17 overflow-hidden bg-ardoise px-6 py-34 font-serif text-creme">
      {/* Contact */}
      <div className="col-span-1 flex flex-col gap-10">
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
        className="col-span-3 text-4xl text-balance"
        style={{
          textBox: "trim-both cap alphabetic"
        }}
      >
        {footer.footerSentence}
      </p>

      {/* Social */}
      {footer.socials && footer.socials.length > 0 && (
        <div className="col-span-1 col-start-2 flex flex-col gap-10">
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
        <div className="col-span-2 col-start-3 flex flex-col gap-10">
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
      <Logo className="footer-logo absolute bottom-[-7vw] fill-transparent stroke-creme stroke-1 px-6" />
    </footer>
  );
}
