"use client";

import { useEffect, useState } from "react";
import { SITE, waLink } from "@/lib/site";
import { IconWhatsApp } from "./Icons";

/** Current time in South Africa, regardless of the visitor's own timezone. */
function saNow() {
  const parts = new Intl.DateTimeFormat("en-ZA", {
    timeZone: "Africa/Johannesburg",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, mins: Number(get("hour")) * 60 + Number(get("minute")) };
}

function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

export function Greeting() {
  const mounted = useMounted();
  if (!mounted) return <span>Welcome</span>;
  const h = Math.floor(saNow().mins / 60);
  const word = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  return <span>{word}, welcome</span>;
}

/** Live status pill: in session / office open / closed, using the real timetable. */
export function OpenStatus({ dark = false }: { dark?: boolean }) {
  const mounted = useMounted();
  const [, tick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => tick((x) => x + 1), 60_000);
    return () => clearInterval(t);
  }, []);
  if (!mounted) return null;

  const { day, mins } = saNow();
  const start = 7 * 60 + 30;
  const end = day === 5 ? 11 * 60 + 30 : 13 * 60 + 30;
  const office = 14 * 60;
  const weekday = day >= 1 && day <= 5;

  let label: string;
  let tone: "green" | "amber" | "grey";
  if (weekday && mins >= start && mins < end) {
    label = "School is in session";
    tone = "green";
  } else if (weekday && mins >= end && mins < office) {
    label = "Admin office open until 14:00";
    tone = "amber";
  } else {
    const nextDay = weekday && mins < start ? "today" : day >= 1 && day <= 4 ? "tomorrow" : "Monday";
    label = `Closed · opens ${nextDay} 07:30`;
    tone = "grey";
  }
  const dot = { green: "bg-emerald-500", amber: "bg-sun", grey: "bg-ink/30" }[tone];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
        dark ? "bg-white/10 text-white ring-1 ring-white/15" : "bg-white text-ink ring-1 ring-ink/10"
      }`}
    >
      <span className="relative flex h-2 w-2">
        {tone === "green" && <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${dot} opacity-60`} />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${dot}`} />
      </span>
      {label}
    </span>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href={waLink(`Hello ${SITE.short}, I have a question about the school.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with the school on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-lift transition hover:pr-5 sm:bottom-6 sm:right-6"
    >
      <IconWhatsApp className="h-6 w-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-40">
        Chat with us
      </span>
    </a>
  );
}
