import Link from "next/link";
import { CURRICULUM, HOURS, SITE, WORKSHEETS, fullAddress } from "@/lib/site";
import { LogoMark } from "@/components/Logo";
import { Greeting, OpenStatus } from "@/components/Live";
import { GradeFinder } from "@/components/GradeFinder";
import { Blobs, SectionHead } from "@/components/Section";
import { IconArrow, IconBook, IconCheck, IconClock, IconMoon, IconPhone, IconPin, IconShield, IconSpark } from "@/components/Icons";

const TONES = {
  leaf: { bar: "bg-leaf", soft: "bg-leaf/10", text: "text-leaf", Icon: IconBook },
  plum: { bar: "bg-plum", soft: "bg-plum/10", text: "text-plum", Icon: IconMoon },
  sky: { bar: "bg-sky", soft: "bg-sky/10", text: "text-sky", Icon: IconSpark },
} as const;

export default function Home() {
  return (
    <>
      {/* HERO — fits one screen */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[76px]">
        <div className="dot-grid absolute inset-0 [mask-image:radial-gradient(60%_60%_at_70%_40%,black,transparent)]" aria-hidden />
        <Blobs />

        <div className="container-x relative grid flex-1 items-center gap-10 py-8 lg:grid-cols-[1.2fr_0.8fr] lg:py-0">
          <div>
            <div className="fade-up flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-forest px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                Admissions open · {SITE.admissionsYear}
              </span>
              <OpenStatus />
            </div>

            <p className="fade-up mt-6 font-display text-lg italic text-leaf sm:text-2xl" style={{ animationDelay: "60ms" }}>
              <Greeting /> to Valencia Islamic School
            </p>
            <h1
              className="fade-up mt-2 text-[2.5rem] font-semibold leading-[1] sm:text-6xl xl:text-[4.15rem]"
              style={{ animationDelay: "120ms" }}
            >
              Nurturing minds,
              <br />
              building{" "}
              <span className="relative inline-block">
                character
                <svg viewBox="0 0 300 14" className="absolute -bottom-2 left-0 h-3 w-full text-sun" preserveAspectRatio="none" aria-hidden>
                  <path d="M2 10 C 80 2, 200 2, 298 8" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="fade-up mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-xl" style={{ animationDelay: "180ms" }}>
              A caring Foundation Phase school for Grade RR to Grade 3 in Valencia Park, Mbombela. The national CAPS
              curriculum, with optional Islamic Studies.
            </p>
            <div className="fade-up mt-7 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
              <Link href="/admissions/#enquire" className="btn btn-primary !px-6 !py-3.5 text-base sm:!px-7">
                Enquire for {SITE.admissionsYear} <IconArrow />
              </Link>
              <Link href="/academics/" className="btn btn-ghost !px-6 !py-3.5 text-base sm:!px-7">
                Curriculum
              </Link>
            </div>
          </div>

          {/* Visual */}
          <div className="relative mx-auto hidden aspect-square w-full max-w-[460px] lg:block">
            <div className="absolute inset-6 rounded-[45%_55%_50%_50%/55%_45%_55%_45%] bg-gradient-to-br from-sun/40 via-cream to-leaf/20" />
            <div className="absolute inset-14 rounded-full bg-paper shadow-lift ring-1 ring-ink/5" />
            <LogoMark animate className="absolute inset-[4.5rem] h-[calc(100%-9rem)] w-[calc(100%-9rem)]" />

            <div className="float-a absolute -left-4 top-10 rounded-2xl bg-white px-4 py-3 shadow-lift ring-1 ring-ink/5">
              <p className="text-xs font-semibold text-muted">Grades</p>
              <p className="font-display text-xl font-semibold">RR – 3</p>
            </div>
            <div className="float-b absolute -right-6 bottom-28 rounded-2xl bg-white px-4 py-3 shadow-lift ring-1 ring-ink/5">
              <p className="flex items-center gap-1.5 text-sm font-semibold"><IconCheck className="h-4 w-4 text-leaf" /> CAPS curriculum</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold"><IconCheck className="h-4 w-4 text-plum" /> Islamic Studies (optional)</p>
            </div>
            <div className="float-c absolute bottom-4 left-0 flex items-center gap-2.5 rounded-2xl bg-forest px-4 py-3 text-white shadow-lift">
              <IconShield className="h-5 w-5 text-sun" />
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-white/70">Registered · EMIS</p>
                <p className="font-semibold">{SITE.emis}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info bar */}
        <div className="container-x relative pb-6">
          <div className="fade-up grid gap-px overflow-hidden rounded-3xl bg-ink/10 text-sm ring-1 ring-ink/10 sm:grid-cols-3" style={{ animationDelay: "320ms" }}>
            <div className="flex items-center gap-3 bg-paper px-5 py-4">
              <IconClock className="h-5 w-5 text-leaf" />
              <span><b>Mon – Thu</b> 07:30 – 13:30 · <b>Fri</b> 07:30 – 11:30</span>
            </div>
            <a href={`tel:${SITE.phoneIntl}`} className="flex items-center gap-3 bg-paper px-5 py-4 transition hover:bg-white">
              <IconPhone className="h-5 w-5 text-leaf" />
              <span><b>{SITE.phoneDisplay}</b> · tap to call</span>
            </a>
            <Link href="/contact/" className="flex items-center gap-3 bg-paper px-5 py-4 transition hover:bg-white">
              <IconPin className="h-5 w-5 text-leaf" />
              <span className="truncate">{fullAddress}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionHead
            eyebrow="Our curriculum"
            title="Strong foundations, taught with care"
            intro="Every child follows the national CAPS curriculum. Families can add Islamic Studies, and every learner gets sport, computers and outings."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {CURRICULUM.map((c) => {
              const t = TONES[c.tone];
              return (
                <article key={c.key} className="reveal card group relative overflow-hidden p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <div className={`absolute inset-x-0 top-0 h-1.5 ${t.bar}`} />
                  <div className={`grid h-12 w-12 place-items-center rounded-2xl ${t.soft} ${t.text}`}>
                    <t.Icon />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold">{c.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {c.items.map(([k, v]) => (
                      <li key={k} className="flex gap-3 text-[0.95rem]">
                        <IconCheck className={`mt-1 h-4 w-4 shrink-0 ${t.text}`} />
                        <span><b className="font-semibold">{k}.</b> <span className="text-muted">{v}</span></span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
          <div className="reveal mt-10">
            <Link href="/academics/" className="inline-flex items-center gap-2 font-semibold text-forest hover:gap-3 transition-all">
              Full curriculum and how we assess <IconArrow />
            </Link>
          </div>
        </div>
      </section>

      {/* PRINCIPAL */}
      <section className="relative overflow-hidden bg-forest py-24 text-white sm:py-32">
        <div className="grain absolute inset-0" aria-hidden />
        <div className="absolute -right-32 top-1/2 h-[520px] w-[520px] -translate-y-1/2 opacity-[0.08]" aria-hidden>
          <LogoMark className="h-full w-full" />
        </div>
        <div className="container-x relative grid gap-12 lg:grid-cols-[auto_1fr] lg:items-center">
          <div className="reveal grid h-40 w-40 place-items-center rounded-[2.5rem] bg-sun font-display text-6xl font-semibold text-forest-deep shadow-lift">
            RM
          </div>
          <div className="reveal">
            <span className="eyebrow !text-sun">Message from the principal</span>
            <blockquote className="mt-4 font-display text-2xl leading-snug sm:text-[2rem]">
              “We believe that every child is unique and deserves individual attention to reach their full potential.”
            </blockquote>
            <p className="mt-6 font-semibold">{SITE.principal.name}</p>
            <p className="text-sm text-white/60">{SITE.principal.title}</p>
            <Link href="/about/" className="btn btn-sun mt-8">Read the full welcome <IconArrow /></Link>
          </div>
        </div>
      </section>

      {/* GRADE FINDER + HOURS */}
      <section className="py-24 sm:py-32">
        <div className="container-x grid gap-8 lg:grid-cols-[1.25fr_1fr]">
          <div className="reveal"><GradeFinder /></div>
          <div className="reveal card flex flex-col p-7 sm:p-9">
            <span className="eyebrow">School hours</span>
            <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">A school day at VIS</h3>
            <div className="mt-3"><OpenStatus /></div>
            <ul className="mt-6 flex-1 space-y-3">
              {HOURS.map((h) => (
                <li key={h.days} className="flex items-center justify-between rounded-2xl bg-sand/60 px-4 py-3.5">
                  <span className="font-semibold">{h.days}</span>
                  <span className="font-display text-lg">{h.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted">
              Assessment is continuous. There are no formal exams in the Foundation Phase, and you receive a report card
              every term.
            </p>
          </div>
        </div>
      </section>

      {/* WORKSHEETS TEASER */}
      <section className="pb-24 sm:pb-32">
        <div className="container-x">
          <div className="reveal relative overflow-hidden rounded-[2.5rem] bg-sand p-8 sm:p-14">
            <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="eyebrow">Worksheets</span>
                <h2 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">Practice at home with our teachers&apos; worksheets</h2>
                <p className="mt-4 text-lg text-muted">
                  Printable worksheets for Grade RR to Grade 3, made by VIS teachers and aligned to CAPS. R10 each.
                </p>
                <Link href="/learning-shelf/" className="btn btn-primary mt-8">Browse worksheets <IconArrow /></Link>
              </div>
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {WORKSHEETS.slice(0, 3).map((w, i) => (
                  <div key={w.id} className={`rounded-2xl bg-white p-3 shadow-soft sm:p-4 ${i === 1 ? "translate-y-6" : ""}`}>
                    <div className={`aspect-[3/4] rounded-xl ${["bg-sky/15", "bg-coral/15", "bg-plum/15"][i]} p-3`}>
                      <div className={`h-1.5 w-10 rounded-full ${["bg-sky", "bg-coral", "bg-plum"][i]}`} />
                      <div className="mt-2 h-1 w-14 rounded-full bg-ink/10" />
                      <div className="mt-1 h-1 w-10 rounded-full bg-ink/10" />
                    </div>
                    <p className="mt-2 truncate text-xs font-semibold sm:text-sm">{w.title}</p>
                    <p className="text-[0.7rem] text-muted">{w.grade}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 sm:pb-32">
        <div className="container-x">
          <div className="reveal relative overflow-hidden rounded-[2.5rem] bg-ink px-8 py-16 text-center text-white sm:py-20">
            <div className="grain absolute inset-0" aria-hidden />
            <div className="absolute -left-10 -top-10 h-56 w-56 rounded-full bg-coral/30 blur-3xl" aria-hidden />
            <div className="absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-sun/30 blur-3xl" aria-hidden />
            <h2 className="relative mx-auto max-w-2xl text-4xl font-semibold leading-tight sm:text-6xl">
              Applications for {SITE.admissionsYear} are open
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg text-white/70">
              Grade RR to Grade 3. Send an enquiry in under a minute and the office will contact you with fees and next steps.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/admissions/#enquire" className="btn btn-sun !px-7 !py-3.5">Start your enquiry <IconArrow /></Link>
              <a href={`tel:${SITE.phoneIntl}`} className="btn bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15 !px-7 !py-3.5">
                <IconPhone /> {SITE.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
