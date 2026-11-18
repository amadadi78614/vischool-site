// Brand mark: a tree whose canopy is made of many colours, echoing the school's tree logo.
const LEAVES: [number, number, number, string][] = [
  [50, 18, 7, "#ef6a4c"], [36, 22, 6.5, "#f5b83d"], [64, 22, 6.5, "#3b9fd6"],
  [26, 32, 6, "#8b5cb4"], [43, 31, 6.5, "#2f8f5b"], [57, 31, 6.5, "#ef6a4c"], [74, 32, 6, "#f5b83d"],
  [20, 45, 5.5, "#3b9fd6"], [33, 43, 6, "#ef6a4c"], [50, 43, 7, "#f5b83d"], [67, 43, 6, "#8b5cb4"], [80, 45, 5.5, "#2f8f5b"],
  [27, 56, 5, "#f5b83d"], [40, 54, 5.5, "#3b9fd6"], [60, 54, 5.5, "#2f8f5b"], [73, 56, 5, "#ef6a4c"],
];

export function LogoMark({ className = "h-11 w-11", animate = false }: { className?: string; animate?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M50 92 C49 80 49 70 50 58 M50 74 C44 68 38 66 32 63 M50 68 C56 63 62 61 68 59"
        stroke="#6b4a2b"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="50" cy="93" rx="26" ry="4" fill="#9cc96b" opacity="0.6" />
      {LEAVES.map(([cx, cy, r, c], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill={c}
          className={animate ? "leaf-pop" : undefined}
          style={animate ? { animationDelay: `${120 + i * 45}ms`, transformOrigin: `${cx}px ${cy}px` } : undefined}
        />
      ))}
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl sm:h-12 sm:w-12 bg-white shadow-soft ring-1 ring-ink/5">
        <LogoMark className="h-10 w-10" />
      </span>
      <span className="leading-tight">
        <span className={`block font-display text-[1.02rem] font-semibold sm:text-[1.15rem] ${light ? "text-white" : "text-ink"}`}>
          Valencia Islamic School
        </span>
        <span className={`block text-[0.6rem] font-bold uppercase tracking-[0.14em] sm:text-[0.68rem] sm:tracking-[0.18em] ${light ? "text-sun" : "text-leaf"}`}>
          Foundation Phase · Grade RR – 3
        </span>
      </span>
    </span>
  );
}
