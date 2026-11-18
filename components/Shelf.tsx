"use client";

import { useEffect, useMemo, useState } from "react";
import { SITE, WORKSHEETS, type Worksheet, waLink } from "@/lib/site";
import { IconCart, IconCheck, IconWhatsApp, IconX } from "./Icons";

const SUBJECT_TONE: Record<Worksheet["subject"], { bg: string; fg: string; accent: string }> = {
  Mathematics: { bg: "bg-sky/12", fg: "text-sky", accent: "#3b9fd6" },
  English: { bg: "bg-coral/12", fg: "text-coral", accent: "#ef6a4c" },
  "Life Skills": { bg: "bg-sun/20", fg: "text-[#a8720c]", accent: "#f5b83d" },
  "Islamic Studies": { bg: "bg-plum/12", fg: "text-plum", accent: "#8b5cb4" },
};

const KEY = "vis-shelf-cart";

function Cover({ w }: { w: Worksheet }) {
  const t = SUBJECT_TONE[w.subject];
  return (
    <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${t.bg}`}>
      {/* stylised worksheet page */}
      <div className="absolute inset-x-8 bottom-0 top-6 rotate-[-3deg] rounded-t-xl bg-white shadow-soft transition duration-500 group-hover:rotate-0 group-hover:-translate-y-1">
        <div className="p-4">
          <div className="h-2 w-16 rounded-full" style={{ background: t.accent }} />
          <div className="mt-3 h-1.5 w-28 rounded-full bg-ink/10" />
          <div className="mt-1.5 h-1.5 w-20 rounded-full bg-ink/10" />
          <div className="mt-4 grid grid-cols-4 gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-lg border-2 border-dashed" style={{ borderColor: `${t.accent}55` }} />
            ))}
          </div>
        </div>
      </div>
      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-ink backdrop-blur">
        {w.grade}
      </span>
    </div>
  );
}

export function Shelf() {
  const grades = ["All grades", ...SITE.grades.filter((g) => WORKSHEETS.some((w) => w.grade === g))];
  const subjects = ["All subjects", ...Array.from(new Set(WORKSHEETS.map((w) => w.subject)))];
  const [grade, setGrade] = useState("All grades");
  const [subject, setSubject] = useState("All subjects");
  const [q, setQ] = useState("");
  const [cart, setCart] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const v = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (Array.isArray(v)) setCart(v.filter((id) => WORKSHEETS.some((w) => w.id === id)));
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch {}
  }, [cart]);

  const list = useMemo(
    () =>
      WORKSHEETS.filter(
        (w) =>
          (grade === "All grades" || w.grade === grade) &&
          (subject === "All subjects" || w.subject === subject) &&
          (q === "" || `${w.title} ${w.description} ${w.subject}`.toLowerCase().includes(q.toLowerCase())),
      ),
    [grade, subject, q],
  );

  const items = WORKSHEETS.filter((w) => cart.includes(w.id));
  const total = items.reduce((s, w) => s + w.price, 0);
  const toggle = (id: string) => setCart((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  const order = [
    `Worksheet order – ${SITE.name}`,
    ``,
    ...items.map((w) => `• ${w.grade} ${w.subject}: ${w.title} – R${w.price}`),
    ``,
    `Total: R${total}`,
    ``,
    `Please send payment details and the PDFs. Thank you.`,
  ].join("\n");

  return (
    <div>
      {/* Filters */}
      <div className="card flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {grades.map((g) => (
            <button key={g} type="button" onClick={() => setGrade(g)}
              className={`chip ${grade === g ? "bg-forest text-white ring-forest" : "bg-white hover:bg-sand"}`}>
              {g}
            </button>
          ))}
          <span className="mx-1 hidden w-px bg-ink/10 sm:block" />
          {subjects.map((s) => (
            <button key={s} type="button" onClick={() => setSubject(s)}
              className={`chip ${subject === s ? "bg-ink text-white ring-ink" : "bg-white hover:bg-sand"}`}>
              {s}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search worksheets"
          aria-label="Search worksheets"
          className="field lg:max-w-60"
        />
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((w) => {
          const inCart = cart.includes(w.id);
          const t = SUBJECT_TONE[w.subject];
          return (
            <article key={w.id} className="group card flex flex-col p-3 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
              <Cover w={w} />
              <div className="flex flex-1 flex-col p-3 pt-4">
                <p className={`text-xs font-bold uppercase tracking-wider ${t.fg}`}>{w.subject}</p>
                <h3 className="mt-1 text-xl font-semibold">{w.title}</h3>
                <p className="mt-1.5 flex-1 text-sm text-muted">{w.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-2xl font-semibold">R{w.price}</span>
                  <button type="button" onClick={() => toggle(w.id)}
                    className={`btn !px-4 !py-2 text-sm ${inCart ? "bg-leaf text-white" : "btn-primary"}`}>
                    {inCart ? (<><IconCheck /> Added</>) : "Add"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
        {list.length === 0 && (
          <p className="col-span-full rounded-2xl bg-sand/60 p-8 text-center text-muted">No worksheets match. Try another filter.</p>
        )}
        <div className="flex flex-col justify-center rounded-xl2 border-2 border-dashed border-ink/15 p-8 text-center">
          <p className="font-display text-xl font-semibold">More on the way</p>
          <p className="mt-2 text-sm text-muted">
            Our teachers are adding worksheets for every grade and term. Looking for a topic? Ask us on WhatsApp.
          </p>
        </div>
      </div>

      {/* Cart bar */}
      <div className={`fixed inset-x-0 bottom-0 z-40 p-3 transition-all duration-500 sm:p-5 ${items.length ? "translate-y-0" : "pointer-events-none invisible translate-y-full"}`}>
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 rounded-full bg-ink py-2.5 pl-5 pr-2.5 text-white shadow-lift">
          <button type="button" onClick={() => setOpen(true)} className="flex items-center gap-3 text-sm">
            <IconCart />
            <span><b>{items.length}</b> worksheet{items.length === 1 ? "" : "s"} · <b>R{total}</b></span>
          </button>
          <button type="button" onClick={() => setOpen(true)} className="btn btn-sun !py-2.5">Review order</button>
        </div>
      </div>

      {/* Order sheet */}
      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center" role="dialog" aria-label="Your order">
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="fade-up relative w-full max-w-lg rounded-t-[2rem] bg-cream p-6 shadow-lift sm:rounded-[2rem] sm:p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Your order</h3>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full bg-white ring-1 ring-ink/10">
                <IconX className="h-5 w-5" />
              </button>
            </div>
            <ul className="mt-5 divide-y divide-ink/10">
              {items.map((w) => (
                <li key={w.id} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <p className="font-semibold">{w.title}</p>
                    <p className="text-xs text-muted">{w.grade} · {w.subject}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">R{w.price}</span>
                    <button type="button" onClick={() => toggle(w.id)} className="text-xs font-semibold text-coral hover:underline">Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between border-t border-ink/10 pt-4">
              <span className="text-muted">Total</span>
              <span className="font-display text-3xl font-semibold">R{total}</span>
            </div>
            <a href={waLink(order)} target="_blank" rel="noopener noreferrer"
              className="btn mt-6 w-full bg-[#25D366] text-white hover:brightness-95">
              <IconWhatsApp /> Order on WhatsApp
            </a>
            <p className="mt-3 text-center text-xs text-muted">
              The school replies with payment details. Your PDFs are sent once payment is received.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
