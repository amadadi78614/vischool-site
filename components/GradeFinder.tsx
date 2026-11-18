"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SITE } from "@/lib/site";
import { IconArrow } from "./Icons";

// National admission age: the age a child turns by 30 June of the year of admission.
// Grade R: turns 5, Grade 1: turns 6. RR, 2 and 3 follow the same one-year steps.
const BY_AGE: Record<number, string> = { 4: "Grade RR", 5: "Grade R", 6: "Grade 1", 7: "Grade 2", 8: "Grade 3" };

export function gradeFor(dob: string, year: number) {
  if (!dob) return null;
  const d = new Date(dob + "T00:00:00");
  if (Number.isNaN(d.getTime())) return null;
  const turnedBy30June = d.getMonth() <= 5; // birthday falls on or before 30 June
  const age = year - d.getFullYear() - (turnedBy30June ? 0 : 1);
  return { age, grade: BY_AGE[age] ?? null };
}

export function GradeFinder({ compact = false }: { compact?: boolean }) {
  const [dob, setDob] = useState("");
  const [year, setYear] = useState(SITE.admissionsYear);
  const years = [SITE.admissionsYear, SITE.admissionsYear + 1];
  const res = useMemo(() => gradeFor(dob, year), [dob, year]);

  return (
    <div className={`card relative overflow-hidden ${compact ? "p-6" : "p-7 sm:p-9"}`}>
      <div className="dot-grid pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-70" aria-hidden />
      <span className="eyebrow">Grade finder</span>
      <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">Which grade will my child be in?</h3>
      <p className="mt-2 max-w-md text-sm text-muted">
        Enter your child&apos;s date of birth. We apply the national rule: the age your child turns by 30 June of the
        year they start.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="block">
          <span className="label">Date of birth</span>
          <input
            type="date"
            className="field"
            value={dob}
            max={new Date().toISOString().slice(0, 10)}
            onChange={(e) => setDob(e.target.value)}
          />
        </label>
        <div>
          <span className="label">Starting in</span>
          <div className="flex gap-1.5 rounded-2xl bg-white p-1.5 ring-1 ring-ink/10">
            {years.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setYear(y)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  y === year ? "bg-forest text-white" : "text-ink/70 hover:bg-ink/5"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div aria-live="polite" className="mt-5 min-h-[92px]">
        {res && (
          <div
            key={`${dob}-${year}`}
            className={`fade-up rounded-2xl p-5 ${res.grade ? "bg-forest text-white" : "bg-sand text-ink"}`}
          >
            {res.grade ? (
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm opacity-80">
                    Turns {res.age} by 30 June {year}
                  </p>
                  <p className="font-display text-3xl font-semibold">{res.grade}</p>
                </div>
                <Link
                  href={`/admissions/?grade=${encodeURIComponent(res.grade)}&year=${year}#enquire`}
                  className="btn btn-sun"
                >
                  Enquire for {res.grade} <IconArrow />
                </Link>
              </div>
            ) : (
              <p className="text-sm">
                {res.age < 4
                  ? `Your child turns ${res.age} by 30 June ${year}, which is younger than our Grade RR intake. Try a later year.`
                  : `Your child turns ${res.age} by 30 June ${year}, which is beyond Grade 3. Contact the office to discuss options.`}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
