import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { useMotionValue, useReducedMotion, useSpring } from "motion/react";
import {
  JELLY_EDGE_SPRING,
  JELLY_PROGRESS_SPRING,
  JELLY_SCRUBBER_DEFAULTS,
} from "@/exploration/jellyScrubber/jellyScrubberSettings.js";
import {
  jellyControlGeometry,
  progressFromValue,
  valueFromProgress,
} from "@/exploration/jellyScrubber/jellyScrubberPhysics.js";

const VMIN = 0;
const VMAX = 40;
const STEP = 1;
const INITIAL_VALUE = 40;

function snapValue(value) {
  return gsap.utils.clamp(VMIN, VMAX, Math.round(value / STEP) * STEP);
}

export function useJellyScrubberStage({ settings: controlledSettings, onSettingsChange } = {}) {
  const reduceMotion = useReducedMotion() ?? false;
  const [internalSettings, setInternalSettings] = useState(JELLY_SCRUBBER_DEFAULTS);
  const settings = controlledSettings ?? internalSettings;
  const setSettings = onSettingsChange ?? setInternalSettings;
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  const trackRef = useRef(null);
  const frameRef = useRef(null);
  const thumbRef = useRef(null);
  const draggingRef = useRef(false);
  const edgeSideRef = useRef(1);
  const displayValueRef = useRef(INITIAL_VALUE);
  const stateTimerRef = useRef(0);

  const clampProgress = useMemo(() => gsap.utils.clamp(0, 1), []);
  const progressTarget = useMotionValue(progressFromValue(INITIAL_VALUE, VMIN, VMAX));
  const edgeTarget = useMotionValue(0);

  const progress = useSpring(
    progressTarget,
    JELLY_PROGRESS_SPRING(settings, reduceMotion),
  );
  const edgePull = useSpring(edgeTarget, JELLY_EDGE_SPRING(settings, reduceMotion));

  const [lockedValue, setLockedValue] = useState(INITIAL_VALUE);
  const [displayValue, setDisplayValue] = useState(INITIAL_VALUE);
  const [interactionState, setInteractionState] = useState("idle");

  const setVisualState = (state, duration = 0) => {
    if (stateTimerRef.current) {
      window.clearTimeout(stateTimerRef.current);
      stateTimerRef.current = 0;
    }

    setInteractionState(state);

    if (duration > 0) {
      stateTimerRef.current = window.setTimeout(() => {
        stateTimerRef.current = 0;
        setInteractionState(draggingRef.current ? "dragging" : "idle");
      }, duration);
    }
  };

  useEffect(() => {
    const sync = () => {
      const pull = edgePull.get();
      const side = edgeSideRef.current;
      const trackWidth = trackRef.current?.getBoundingClientRect().width ?? 1;
      const geometry = jellyControlGeometry(
        progress.get(),
        pull,
        side,
        settingsRef.current.handleSize,
        trackWidth,
      );

      if (frameRef.current) {
        frameRef.current.style.setProperty("--jvs-frame-pull", String(pull));
        frameRef.current.style.setProperty("--jvs-frame-side", String(side));
        frameRef.current.style.setProperty("--jvs-frame-offset", `${side * pull * 5}px`);
        frameRef.current.style.setProperty("--jvs-frame-scale", String(1 + pull * 0.018));
        frameRef.current.style.setProperty(
          "--jvs-frame-origin",
          side > 0 ? "left center" : "right center",
        );
      }

      if (thumbRef.current) {
        thumbRef.current.style.left = `${geometry.thumbX}px`;
        thumbRef.current.style.width = `${geometry.thumbWidth}px`;
        thumbRef.current.style.transform = `translate(-50%, -50%) scale(${geometry.thumbScaleX}, ${geometry.thumbScaleY})`;
        thumbRef.current.style.transformOrigin = geometry.thumbOrigin;
      }

      const nextDisplay = snapValue(valueFromProgress(progress.get(), VMIN, VMAX));
      if (nextDisplay !== displayValueRef.current) {
        displayValueRef.current = nextDisplay;
        setDisplayValue(nextDisplay);
      }
    };

    sync();
    const unbindProgress = progress.on("change", sync);
    const unbindEdge = edgePull.on("change", sync);

    return () => {
      unbindProgress();
      unbindEdge();
    };
  }, [edgePull, progress]);

  useEffect(
    () => () => {
      if (stateTimerRef.current) window.clearTimeout(stateTimerRef.current);
    },
    [],
  );

  const pulseEdge = (side) => {
    if (reduceMotion) return;
    edgeSideRef.current = side;
    setVisualState("edge", 260);
    edgeTarget.set(0.68);
    window.requestAnimationFrame(() => edgeTarget.set(0));
  };

  const writeValue = (value, { jump = false } = {}) => {
    const nextValue = snapValue(value);
    const nextProgress = progressFromValue(nextValue, VMIN, VMAX);

    setLockedValue(nextValue);
    edgeTarget.set(0);

    if (jump) {
      progress.jump(nextProgress);
      progressTarget.set(nextProgress);
    } else {
      progressTarget.set(nextProgress);
    }

    if (nextValue === VMIN) pulseEdge(-1);
    if (nextValue === VMAX) pulseEdge(1);
  };

  const readPointer = (clientX) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return null;

    const rawX = clientX - rect.left;
    const progressValue = clampProgress(rawX / rect.width);
    const edgeOverflow =
      rawX < 0
        ? gsap.utils.clamp(0, 1, Math.abs(rawX) / 80)
        : rawX > rect.width
          ? gsap.utils.clamp(0, 1, (rawX - rect.width) / 80)
          : 0;

    return {
      progress: progressValue,
      edgeOverflow,
      edgeSide: rawX < 0 ? -1 : 1,
    };
  };

  const writeFromClient = (clientX) => {
    const next = readPointer(clientX);
    if (!next) return;

    const nextValue = snapValue(valueFromProgress(next.progress, VMIN, VMAX));
    setLockedValue(nextValue);

    progress.jump(next.progress);
    progressTarget.set(next.progress);

    if (
      next.edgeOverflow > 0 &&
      ((next.edgeSide < 0 && next.progress === 0) ||
        (next.edgeSide > 0 && next.progress === 1))
    ) {
      edgeSideRef.current = next.edgeSide;
      setVisualState("edge");
      edgeTarget.set(next.edgeOverflow);
    } else {
      setVisualState("dragging");
      edgeTarget.set(0);
    }
  };

  const step = (direction) => {
    writeValue(lockedValue + direction * STEP);
  };

  const onPointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    draggingRef.current = true;
    setVisualState("dragging");
    writeFromClient(event.clientX);
  };

  const onPointerMove = (event) => {
    if (!draggingRef.current) return;
    writeFromClient(event.clientX);
  };

  const finishPointer = (event) => {
    if (!draggingRef.current) return;

    draggingRef.current = false;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // The browser can release capture before pointerup.
    }

    const next = readPointer(event.clientX);
    if (!next) return;

    edgeTarget.set(0);
    writeValue(valueFromProgress(next.progress, VMIN, VMAX), { jump: true });
    setVisualState("idle", 140);
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      step(-1);
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      step(1);
    } else if (event.key === "Home") {
      event.preventDefault();
      writeValue(VMIN);
    } else if (event.key === "End") {
      event.preventDefault();
      writeValue(VMAX);
    }
  };

  const reset = () => {
    setSettings(JELLY_SCRUBBER_DEFAULTS);
    writeValue(INITIAL_VALUE, { jump: true });
  };

  return {
    settings,
    setSettings,
    lockedValue,
    displayValue,
    interactionState,
    trackRef,
    frameRef,
    thumbRef,
    step,
    writeValue,
    reset,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: finishPointer,
      onPointerCancel: finishPointer,
      onPointerEnter: () => {
        if (!draggingRef.current) setVisualState("hover");
      },
      onPointerLeave: () => {
        if (!draggingRef.current) setVisualState("idle");
      },
      onKeyDown,
    },
  };
}

/** Interactive jelly scrubber canvas — no demo frame or dock. */
export function JellyScrubberStage({ className, controller }) {
  const internal = useJellyScrubberStage();
  const api = controller ?? internal;

  return (
    <div className={className ? `jvs-root ${className}` : "jvs-root"}>
      <main className="jvs-stage" aria-label="Jelly value scrubber">
        <div className="jvs-showcase">
          <div className="jvs-control">
            <div className="jvs-control-head" aria-hidden>
              <span className="jvs-label">Volume</span>
              <span className="jvs-value">{api.displayValue}</span>
            </div>

            <div
              ref={api.frameRef}
              className="jvs-frame"
              data-state={api.interactionState}
              style={{
                "--jvs-handle-size": `${api.settings.handleSize}px`,
                "--jvs-field-height": `${api.settings.trackThickness}px`,
              }}
            >
              <div className="jvs-frame-inner">
                <div
                  ref={api.trackRef}
                  className="jvs-track"
                  role="slider"
                  tabIndex={0}
                  aria-label="Volume"
                  aria-valuemin={VMIN}
                  aria-valuemax={VMAX}
                  aria-valuenow={api.lockedValue}
                  aria-valuetext={`${api.lockedValue} percent`}
                  {...api.handlers}
                >
                  <div className="jvs-track-surface" aria-hidden />
                  <span ref={api.thumbRef} className="jvs-edge-thumb" aria-hidden />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export { VMIN, VMAX, INITIAL_VALUE, JELLY_SCRUBBER_DEFAULTS };
