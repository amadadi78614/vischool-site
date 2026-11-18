"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site";
import { Logo } from "./Logo";
import { IconMenu, IconPhone, IconX } from "./Icons";

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => (href === "/" ? path === "/" : path?.startsWith(href.replace(/\/$/, "")));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-cream/80 shadow-[0_1px_0_rgb(22_36_30/0.06)] backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="container-x flex h-[76px] items-center justify-between gap-6">
          <Link href="/" aria-label={`${SITE.name} home`} className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={isActive(n.href) ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-[0.92rem] font-semibold transition ${
                  isActive(n.href) ? "bg-forest text-white" : "text-ink/75 hover:bg-ink/5 hover:text-ink"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link href="/admissions/#enquire" className="btn btn-sun !px-5 !py-2.5">
              Enquire {SITE.admissionsYear}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-soft ring-1 ring-ink/10 lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <IconMenu />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <div
          role="dialog"
          aria-label="Menu"
          className={`absolute inset-x-3 top-3 rounded-[2rem] bg-cream p-5 shadow-lift transition-all duration-300 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
          }`}
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-11 w-11 place-items-center rounded-full bg-white ring-1 ring-ink/10"
              aria-label="Close menu"
            >
              <IconX />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-6 grid gap-1">
            {NAV.map((n, i) => (
              <Link
                key={n.href}
                href={n.href}
                tabIndex={open ? 0 : -1}
                className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-2xl transition ${
                  isActive(n.href) ? "bg-forest text-white" : "hover:bg-ink/5"
                }`}
                style={{ transitionDelay: open ? `${i * 30}ms` : "0ms" }}
              >
                {n.label}
                <span className="text-base opacity-50">0{i + 1}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <a href={`tel:${SITE.phoneIntl}`} tabIndex={open ? 0 : -1} className="btn btn-ghost">
              <IconPhone /> Call
            </a>
            <Link href="/admissions/#enquire" tabIndex={open ? 0 : -1} className="btn btn-sun">
              Enquire
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
