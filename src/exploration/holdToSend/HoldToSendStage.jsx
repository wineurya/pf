import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion } from "motion/react";

const HOLD_MS = 900;
const SENT_HOLD_MS = 1500;

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

/* One label, morphed with a soft blur swap — rendered twice (base ink layer +
   clipped paper layer) so the sweeping fill re-inks the text as it passes. */
function MorphLabel({ phase, reduceMotion }) {
  const sent = phase === "sent";

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={sent ? "sent" : "hold"}
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
        {sent ? (
          <>
            <CheckMark />
            Sent
          </>
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
  const [phase, setPhase] = useState("idle"); // idle | holding | sent
  const [fillHidden, setFillHidden] = useState(false);
  const progress = useMotionValue(0);

  const fillRef = useRef(null);
  const animRef = useRef(null);
  const resetTimerRef = useRef(0);
  const holdingRef = useRef(false);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  /* The fill is a paper-on-ink clone clipped from the right; progress drives
     the reveal so the sweep and any spring-back share one source of truth. */
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

  const confirmSend = () => {
    holdingRef.current = false;
    setPhase("sent");

    /* Sweeping the fill back down would read as an undo — fade it out via a
       CSS transition instead, then reset the clip while it is invisible.
       Phase stays "sent" through the fade so a new hold can't start mid-reset. */
    resetTimerRef.current = window.setTimeout(() => {
      setFillHidden(true);
      resetTimerRef.current = window.setTimeout(() => {
        resetTimerRef.current = 0;
        progress.jump(0);
        setFillHidden(false);
        setPhase("idle");
      }, 280);
    }, SENT_HOLD_MS);
  };

  const beginHold = () => {
    if (holdingRef.current || phaseRef.current === "sent") return;

    holdingRef.current = true;
    setPhase("holding");
    animRef.current?.stop();
    animRef.current = animate(progress, 1, {
      /* Resume-aware: re-pressing mid-spring-back finishes the remainder. */
      duration: (HOLD_MS / 1000) * (1 - progress.get()),
      ease: "linear",
      onComplete: () => {
        if (holdingRef.current) confirmSend();
      },
    });
  };

  const releaseHold = () => {
    if (!holdingRef.current) return;

    holdingRef.current = false;
    if (phaseRef.current === "sent") return;

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
            whileTap={reduceMotion || phase === "sent" ? undefined : { scale: 0.98 }}
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
            aria-label="Hold to send — keep the button pressed to confirm"
          >
            {/* Invisible sizer pins the pill's width across label swaps. */}
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

          <p className="hts-hint" aria-hidden>
            release early to cancel
          </p>

          <span className="hts-status" role="status">
            {phase === "sent" ? "Sent" : ""}
          </span>
        </div>
      </main>
    </div>
  );
}
