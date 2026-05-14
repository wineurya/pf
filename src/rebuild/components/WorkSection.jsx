import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/exploration/useReducedMotion.js";
import { REBUILD_ASSETS } from "@/rebuild/data/assets.js";

const workCardArticleBase =
  "flex h-full min-h-[520px] flex-col overflow-hidden rounded-2xl md:min-h-[660px]";

/*
 * Solid bubbles for InCity / chat preview.
 * Fills use theme-agnostic LITERALS (#0a0a0a / #ffffff), not the `--wx-black` /
 * `--wx-white` tokens — those swap to dark gray in dark mode and would make
 * both sides of the conversation collapse to the same dark surface. With
 * literals, the convo always reads as a proper back-and-forth (dark left ↔
 * light right) in either theme.
 */
function incityBubbleChrome(dark, shadow) {
  const bubbleBase =
    "flex max-w-full items-center justify-center overflow-hidden rounded-[32px] border px-4 py-2";
  const lightBubble = `${bubbleBase} border-[color-mix(in_srgb,#0a0a0a_8%,transparent)] bg-white text-[#171717]`;
  const darkBubble = `${bubbleBase} border-transparent bg-[#0a0a0a] text-white`;
  const bubble = dark ? darkBubble : lightBubble;
  const shadowCls =
    "shadow-[0_2px_14px_color-mix(in_srgb,#0a0a0a_24%,transparent)]";
  return shadow ? `${bubble} ${shadowCls}` : bubble;
}

function AvanceCard() {
  return (
    <article
      className={`${workCardArticleBase} border border-[rgba(212,165,116,0)]`}
    >
      <div className="relative w-full flex-1 min-h-[320px] max-sm:min-h-[400px] overflow-hidden sm:h-[558px] sm:min-h-0 sm:flex-none sm:shrink-0">
        <div className="absolute left-1/2 top-1/2 h-[562px] w-[649px] max-w-none -translate-x-1/2 -translate-y-1/2">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 overflow-hidden opacity-60">
              <img
                src={REBUILD_ASSETS.avanceBackdrop}
                alt=""
                className="absolute left-[-41.56%] top-[-105.35%] h-[211.57%] w-[183.27%] max-w-none object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[80.147%] to-[var(--wx-page-bg)] to-[97.874%]" />
          </div>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] hidden h-[min(52%,240px)] max-sm:block bg-gradient-to-b from-transparent from-[28%] to-[var(--wx-page-bg)]"
        />
        <div className="absolute left-[-24px] right-[-22.5px] top-1/2 z-[2] aspect-[645/558] -translate-y-1/2">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img
              src={REBUILD_ASSETS.avancePhones}
              alt="Avance product mockups"
              className="absolute left-[17.63%] top-[13.08%] h-[78.5%] w-[64.75%] max-w-none object-contain"
            />
          </div>
        </div>
      </div>
      <footer className="mt-auto flex shrink-0 flex-col px-6 pb-6 pt-[26px]">
        <div className="flex flex-col gap-2">
          <div className="relative h-6 w-32">
            <div className="absolute left-0 top-1/2 size-6 -translate-y-1/2 overflow-hidden rounded-[3.11px]">
              <div className="flex aspect-square h-full flex-col overflow-hidden bg-gradient-to-b from-[#f0e4d0] to-[#d4a574]">
                <img src={REBUILD_ASSETS.avanceMarkVector} alt="" className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2" width={16} height={16} />
              </div>
            </div>
            <div className="absolute left-8 top-1/2 -translate-y-1/2 font-[family-name:var(--font-body)] text-[14px] font-semibold leading-5 text-[var(--wx-ink)]">
              Avance
            </div>
          </div>
          <p className="m-0 font-[family-name:var(--font-body)] text-[14px] font-normal leading-5 text-[var(--wx-muted)]">
            Coaching when you slow down.
          </p>
        </div>
      </footer>
    </article>
  );
}

function clsRow(rowCls) {
  return `flex w-full max-w-[429px] flex-col justify-center ${rowCls}`;
}

const BUBBLE_TEXT = "m-0 font-[family-name:var(--font-body)] text-[16px] font-semibold leading-[21px] tracking-[-0.4px]";

const INCITY_MSGS = [
  {
    id: "q1", dark: true, shadow: false, cls: "items-start",
    node: (
      <p className={`${BUBBLE_TEXT} text-right`}>
        <span className="text-[rgba(255,255,255,0.48)]">See a </span>
        <span className="text-white">city problem?</span>
      </p>
    ),
  },
  {
    id: "a1", dark: false, shadow: false, cls: "items-end",
    node: <p className={`${BUBBLE_TEXT} text-inherit`}>All the time!</p>,
  },
  {
    id: "q2", dark: true, shadow: true, cls: "items-start",
    node: (
      <p className={`${BUBBLE_TEXT} text-right`}>
        <span className="text-[rgba(255,255,255,0.48)]">Waiting on </span>
        <span className="text-white">city updates?</span>
      </p>
    ),
  },
  {
    id: "a2", dark: false, shadow: true, cls: "items-end",
    node: <p className={`${BUBBLE_TEXT} text-inherit`}>Yes! So annoying!</p>,
  },
  {
    id: "q3", dark: true, shadow: false, cls: "items-start",
    node: (
      <p className={`${BUBBLE_TEXT} text-right`}>
        <span className="text-[rgba(255,255,255,0.48)]">Wish</span>
        <span className="text-white"> reporting </span>
        <span className="text-[rgba(255,255,255,0.48)]">was </span>
        <span className="text-white">simpler?</span>
      </p>
    ),
  },
  {
    id: "a3", dark: false, shadow: false, cls: "items-end",
    node: <p className={`${BUBBLE_TEXT} text-inherit`}>Tell me you have a solution!</p>,
  },
];

const BUBBLE_DELAYS_MS = [320, 980, 740, 1120, 860, 1000];
const LOOP_PAUSE_MS = 2600;
const INCITY_PANEL_BOTTOM =
  "absolute bottom-[22%] left-1/2 -translate-x-1/2 z-[2] flex w-[min(100%,429px)] flex-col gap-3 px-3";

function IncityConversation() {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    if (!inView) { setCount(0); return; }
    if (count >= INCITY_MSGS.length) {
      const t = setTimeout(() => setCount(0), LOOP_PAUSE_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCount((c) => c + 1), BUBBLE_DELAYS_MS[count] ?? 800);
    return () => clearTimeout(t);
  }, [inView, count, reduceMotion]);

  const spring = { type: "spring", stiffness: 420, damping: 38, mass: 0.88 };

  if (reduceMotion) {
    return (
      <div className={INCITY_PANEL_BOTTOM}>
        {INCITY_MSGS.map((msg) => (
          <div key={msg.id} className={clsRow(msg.cls)}>
            <div className={incityBubbleChrome(msg.dark, msg.shadow)}>{msg.node}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={INCITY_PANEL_BOTTOM}>
      <AnimatePresence>
        {INCITY_MSGS.slice(0, count).map((msg) => (
          <motion.div
            key={msg.id}
            layout
            initial={{ opacity: 0, y: 18, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: spring }}
            exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.18, ease: "easeIn" } }}
            className={clsRow(msg.cls)}
          >
            <div className={incityBubbleChrome(msg.dark, msg.shadow)}>{msg.node}</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function IncityCard() {
  return (
    <article className={`${workCardArticleBase} border border-[rgba(0,132,255,0)]`}>
      <div className="relative w-full flex-1 min-h-[320px] max-sm:min-h-[400px] overflow-hidden sm:h-[558px] sm:min-h-0 sm:flex-none sm:shrink-0">
        <div className="absolute left-1/2 top-1/2 h-[558px] w-[746px] max-w-none -translate-x-1/2 -translate-y-1/2">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 overflow-hidden opacity-[0.64]">
              <img
                src={REBUILD_ASSETS.incityBackdrop}
                alt=""
                className="absolute left-[-30.5%] top-[-1.34%] h-[106.99%] w-[142.67%] max-w-none object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[80.147%] to-[var(--wx-page-bg)] to-[97.874%]" />
          </div>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] hidden h-[min(52%,240px)] max-sm:block bg-gradient-to-b from-transparent from-[28%] to-[var(--wx-page-bg)]"
        />
        <IncityConversation />
      </div>
      <footer className="mt-auto flex shrink-0 flex-col px-6 pb-6 pt-[26px]">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex size-6 items-center justify-center overflow-hidden rounded-[3.11px]">
              <img src={REBUILD_ASSETS.incityMark} alt="" className="size-6 object-cover" width={24} height={24} />
            </div>
            <span className="font-[family-name:var(--font-body)] text-[14px] font-semibold leading-5 text-[var(--wx-ink)]">
              InCity
            </span>
            <span className="font-[family-name:var(--font-body)] text-[14px] font-semibold leading-5 text-[rgba(102,102,102,0.4)]">
              ATL311
            </span>
          </div>
          <p className="m-0 font-[family-name:var(--font-body)] text-[14px] font-normal leading-5 text-[var(--wx-muted)]">
            Mobile-first civic reporting for Atlanta.
          </p>
        </div>
      </footer>
    </article>
  );
}

function IncomingCard() {
  return (
    <article className={`${workCardArticleBase} justify-end border border-[rgba(212,165,116,0)]`}>
      <footer className="flex shrink-0 flex-col px-6 pb-6 pt-[26px]">
        <div className="flex flex-col gap-2">
          <div className="relative h-6 w-full min-w-[12rem]">
            <div className="absolute left-0 top-1/2 size-6 -translate-y-1/2 rounded-[3.11px] bg-[#bcbcbc]" aria-hidden />
            <div className="absolute left-8 top-1/2 -translate-y-1/2 font-[family-name:var(--font-body)] text-[14px] font-semibold leading-5 text-[var(--wx-ink)]">
              Incoming Project
            </div>
          </div>
          <p className="m-0 font-[family-name:var(--font-body)] text-[14px] font-normal leading-5 text-[var(--wx-muted)]">
            Needs visuals
          </p>
        </div>
      </footer>
    </article>
  );
}

export function WorkSection() {
  return (
    <section
      id="rebuild-work"
      className="scroll-mt-[7rem] border-0 border-transparent outline-none"
      aria-labelledby="rebuild-work-heading"
    >
      <h2 id="rebuild-work-heading" className="sr-only">
        Selected work
      </h2>
      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-6">
        <AvanceCard />
        <IncityCard />
        <IncomingCard />
        <IncomingCard />
      </div>
    </section>
  );
}
