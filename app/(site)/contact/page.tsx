import Carousel from "@/app/components/Carousel";
import Logo from "@/app/components/Logo";
import { getContactPage, getFooterSettings } from "@/sanity/lib/getters";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Contact({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const contact = await getContactPage({ searchParams: await searchParams });
  const infos = await getFooterSettings();
  if (!contact) notFound();

  return (
    <main
      className={`contact-page relative flex min-h-svh flex-col gap-3 overflow-hidden overflow-x-hidden bg-(--background-color) px-3 pt-(--h-header) pb-[28vw] text-(--text-color) pbg-${contact.pageColors.backgroundColor.slug} ptxt-${contact.pageColors.textColor.slug}`}
      style={
        {
          "--background-color": contact.pageColors.backgroundColor.value,
          "--text-color": contact.pageColors.textColor.value
        } as React.CSSProperties
      }
    >
      <section
        className={`relative z-10 flex min-h-(--h-section) flex-col rounded-xl bg-(--section-bg) text-(--section-text)`}
        style={
          {
            "--section-bg": contact.sectionColors.backgroundColor,
            "--section-text": contact.sectionColors.textColor
          } as React.CSSProperties
        }
      >
        <div
          className={`grid grow grid-cols-3 items-start gap-x-2.5 gap-y-12 p-4 sm:grid-cols-6`}
        >
          <div
            className={`col-span-3 grid h-full grid-cols-3 items-start gap-x-2.5 gap-y-12 sm:col-span-4 sm:grid-cols-4`}
          >
            <div
              className={`col-span-3 flex h-full flex-col justify-between gap-10`}
            >
              <h2 className="font-serif text-3xl">{contact.sentence}</h2>

              {infos && (
                <div
                  className={`flex flex-col items-start gap-x-2.5 gap-y-4 font-serif text-base/tight sm:grid sm:grid-cols-3 lg:grid-cols-3`}
                >
                  <div className="flex flex-col gap-7">
                    <h3 className="font-serif text-3xl">Contact</h3>

                    <div className="flex flex-col">
                      {infos.contact.email && (
                        <Link
                          className="text-sm"
                          href={`mailto:${infos.contact.email}`}
                        >
                          {infos.contact.email.replace("@", "(at)")}
                        </Link>
                      )}

                      {infos.contact.phone && (
                        <Link
                          className="text-sm"
                          href={`tel:${infos.contact.phone}`}
                        >
                          {infos.contact.phone}
                        </Link>
                      )}

                      {infos.contact.address && (
                        <Link
                          className="text-sm whitespace-pre-line"
                          href={`https://maps.google.com/?q=${infos.contact.address.replace(/\s+/g, "+")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {infos.contact.address}
                        </Link>
                      )}
                    </div>
                  </div>

                  {infos.socials && (
                    <div className="flex flex-col gap-7">
                      <h3 className="font-serif text-3xl">Social</h3>

                      <div className="flex flex-col text-sm">
                        {infos.socials.map((social) => (
                          <Link
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="lowercase"
                          >
                            {social.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {infos.jobs && (
                    <div className="flex flex-col gap-7">
                      <h3 className="font-serif text-3xl">
                        {infos.jobs.title}
                      </h3>

                      <p className="text-sm">{infos.jobs.text}</p>

                      {infos.jobs.link && (
                        <Link
                          href={infos.jobs.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm underline"
                        >
                          En savoir plus
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {contact.gallery && contact.gallery.length && (
            <div className="col-span-3 flex h-full justify-end max-sm:aspect-2/3 sm:col-span-2 sm:col-end-7">
              <Carousel medias={contact.gallery}></Carousel>
            </div>
          )}
        </div>
      </section>

      <Logo className="footer-logo fixed bottom-[-7vw] z-0 mask-b-from-20% mask-b-to-80% fill-transparent stroke-creme stroke-1 pr-3 sm:px-7" />
    </main>
  );
}
