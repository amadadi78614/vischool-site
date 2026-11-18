"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SITE, mailLink, waLink } from "@/lib/site";
import { gradeFor } from "./GradeFinder";
import { IconCheck, IconMail, IconWhatsApp } from "./Icons";

type Form = {
  parent: string;
  phone: string;
  email: string;
  child: string;
  dob: string;
  grade: string;
  year: string;
  islamic: "Yes" | "No" | "Not sure";
  message: string;
  consent: boolean;
};

const STEPS = ["You", "Your child", "Send"];

export function EnquiryForm() {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [f, setF] = useState<Form>({
    parent: "",
    phone: "",
    email: "",
    child: "",
    dob: "",
    grade: "",
    year: String(SITE.admissionsYear),
    islamic: "Not sure",
    message: "",
    consent: false,
  });
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((x) => ({ ...x, [k]: v }));

  // Prefill from the grade finder link (?grade=&year=), including in-page navigation
  const params = useSearchParams();
  const qGrade = params.get("grade");
  const qYear = params.get("year");
  useEffect(() => {
    if (qGrade || qYear) setF((x) => ({ ...x, grade: qGrade ?? x.grade, year: qYear ?? x.year }));
  }, [qGrade, qYear]);

  // Suggest a grade from date of birth
  const suggested = useMemo(() => gradeFor(f.dob, Number(f.year))?.grade ?? null, [f.dob, f.year]);
  useEffect(() => {
    if (suggested && !f.grade) set("grade", suggested);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggested]);

  const ok0 = f.parent.trim().length > 1 && /^[+\d\s()-]{9,}$/.test(f.phone.trim());
  const ok1 = f.child.trim().length > 0 && f.grade !== "";
  const ok2 = f.consent;

  const summary = [
    `Admissions enquiry – ${SITE.name}`,
    ``,
    `Parent/guardian: ${f.parent}`,
    `Phone: ${f.phone}`,
    f.email ? `Email: ${f.email}` : false,
    ``,
    `Child: ${f.child}`,
    f.dob ? `Date of birth: ${f.dob}` : false,
    `Grade: ${f.grade} (${f.year})`,
    `Islamic Studies: ${f.islamic}`,
    f.message ? `` : false,
    f.message ? `Message: ${f.message}` : false,
  ]
    .filter((l): l is string => typeof l === "string")
    .join("\n");

  if (sent) {
    return (
      <div className="card fade-up p-8 text-center sm:p-12">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-leaf text-white">
          <IconCheck className="h-8 w-8" />
        </div>
        <h3 className="mt-5 text-3xl font-semibold">Thank you, {f.parent.split(" ")[0]}</h3>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Your enquiry is ready in WhatsApp or your email app. Once you press send, the office will get back to you with
          fees, availability and next steps for {f.child || "your child"}.
        </p>
        <button type="button" onClick={() => { setSent(false); setStep(0); }} className="btn btn-ghost mt-6">
          Start another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="card p-6 sm:p-9" onSubmit={(e) => e.preventDefault()} noValidate>
      {/* Stepper */}
      <ol className="mb-8 grid grid-cols-3 gap-2" aria-label="Progress">
        {STEPS.map((s, i) => (
          <li key={s}>
            <div className={`h-1.5 rounded-full transition-colors duration-500 ${i <= step ? "bg-leaf" : "bg-ink/10"}`} />
            <p className={`mt-2 text-xs font-bold uppercase tracking-wider ${i === step ? "text-ink" : "text-muted"}`}>
              {i + 1}. {s}
            </p>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div key="s0" className="fade-up grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="label">Parent / guardian name *</span>
            <input className="field" autoComplete="name" value={f.parent} onChange={(e) => set("parent", e.target.value)} />
          </label>
          <label>
            <span className="label">Mobile number *</span>
            <input className="field" type="tel" inputMode="tel" autoComplete="tel" placeholder="082 123 4567" value={f.phone} onChange={(e) => set("phone", e.target.value)} />
          </label>
          <label>
            <span className="label">Email</span>
            <input className="field" type="email" autoComplete="email" value={f.email} onChange={(e) => set("email", e.target.value)} />
          </label>
        </div>
      )}

      {step === 1 && (
        <div key="s1" className="fade-up grid gap-4 sm:grid-cols-2">
          <label>
            <span className="label">Child&apos;s name *</span>
            <input className="field" value={f.child} onChange={(e) => set("child", e.target.value)} />
          </label>
          <label>
            <span className="label">Date of birth</span>
            <input className="field" type="date" value={f.dob} onChange={(e) => { set("dob", e.target.value); set("grade", ""); }} />
          </label>
          <div className="sm:col-span-2">
            <span className="label">Starting year</span>
            <div className="flex flex-wrap gap-2">
              {[SITE.admissionsYear, SITE.admissionsYear + 1].map((y) => (
                <button key={y} type="button" onClick={() => set("year", String(y))}
                  className={`chip ${f.year === String(y) ? "bg-forest text-white ring-forest" : "bg-white hover:bg-sand"}`}>
                  {y}
                </button>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2">
            <span className="label">
              Grade * {suggested && <span className="font-normal text-leaf">· suggested from date of birth: {suggested}</span>}
            </span>
            <div className="flex flex-wrap gap-2">
              {SITE.grades.map((g) => (
                <button key={g} type="button" onClick={() => set("grade", g)}
                  className={`chip ${f.grade === g ? "bg-forest text-white ring-forest" : "bg-white hover:bg-sand"}`}>
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2">
            <span className="label">Interested in Islamic Studies?</span>
            <div className="flex flex-wrap gap-2">
              {(["Yes", "No", "Not sure"] as const).map((v) => (
                <button key={v} type="button" onClick={() => set("islamic", v)}
                  className={`chip ${f.islamic === v ? "bg-plum text-white ring-plum" : "bg-white hover:bg-sand"}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div key="s2" className="fade-up grid gap-4">
          <label>
            <span className="label">Anything else we should know?</span>
            <textarea className="field min-h-28" value={f.message} onChange={(e) => set("message", e.target.value)}
              placeholder="Questions about fees, transport, aftercare, your child's needs…" />
          </label>
          <div className="rounded-2xl bg-sand/70 p-4 text-sm">
            <p className="font-semibold">Your enquiry</p>
            <p className="mt-1 text-muted">
              {f.parent} · {f.phone} — {f.child}, {f.grade} in {f.year}
            </p>
          </div>
          <label className="flex items-start gap-3 text-sm text-muted">
            <input type="checkbox" className="mt-0.5 h-5 w-5 accent-[var(--color-forest)]" checked={f.consent} onChange={(e) => set("consent", e.target.checked)} />
            I agree that {SITE.name} may use these details to respond to my enquiry, in line with POPIA. They are not shared
            with anyone else.
          </label>
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" onClick={() => setStep(step - 1)} className="btn btn-ghost">Back</button>
        ) : <span />}

        {step < 2 ? (
          <button type="button" disabled={step === 0 ? !ok0 : !ok1} onClick={() => setStep(step + 1)} className="btn btn-primary">
            Continue
          </button>
        ) : (
          <div className="flex flex-wrap gap-2">
            <a
              aria-disabled={!ok2}
              href={ok2 ? mailLink(`Admissions enquiry: ${f.child} (${f.grade} ${f.year})`, summary) : undefined}
              onClick={(e) => { if (!ok2) e.preventDefault(); else setSent(true); }}
              className={`btn btn-ghost ${ok2 ? "" : "pointer-events-none opacity-50"}`}
            >
              <IconMail /> Email
            </a>
            <a
              aria-disabled={!ok2}
              href={ok2 ? waLink(summary) : undefined}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { if (!ok2) e.preventDefault(); else setSent(true); }}
              className={`btn bg-[#25D366] text-white shadow-soft hover:brightness-95 ${ok2 ? "" : "pointer-events-none opacity-50"}`}
            >
              <IconWhatsApp /> Send on WhatsApp
            </a>
          </div>
        )}
      </div>
    </form>
  );
}
