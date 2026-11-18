import type { ReactNode } from "react";

export function SectionHead({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`reveal max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <span className="eyebrow">
        <span className="h-1.5 w-1.5 rounded-full bg-coral" /> {eyebrow}
      </span>
      <h2 className="mt-3 text-4xl font-semibold leading-[1.05] sm:text-5xl">{title}</h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden pb-14 pt-36 sm:pb-20 sm:pt-44">
      <div className="dot-grid absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" aria-hidden />
      <Blobs />
      <div className="container-x relative">
        <span className="eyebrow fade-up"><span className="h-1.5 w-1.5 rounded-full bg-coral" /> {eyebrow}</span>
        <h1 className="fade-up mt-4 max-w-3xl text-5xl font-semibold leading-[1.02] sm:text-7xl" style={{ animationDelay: "80ms" }}>
          {title}
        </h1>
        <p className="fade-up mt-5 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl" style={{ animationDelay: "160ms" }}>
          {intro}
        </p>
        {children}
      </div>
    </section>
  );
}

export function Blobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="float-a absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sun/25 blur-3xl" />
      <div className="float-b absolute right-1/4 top-40 h-64 w-64 rounded-full bg-coral/15 blur-3xl" />
      <div className="float-c absolute -left-20 top-20 h-72 w-72 rounded-full bg-sky/15 blur-3xl" />
    </div>
  );
}
