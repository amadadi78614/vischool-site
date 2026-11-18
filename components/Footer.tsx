import Link from "next/link";
import { HOURS, NAV, SITE, fullAddress } from "@/lib/site";
import { Logo } from "./Logo";
import { IconMail, IconPhone, IconPin } from "./Icons";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-deep text-white/80">
      <div className="grain absolute inset-0 opacity-60" aria-hidden />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
            A Foundation Phase school in Valencia Park, Mbombela. CAPS curriculum with optional Islamic Studies.
          </p>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-sun">Pages</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-sun">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2.5"><IconPin className="mt-0.5 h-4 w-4 shrink-0 text-sun" />{fullAddress}</li>
            <li><a href={`tel:${SITE.phoneIntl}`} className="flex gap-2.5 hover:text-white"><IconPhone className="h-4 w-4 text-sun" />{SITE.phoneDisplay}</a></li>
            <li><a href={`mailto:${SITE.email}`} className="flex gap-2.5 hover:text-white"><IconMail className="h-4 w-4 text-sun" />{SITE.email}</a></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-sun">School hours</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {HOURS.map((h) => (
              <li key={h.days} className="flex justify-between gap-4 border-b border-white/10 pb-2">
                <span>{h.days}</span>
                <span className="font-semibold text-white">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>
            {SITE.registration} · EMIS {SITE.emis} · Enterprise No. {SITE.enterpriseNo}
          </p>
        </div>
      </div>
    </footer>
  );
}
