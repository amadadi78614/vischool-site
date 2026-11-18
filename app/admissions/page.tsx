import type { Metadata } from "next";
import { Suspense } from "react";
import { FAQ, SITE } from "@/lib/site";
import { PageHero, SectionHead } from "@/components/Section";
import { GradeFinder } from "@/components/GradeFinder";
import { EnquiryForm } from "@/components/EnquiryForm";

export const metadata: Metadata = {
  title: "Admissions",
  description: `Admissions for ${SITE.admissionsYear}: Grade RR to Grade 3 at Valencia Islamic School, Mbombela. Check your child's grade and send an enquiry in under a minute.`,
  alternates: { canonical: "/admissions/" },
};

const STEPS = [
  ["Send an enquiry", "Use the form below. It takes under a minute and goes straight to the office on WhatsApp or email."],
  ["We contact you", "The office replies with fees, availability for your child's grade and a time to visit."],
  ["Visit the school", "Meet the team, see the classrooms and ask your questions."],
  ["Enrol", "Complete the application form and submit your documents to secure the place."],
];

export default function Admissions() {
  return (
    <>
      <PageHero
        eyebrow={`Admissions ${SITE.admissionsYear}`}
        title="Join the VIS family"
        intro={`We are accepting applications for Grade RR to Grade 3 for the ${SITE.admissionsYear} academic year.`}
      />

      {/* Steps */}
      <section className="pb-20">
        <div className="container-x">
          <ol className="grid gap-4 md:grid-cols-4">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="reveal card relative p-6">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-forest font-display text-lg font-semibold text-white">{i + 1}</span>
                <h3 className="mt-4 text-xl font-semibold">{t}</h3>
                <p className="mt-1.5 text-sm text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Finder + form */}
      <section id="enquire" className="scroll-mt-24 bg-paper py-24 sm:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6">
            <SectionHead eyebrow="Enquiry" title="Enquire in under a minute" intro="Not sure of the grade? Check it first, then send your enquiry." />
            <GradeFinder compact />
          </div>
          <div className="reveal lg:pt-4">
            <Suspense fallback={<div className="card h-96" />}>
              <EnquiryForm />
            </Suspense>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="Questions" title="Frequently asked questions" intro={<>Something else? Call <a className="font-semibold text-forest underline" href={`tel:${SITE.phoneIntl}`}>{SITE.phoneDisplay}</a>.</>} />
          <div className="space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="reveal group card overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 font-semibold">
                  {f.q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sand text-lg transition group-open:rotate-45 group-open:bg-forest group-open:text-white">+</span>
                </summary>
                <p className="px-6 pb-6 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
