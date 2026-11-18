import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { PageHero, SectionHead } from "@/components/Section";
import { IconArrow, IconDoc, IconShield } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About",
  description: "About Valencia Islamic School: a registered Foundation Phase school in Valencia Park, Mbombela, led by Mrs. R. Mahomed.",
  alternates: { canonical: "/about/" },
};

const VALUES = [
  ["Every child is seen", "Each learner is unique and gets individual attention to reach their full potential.", "bg-coral"],
  ["Academic excellence", "The national CAPS curriculum, taught thoroughly from Grade RR to Grade 3.", "bg-sky"],
  ["Strong moral values", "Good character, respect and kindness are part of every school day.", "bg-sun"],
  ["Open to every family", "Islamic Studies is offered as an optional part of the day for Muslim learners.", "bg-plum"],
] as const;

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About VIS"
        title="A nurturing place for young minds to flourish"
        intro="Valencia Islamic School is a registered Foundation Phase school in Valencia Park, Mbombela, for children from Grade RR to Grade 3."
      />

      <section className="pb-24">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal">
            <div className="sticky top-28 card overflow-hidden">
              <div className="grid aspect-[4/3] place-items-center bg-forest font-display text-8xl font-semibold text-sun">RM</div>
              <div className="p-6">
                <p className="font-display text-2xl font-semibold">{SITE.principal.name}</p>
                <p className="text-sm text-muted">{SITE.principal.title}</p>
              </div>
            </div>
          </div>
          <div className="reveal card p-8 sm:p-12">
            <span className="eyebrow">Welcome from the principal</span>
            <div className="mt-5 space-y-5 font-display text-xl leading-relaxed sm:text-2xl">
              <p>
                Welcome to Valencia Islamic School. Since our establishment, we have been dedicated to providing a
                nurturing environment where young minds can flourish.
              </p>
              <p>
                As we expand into the Foundation Phase (Grade R – 3), our commitment remains the same: to offer a balanced
                education that combines academic excellence with strong moral and Islamic values.
              </p>
              <p>
                We believe that every child is unique and deserves individual attention to reach their full potential.
              </p>
            </div>
            <p className="mt-8 font-semibold">{SITE.principal.name}</p>
            <p className="text-sm text-muted">{SITE.principal.title}</p>
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 sm:py-32">
        <div className="container-x">
          <SectionHead eyebrow="What we stand for" title="Our values" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(([t, d, c], i) => (
              <div key={t} className="reveal card p-7">
                <div className="flex items-center gap-3">
                  <span className={`h-3 w-3 rounded-full ${c}`} />
                  <span className="text-xs font-bold text-muted">0{i + 1}</span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold">{t}</h3>
                <p className="mt-2 text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionHead eyebrow="Registration" title="Accreditation" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              [IconShield, "Registered", SITE.registration],
              [IconDoc, "EMIS number", SITE.emis],
              [IconDoc, "Enterprise number", SITE.enterpriseNo],
            ].map(([Icon, k, v]) => {
              const I = Icon as typeof IconShield;
              return (
                <div key={k as string} className="reveal card flex items-start gap-4 p-7">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-leaf/10 text-leaf"><I /></span>
                  <div>
                    <p className="text-sm font-semibold text-muted">{k as string}</p>
                    <p className="mt-1 font-display text-xl font-semibold">{v as string}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <Link href="/admissions/#enquire" className="btn btn-primary mt-12">Enquire about a place <IconArrow /></Link>
        </div>
      </section>
    </>
  );
}
