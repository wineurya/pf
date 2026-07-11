import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useAnimationFrame, useMotionValue } from "motion/react";
import { FILMSTRIP_GLIDE } from "../lib/motion.js";
import { usePrefersReducedMotion } from "../lib/hooks.js";

/** Idle drift speed, px/s — slow enough to read as ambient, not a marquee. */
const DRIFT_SPEED = 22;

/**
 * Looping filmstrip at the bottom of the About panel — the full photo set
 * for every hover-word, drifting sideways while idle. Clicking a hover-word
 * (or a photo here) glides the strip to that word's photos and holds; the
 * rest of the strip dims. Deselecting resumes the drift from wherever it is.
 *
 * The track renders two copies of the strip and wraps `offset` modulo one
 * copy's width, so the loop is seamless and the glide can pick the nearest
 * wrapped target instead of rewinding the long way round.
 */
export function AboutFilmstrip({ groups, selectedWord, onSelect }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  /* Live motion value (not a plain ref): a spring glide reads its velocity, so
     a fast hover from one word to the next carries momentum instead of
     restarting from a dead stop. Drift and glide both write it. */
  const offset = useMotionValue(0);
  const glideRef = useRef(null);
  /* One copy's width, measured off the DOM. Cached (not read from scrollWidth
     each frame) so the drift loop never forces a synchronous layout — a
     ResizeObserver refreshes it when images load or the strip reflows. */
  const loopWRef = useRef(0);
  /* Reasons to hold the ambient drift still: pointer resting on the strip, the
     tab backgrounded, or the strip scrolled out of view. None of these should
     burn animation frames moving pixels no one is watching. */
  const hoverPausedRef = useRef(false);
  const hiddenRef = useRef(false);
  const offscreenRef = useRef(false);
  /* The exact photo button that was clicked, so the glide centers IT —
     not just the word's first photo. Hover-driven selections leave this
     null and fall back to the group's first photo. */
  const clickedElRef = useRef(null);
  /* Bumped on every photo click so the glide effect re-runs even when the
     selected word itself didn't change (second photo of the same group). */
  const [clickTick, setClickTick] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  const photos = useMemo(
    () => groups.flatMap((g) => g.photos.map((p) => ({ ...p, word: g.word }))),
    [groups],
  );

  function applyOffset() {
    const track = trackRef.current;
    const loopW = loopWRef.current;
    if (!track || !loopW) return;
    let x = offset.get() % loopW;
    if (x < 0) x += loopW;
    track.style.transform = `translate3d(${-x}px, 0, 0)`;
  }

  /* Measure one copy's width up front and whenever the track reflows (lazy
     images arriving, the mobile size breakpoint). Keeps the per-frame path
     layout-read-free. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      loopWRef.current = track.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  /* Pause the drift when the tab is hidden (Sonner's rule: don't run timers /
     motion the user can't see) and when the strip is scrolled out of view. */
  useEffect(() => {
    const onVisibility = () => {
      hiddenRef.current = document.hidden;
    };
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);

    const viewport = viewportRef.current;
    let io;
    if (viewport) {
      io = new IntersectionObserver(
        ([entry]) => {
          offscreenRef.current = !entry.isIntersecting;
        },
        { rootMargin: "200px" },
      );
      io.observe(viewport);
    }
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      io?.disconnect();
    };
  }, []);

  useAnimationFrame((_, delta) => {
    if (
      selectedWord ||
      reducedMotion ||
      glideRef.current ||
      hoverPausedRef.current ||
      hiddenRef.current ||
      offscreenRef.current
    )
      return;
    offset.set(offset.get() + (DRIFT_SPEED * delta) / 1000);
    applyOffset();
  });

  useEffect(() => {
    glideRef.current?.stop();
    glideRef.current = null;
    if (!selectedWord) {
      clickedElRef.current = null;
      return;
    }

    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    const loopW = loopWRef.current || track.scrollWidth / 2;
    const clicked = clickedElRef.current;
    const el =
      clicked?.isConnected && clicked.dataset.word === selectedWord
        ? clicked
        : track.querySelector(`[data-word="${CSS.escape(selectedWord)}"]`);
    if (!el || !loopW) return;

    // Land the word's photo mid-viewport via the nearest wrapped copy. `offset`
    // is the raw, ever-growing drift value; glide to the copy of the target
    // nearest the CURRENT position so the strip never rewinds the long way.
    const target = el.offsetLeft + el.offsetWidth / 2 - viewport.clientWidth / 2;
    const raw = offset.get();
    const wrapped = ((raw % loopW) + loopW) % loopW;
    const goal = ((target % loopW) + loopW) % loopW;
    let delta = (((goal - wrapped) % loopW) + loopW) % loopW;
    if (delta > loopW / 2) delta -= loopW; // take the shorter way round
    const best = raw + delta;

    if (reducedMotion) {
      offset.set(best);
      applyOffset();
      return;
    }

    // A spring, not a fixed-duration ease: animating the live motion value lets
    // a mid-glide re-target (hover word A → word B) inherit the current velocity
    // and settle naturally, instead of easing in from zero every time.
    glideRef.current = animate(offset, best, {
      ...FILMSTRIP_GLIDE,
      onUpdate: applyOffset,
      onComplete: () => {
        glideRef.current = null;
      },
    });
    return () => {
      glideRef.current?.stop();
      glideRef.current = null;
    };
  }, [selectedWord, clickTick, reducedMotion]);

  return (
    <div className="afilm" data-has-selection={selectedWord ? "true" : "false"}>
      <div
        className="afilm__viewport"
        ref={viewportRef}
        onMouseEnter={() => {
          hoverPausedRef.current = true;
        }}
        onMouseLeave={() => {
          hoverPausedRef.current = false;
        }}
      >
        <div className="afilm__track" ref={trackRef}>
          {[0, 1].map((copy) => (
            <div
              className="afilm__strip"
              key={copy}
              aria-hidden={copy === 1 || undefined}
            >
              {photos.map((p, i) => (
                <button
                  key={`${p.src}-${i}`}
                  type="button"
                  className={`afilm__photo${p.word === selectedWord ? " is-active" : ""}`}
                  data-word={p.word}
                  tabIndex={copy === 1 ? -1 : undefined}
                  aria-label={p.cap ?? p.alt}
                  aria-pressed={copy === 0 ? p.word === selectedWord : undefined}
                  onClick={(e) => {
                    // Second click on the same photo deselects; any other
                    // photo (same word or not) becomes the new center.
                    if (
                      p.word === selectedWord &&
                      clickedElRef.current === e.currentTarget
                    ) {
                      clickedElRef.current = null;
                      onSelect(null);
                      return;
                    }
                    clickedElRef.current = e.currentTarget;
                    setClickTick((t) => t + 1);
                    onSelect(p.word);
                  }}
                >
                  {/* Positioning shell: the photo and its (optional) die-cut
                      sticker move, dim and scale as one unit. The sticker
                      straddles the frame edge named by `edge`, offset `at`%
                      along it — placements live in the content data. */}
                  <span className="afilm__pic">
                    <img
                      className="afilm__img"
                      src={p.src}
                      alt={copy === 0 ? p.alt : ""}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                    {p.sticker ? (
                      <img
                        className="afilm__sticker"
                        src={p.sticker.src}
                        alt=""
                        data-edge={p.sticker.edge}
                        style={{
                          "--at": `${p.sticker.at}%`,
                          "--tilt": `${p.sticker.tilt}deg`,
                        }}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                    ) : null}
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
