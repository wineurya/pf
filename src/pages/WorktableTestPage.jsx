import { useState } from "react";
import { WorktableProcessVisual } from "@/exploration/WorktableProcessVisual.jsx";

const STEPS = ["Research", "Structure", "Prototype", "Handoff"];

export default function WorktableTestPage() {
  const [active, setActive] = useState(0);

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center bg-[var(--color-bg)] font-[family-name:var(--font-body)]">

      {/* Draft badge */}
      <div className="absolute left-5 top-5 flex items-center gap-2">
        <span className="rounded-md border border-[rgba(0,0,0,0.1)] bg-[rgba(0,0,0,0.04)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-fg-muted)]">
          Draft 1
        </span>
        <span className="text-[12px] text-[var(--color-fg-muted)] opacity-60">WorktableProcessVisual</span>
      </div>

      {/* Step controls */}
      <div className="absolute right-5 top-5 flex flex-col gap-1.5">
        {STEPS.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setActive(i)}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] font-medium transition-all duration-150"
            style={{
              background: active === i ? "var(--wx-primary, #2563eb)" : "rgba(0,0,0,0.04)",
              color: active === i ? "#fff" : "var(--color-fg-muted)",
            }}
          >
            <span
              className="flex size-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
              style={{
                background: active === i ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.08)",
              }}
            >
              {i + 1}
            </span>
            {label}
          </button>
        ))}
      </div>

      {/* Canvas — centered, fixed aspect */}
      <div
        className="w-full max-w-[min(560px,80vw)] overflow-hidden rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.08)]"
        style={{ aspectRatio: "560 / 640" }}
      >
        <WorktableProcessVisual activeStep={active} />
      </div>

      {/* Step label */}
      <p className="mt-6 text-[13px] font-medium text-[var(--color-fg-muted)]">
        Step {active + 1} of {STEPS.length} — {STEPS[active]}
      </p>
    </div>
  );
}
