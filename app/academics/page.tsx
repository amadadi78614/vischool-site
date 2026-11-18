import type { Metadata } from "next";
import Link from "next/link";
import { CURRICULUM, DBE_DOCS } from "@/lib/site";
import { PageHero, SectionHead } from "@/components/Section";
import { IconArrow, IconBook, IconCheck, IconDoc, IconMoon, IconSpark } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Academics",
  description: "CAPS Foundation Phase curriculum for Grade RR to Grade 3: Mathematics, English Home Language and Life Skills, with optional Islamic Studies and holistic development.",
  alternates: { canonical: "/academics/" },
};

const TONES = {
  leaf: { bar: "bg-leaf", soft: "bg-leaf/10", text: "text-leaf", Icon: IconBook },
  plum: { bar: "bg-plum", soft: "bg-plum/10", text: "text-plum", Icon: IconMoon },
  sky: { bar: "bg-sky", soft: "bg-sky/10", text: "text-sky", Icon: IconSpark },
} as const;

const ASSESS = [
  ["Oral work", "Speaking, listening, reading aloud and discussion."],
  ["Practical tasks", "Hands-on activities with objects, counters, art and movement."],
  ["Written activities", "Age-appropriate writing, number work and worksheets."],
  ["Term report", "A formal report card at the end of every term."],
];

export default function Academics() {
  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="The CAPS curriculum, taught with care"
        intro="We follow the National Curriculum and Assessment Policy Statement (CAPS) prescribed by the Department of Basic Education, enriched with our values-based ethos."
      />

      <section className="pb-24">
        <div className="container-x space-y-6">
          {CURRICULUM.map((c, idx) => {
            const t = TONES[c.tone];
            return (
              <article key={c.key} className="reveal card grid overflow-hidden lg:grid-cols-[0.9fr_1.1fr]">
                <div className={`relative p-8 sm:p-10 ${t.soft}`}>
                  <span className="font-display text-7xl font-semibold opacity-15">0{idx + 1}</span>
                  <div className={`mt-2 grid h-12 w-12 place-items-center rounded-2xl bg-white ${t.text} shadow-soft`}>
                    <t.Icon />
                  </div>
                  <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">{c.title}</h2>
                  <p className="mt-3 text-muted">{c.intro}</p>
                </div>
                <ul className="grid content-center gap-4 p-8 sm:p-10">
                  {c.items.map(([k, v]) => (
                    <li key={k} className="flex gap-4 rounded-2xl bg-cream p-5">
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${t.bar} text-white`}>
                        <IconCheck className="h-4 w-4" />
                      </span>
                      <div>
                        <h3 className="font-sans text-lg font-bold">{k}</h3>
                        <p className="text-muted">{v}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-forest py-24 text-white sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="reveal">
            <span className="eyebrow !text-sun">Assessment</span>
            <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">How we assess your child</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/75">
              In the Foundation Phase, assessment is continuous (CASS). There are no formal exams. Learners are assessed
              every day through their work in class.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {ASSESS.map(([k, v], i) => (
              <div key={k} className="reveal rounded-3xl bg-white/[0.07] p-6 ring-1 ring-white/10">
                <span className="font-display text-sm text-sun">0{i + 1}</span>
                <h3 className="mt-2 font-sans text-lg font-bold">{k}</h3>
                <p className="mt-1 text-sm text-white/70">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionHead
            eyebrow="For parents and teachers"
            title="Official curriculum documents"
            intro="Published by the Department of Basic Education. Links open on the department's website."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {DBE_DOCS.map((d) => (
              <a key={d.title} href={d.href} target="_blank" rel="noopener noreferrer"
                className="reveal card group flex items-center justify-between gap-4 p-6 transition hover:-translate-y-0.5 hover:shadow-lift">
                <span className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-sky/10 text-sky"><IconDoc /></span>
                  <span className="font-semibold">{d.title}</span>
                </span>
                <IconArrow className="h-5 w-5 text-muted transition group-hover:translate-x-1 group-hover:text-ink" />
              </a>
            ))}
          </div>
          <Link href="/learning-shelf/" className="btn btn-primary mt-12">Worksheets for home practice <IconArrow /></Link>
        </div>
      </section>
    </>
  );
}
