import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion } from "motion/react";

const HOLD_MS = 780;
/* Progress past this while still pressed — committed; release no longer cancels. */
const COMMIT_AT = 0.82;
const SENDING_FILL_MS = 140;
const SENDING_MS = 560;
const SENT_HOLD_MS = 1600;
/* Brief beat so the blue→green glass morph reads before we reset. */
const SENT_COLOR_MS = 420;

function CheckMark() {
  return (
    <svg
      className="hts-check"
      viewBox="0 0 14 14"
      width="13"
      height="13"
      fill="none"
      aria-hidden
    >
      <path
        d="M2.5 7.5 5.6 10.6 11.5 3.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function labelKey(phase) {
  if (phase === "sent") return "sent";
  if (phase === "sending") return "sending";
  return "hold";
}

/* One label, morphed with a soft blur swap — rendered twice (base ink layer +
   clipped paper layer) so the sweeping fill re-inks the text as it passes. */
function MorphLabel({ phase, reduceMotion }) {
  const key = labelKey(phase);

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={key}
        className="hts-label"
        initial={
          reduceMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 7, filter: "blur(4px)" }
        }
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={
          reduceMotion
            ? { opacity: 0 }
            : { opacity: 0, y: -7, filter: "blur(4px)" }
        }
        transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
      >
        {key === "sent" ? (
          <>
            <CheckMark />
            Sent
          </>
        ) : key === "sending" ? (
          "Sending…"
        ) : (
          "Hold to send"
        )}
      </motion.span>
    </AnimatePresence>
  );
}

/** Interactive hold-to-send canvas — no demo frame or dock. */
export function HoldToSendStage({ className }) {
  const reduceMotion = useReducedMotion() ?? false;
  const [phase, setPhase] = useState("idle"); // idle | holding | sending | sent
  const [pressed, setPressed] = useState(false);
  const [fillHidden, setFillHidden] = useState(false);
  const progress = useMotionValue(0);

  const fillRef = useRef(null);
  const animRef = useRef(null);
  const resetTimerRef = useRef(0);
  const pressingRef = useRef(false);
  const committedRef = useRef(false);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return undefined;

    const write = (value) => {
      fill.style.clipPath = `inset(0 ${(1 - value) * 100}% 0 0)`;
    };

    write(progress.get());
    return progress.on("change", write);
  }, [progress]);

  useEffect(
    () => () => {
      animRef.current?.stop();
      if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    },
    [],
  );

  const finishSent = () => {
    setPhase("sent");
    /* Drop the deep fill so the green glass (inset + hairline) reads cleanly. */
    setFillHidden(true);
    resetTimerRef.current = window.setTimeout(() => {
      resetTimerRef.current = window.setTimeout(() => {
        resetTimerRef.current = 0;
        progress.jump(0);
        setFillHidden(false);
        committedRef.current = false;
        setPhase("idle");
      }, SENT_COLOR_MS);
    }, SENT_HOLD_MS);
  };

  const runSendingWait = () => {
    resetTimerRef.current = window.setTimeout(() => {
      resetTimerRef.current = 0;
      finishSent();
    }, SENDING_MS);
  };

  /* Commit zone — still pressed. Label → Sending…, fill finishes, release ignored. */
  const beginSending = () => {
    if (phaseRef.current !== "holding" || !pressingRef.current) return;

    committedRef.current = true;
    setPhase("sending");
    animRef.current?.stop();

    const from = progress.get();
    animRef.current = animate(progress, 1, {
      duration: (SENDING_FILL_MS / 1000) * ((1 - from) / (1 - COMMIT_AT)),
      ease: "linear",
      onComplete: () => {
        if (phaseRef.current === "sending") runSendingWait();
      },
    });
  };

  const runHoldToCommit = () => {
    const from = progress.get();
    const span = Math.max(COMMIT_AT - from, 0);

    animRef.current = animate(progress, COMMIT_AT, {
      duration: (HOLD_MS / 1000) * (span / COMMIT_AT),
      ease: "linear",
      onComplete: () => {
        if (phaseRef.current === "holding" && pressingRef.current) beginSending();
      },
    });
  };

  const beginHold = () => {
    if (
      pressingRef.current ||
      phaseRef.current === "sending" ||
      phaseRef.current === "sent"
    ) {
      return;
    }

    pressingRef.current = true;
    setPressed(true);
    setPhase("holding");
    animRef.current?.stop();
    runHoldToCommit();
  };

  const releaseHold = () => {
    pressingRef.current = false;
    setPressed(false);

    if (committedRef.current || phaseRef.current === "sending" || phaseRef.current === "sent") {
      return;
    }

    setPhase("idle");
    animRef.current?.stop();
    animRef.current = animate(
      progress,
      0,
      reduceMotion
        ? { duration: 0.01 }
        : { type: "spring", stiffness: 360, damping: 32 },
    );
  };

  const onKeyDown = (event) => {
    if (event.repeat) return;
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      beginHold();
    }
  };

  const onKeyUp = (event) => {
    if (event.key === " " || event.key === "Enter") releaseHold();
  };

  return (
    <div className={className ? `hts-root ${className}` : "hts-root"}>
      <main className="hts-stage" aria-label="Hold to send">
        <div className="hts-showcase">
          <motion.button
            type="button"
            className="hts-button"
            data-phase={phase}
            data-pressed={pressed || undefined}
            whileTap={
              reduceMotion || phase === "sent" ? undefined : { scale: 0.98 }
            }
            onPointerDown={(event) => {
              if (event.pointerType === "mouse" && event.button !== 0) return;
              beginHold();
            }}
            onPointerUp={releaseHold}
            onPointerCancel={releaseHold}
            onPointerLeave={releaseHold}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onBlur={releaseHold}
            onContextMenu={(event) => event.preventDefault()}
            aria-label={
              phase === "sending"
                ? pressed
                  ? "Sending — keep holding"
                  : "Sending — please wait"
                : phase === "sent"
                  ? "Sent"
                  : "Hold to send — keep the button pressed to confirm"
            }
            aria-busy={phase === "sending"}
          >
            <span className="hts-sizer" aria-hidden>
              Hold to send
            </span>
            <span className="hts-layer hts-layer--base" aria-hidden>
              <MorphLabel phase={phase} reduceMotion={reduceMotion} />
            </span>
            <div
              ref={fillRef}
              className={fillHidden ? "hts-fill hts-fill--hidden" : "hts-fill"}
              aria-hidden
            >
              <span className="hts-layer hts-layer--fill">
                <MorphLabel phase={phase} reduceMotion={reduceMotion} />
              </span>
            </div>
          </motion.button>

          <span className="hts-status" role="status">
            {phase === "sending" ? "Sending" : phase === "sent" ? "Sent" : ""}
          </span>
        </div>
      </main>
    </div>
  );
}
