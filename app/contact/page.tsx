import type { Metadata } from "next";
import Link from "next/link";
import { HOURS, SITE, fullAddress, waLink } from "@/lib/site";
import { PageHero } from "@/components/Section";
import { OpenStatus } from "@/components/Live";
import { IconArrow, IconClock, IconMail, IconPhone, IconPin, IconWhatsApp } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact Valencia Islamic School: ${fullAddress}. Phone ${SITE.phoneDisplay}, email ${SITE.email}.`,
  alternates: { canonical: "/contact/" },
};

export default function Contact() {
  const mapQ = encodeURIComponent(`${fullAddress}, South Africa`);
  const cards = [
    { Icon: IconPhone, k: "Call", v: SITE.phoneDisplay, href: `tel:${SITE.phoneIntl}`, tone: "bg-leaf/10 text-leaf" },
    { Icon: IconWhatsApp, k: "WhatsApp", v: "Message the office", href: waLink(`Hello ${SITE.short}, `), tone: "bg-[#25D366]/15 text-[#128C4B]" },
    { Icon: IconMail, k: "Email", v: SITE.email, href: `mailto:${SITE.email}`, tone: "bg-sky/10 text-sky" },
  ];

  return (
    <>
      <PageHero eyebrow="Contact" title="We'd love to hear from you" intro="Call, WhatsApp or email the office, or visit us in Valencia Park.">
        <div className="mt-6"><OpenStatus /></div>
      </PageHero>

      <section className="pb-24 sm:pb-32">
        <div className="container-x grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <div className="min-w-0 space-y-4">
            {cards.map(({ Icon, k, v, href, tone }) => (
              <a key={k} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                className="reveal card group flex items-center gap-5 p-6 transition hover:-translate-y-0.5 hover:shadow-lift">
                <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${tone}`}><Icon className="h-6 w-6" /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-muted">{k}</span>
                  <span className="block break-words font-display text-xl font-semibold">{v}</span>
                </span>
                <IconArrow className="h-5 w-5 text-muted transition group-hover:translate-x-1" />
              </a>
            ))}

            <div className="reveal card p-6">
              <p className="flex items-center gap-2 text-sm font-semibold text-muted"><IconClock /> School hours</p>
              <ul className="mt-3 space-y-2">
                {HOURS.map((h) => (
                  <li key={h.days} className="flex justify-between border-b border-ink/5 pb-2 last:border-0">
                    <span>{h.days}</span><span className="font-semibold">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="reveal card min-w-0 overflow-hidden">
            <iframe
              title={`Map to ${SITE.name}`}
              src={`https://maps.google.com/maps?q=${mapQ}&z=15&output=embed`}
              className="h-[380px] w-full border-0 lg:h-[460px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="flex flex-wrap items-center justify-between gap-4 p-6">
              <p className="flex items-start gap-3">
                <IconPin className="mt-1 h-5 w-5 text-coral" />
                <span><b className="block font-display text-lg">{SITE.address.street}</b>{SITE.address.suburb}, {SITE.address.city}, {SITE.address.postalCode}</span>
              </p>
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${mapQ}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Directions <IconArrow />
              </a>
            </div>
          </div>
        </div>

        <div className="container-x mt-10">
          <div className="reveal flex flex-col items-start justify-between gap-4 rounded-3xl bg-sand p-8 sm:flex-row sm:items-center">
            <p className="font-display text-2xl font-semibold">Looking for a place for {SITE.admissionsYear}?</p>
            <Link href="/admissions/#enquire" className="btn btn-primary">Start an enquiry <IconArrow /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
