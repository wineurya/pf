import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

import {
  TOAST_AUTO_MS,
  TOAST_LIFETIME_MS,
  TOAST_MAX,
  TOAST_SAMPLES,
} from "@/exploration/toastStack/toastStackData.js";

/* Slightly slower ease — Sonner vibe (emil-design-eng). */
const EASE = [0.22, 1, 0.36, 1];
const SWIPE_PX = 56;
const SWIPE_V = 0.4;

let toastSeq = 0;

function nextSample(offset) {
  return TOAST_SAMPLES[offset % TOAST_SAMPLES.length];
}

function ToneMark({ tone }) {
  if (tone === "success") {
    return (
      <span className="ts-mark ts-mark--success" aria-hidden>
        <svg viewBox="0 0 14 14" width="12" height="12" fill="none">
          <path
            d="M2.5 7.2 5.5 10.2 11.5 3.8"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  if (tone === "warning") {
    return (
      <span className="ts-mark ts-mark--warning" aria-hidden>
        !
      </span>
    );
  }
  return <span className="ts-mark ts-mark--default" aria-hidden />;
}

function ToastItem({
  toast,
  index,
  expanded,
  reduceMotion,
  onDismiss,
  onPause,
  onResume,
}) {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-140, 0, 140], [0, 1, 0]);
  const front = index === 0;

  /* Sonner stack: front on baseline; older rise + scale down behind. */
  const stackedY = expanded ? -index * 68 : -index * 14;
  const stackedScale = expanded ? 1 : 1 - index * 0.06;
  const stackedOpacity = expanded || index < 2 ? 1 : 0.7;

  return (
    <motion.li
      layout={!reduceMotion}
      className="ts-toast"
      data-tone={toast.tone}
      data-front={front || undefined}
      style={{
        zIndex: TOAST_MAX - index,
        x,
        opacity: front ? opacity : stackedOpacity,
      }}
      initial={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 100, scale: 0.96 }
      }
      animate={{
        opacity: stackedOpacity,
        y: stackedY,
        scale: stackedScale,
      }}
      exit={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 24, scale: 0.96 }
      }
      transition={{
        duration: 0.4,
        ease: EASE,
        layout: { duration: 0.35, ease: EASE },
      }}
      drag={front && !reduceMotion ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.68}
      onDragStart={() => onPause()}
      onDragEnd={(_, info) => {
        onResume();
        const far = Math.abs(info.offset.x) > SWIPE_PX;
        const fast = Math.abs(info.velocity.x) > SWIPE_V * 1000;
        if (far || fast) onDismiss(toast.key);
        else x.set(0);
      }}
      onPointerDown={() => onPause()}
      onPointerUp={() => onResume()}
      onPointerLeave={() => onResume()}
    >
      <div className="ts-toast-body">
        <ToneMark tone={toast.tone} />
        <div className="ts-toast-copy">
          <p className="ts-toast-title">{toast.title}</p>
          {toast.description ? (
            <p className="ts-toast-desc">{toast.description}</p>
          ) : null}
        </div>
        <button
          type="button"
          className="ts-toast-close"
          onClick={() => onDismiss(toast.key)}
          aria-label={`Dismiss ${toast.title}`}
        >
          <svg viewBox="0 0 12 12" width="10" height="10" fill="none" aria-hidden>
            <path
              d="M2 2l8 8M10 2l-8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </motion.li>
  );
}

/** Sonner-style toast stack — realistic cards, not glass pills.
    Manual trigger + light auto pulse. Theme-aware via --exp-canvas. */
export function ToastStackStage({ className }) {
  const reduceMotion = useReducedMotion() ?? false;
  const sampleRef = useRef(0);
  const timers = useRef(new Map());
  const [toasts, setToasts] = useState(() => {
    const sample = nextSample(sampleRef.current++);
    return [{ ...sample, key: `${sample.id}-${++toastSeq}` }];
  });
  const [expanded, setExpanded] = useState(false);
  const [paused, setPaused] = useState(false);

  const clearTimer = (key) => {
    const id = timers.current.get(key);
    if (id) {
      window.clearTimeout(id);
      timers.current.delete(key);
    }
  };

  const dismiss = (key) => {
    clearTimer(key);
    setToasts((list) => list.filter((t) => t.key !== key));
  };

  const armTimer = (key) => {
    clearTimer(key);
    if (reduceMotion) return;
    const id = window.setTimeout(() => dismiss(key), TOAST_LIFETIME_MS);
    timers.current.set(key, id);
  };

  const pushToast = () => {
    const sample = nextSample(sampleRef.current++);
    const key = `${sample.id}-${++toastSeq}`;
    setToasts((list) => [{ ...sample, key }, ...list].slice(0, TOAST_MAX));
    armTimer(key);
  };

  useEffect(() => {
    if (toasts[0]) armTimer(toasts[0].key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (paused) {
      for (const key of timers.current.keys()) clearTimer(key);
      return undefined;
    }
    for (const t of toasts) armTimer(t.key);
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  useEffect(
    () => () => {
      for (const id of timers.current.values()) window.clearTimeout(id);
      timers.current.clear();
    },
    [],
  );

  useEffect(() => {
    if (reduceMotion || paused) return undefined;
    const id = window.setInterval(() => {
      setToasts((list) => {
        if (list.length >= TOAST_MAX) return list;
        const sample = nextSample(sampleRef.current++);
        const key = `${sample.id}-${++toastSeq}`;
        armTimer(key);
        return [{ ...sample, key }, ...list].slice(0, TOAST_MAX);
      });
    }, TOAST_AUTO_MS);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion, paused]);

  return (
    <div className={className ? `ts-root ${className}` : "ts-root"}>
      <main className="ts-stage" aria-label="Toast stack">
        <div
          className="ts-stack-wrap"
          onMouseEnter={() => {
            setExpanded(true);
            setPaused(true);
          }}
          onMouseLeave={() => {
            setExpanded(false);
            setPaused(false);
          }}
          onFocusCapture={() => {
            setExpanded(true);
            setPaused(true);
          }}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setExpanded(false);
              setPaused(false);
            }
          }}
        >
          <ol className="ts-stack" aria-live="polite" aria-relevant="additions">
            <AnimatePresence initial={false} mode="popLayout">
              {toasts.map((toast, index) => (
                <ToastItem
                  key={toast.key}
                  toast={toast}
                  index={index}
                  expanded={expanded}
                  reduceMotion={reduceMotion}
                  onDismiss={dismiss}
                  onPause={() => setPaused(true)}
                  onResume={() => {
                    if (!expanded) setPaused(false);
                  }}
                />
              ))}
            </AnimatePresence>
          </ol>
        </div>

        <motion.button
          type="button"
          className="ts-trigger"
          onClick={pushToast}
          whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          aria-label="Add toast"
        >
          Add toast
        </motion.button>
      </main>
    </div>
  );
}
