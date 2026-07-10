import { useEffect, useState } from "react";
import {
  Reorder,
  animate,
  useDragControls,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { DotsSixVertical } from "@phosphor-icons/react/dist/csr/DotsSixVertical";

import { CRATE_RECORDS } from "@/exploration/crateQueue/crateQueueContent.js";

const ROW_SPRING = { type: "spring", stiffness: 620, damping: 46 };
const SHADOW_IDLE = "0 1px 2px rgb(0 0 0 / 0)";
const SHADOW_LIFTED = "0 14px 32px rgb(0 0 0 / 0.16)";
const LIFT_TRANSITION = { duration: 0.18, ease: "easeOut" };
const LIFT_SCALE = 1.04;
const LIFT_ROTATE = 2;
/* Reorder springs often stop at ~0.3px, not 0 — strict === 0 left data-lifted
   (and scale 1.04 + z-index 2) stuck on multiple rows after a few drags. */
const Y_SETTLED_PX = 1;

function isYSettled(value) {
  return Math.abs(value) < Y_SETTLED_PX;
}

/* Lifted = from pickup until the released card lands. Not just isDragging
   (the lift would drop at release instead of when the row settles), and not
   just y !== 0 (mid-drag the offset re-bases through zero every time the row
   passes its own slot, which flickered the lift and let sibling covers paint
   on top for a frame). whileDrag has the same two problems, plus its scale
   gets stuck under Reorder.Item's own transform management. */
function useLift(y, dragging, reduceMotion) {
  const [lifted, setLifted] = useState(false);
  const boxShadow = useMotionValue(SHADOW_IDLE);
  const scale = useMotionValue(1);
  const rotate = useMotionValue(0);

  useEffect(() => {
    if (dragging) {
      setLifted(true);
      return undefined;
    }
    if (isYSettled(y.get())) {
      setLifted(false);
      return undefined;
    }
    /* Released mid-flight — drop the lift when the spring brings y home. */
    const unsub = y.on("change", (latest) => {
      if (isYSettled(latest)) setLifted(false);
    });
    /* ponytail: cap lift if the spring never crosses the threshold (embed scale,
       long reorder chains). Without this, z-index 2 + scale stack on siblings. */
    const cap = window.setTimeout(() => setLifted(false), 700);
    return () => {
      unsub();
      window.clearTimeout(cap);
    };
  }, [y, dragging]);

  useEffect(() => {
    animate(boxShadow, lifted ? SHADOW_LIFTED : SHADOW_IDLE, LIFT_TRANSITION);
    if (!reduceMotion) {
      animate(scale, lifted ? LIFT_SCALE : 1, LIFT_TRANSITION);
      animate(rotate, lifted ? LIFT_ROTATE : 0, LIFT_TRANSITION);
    }
  }, [lifted, boxShadow, scale, rotate, reduceMotion]);

  return { lifted, boxShadow, scale, rotate };
}

function moveItem(list, from, to) {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function RecordRow({
  record,
  index,
  total,
  reduceMotion,
  rowTransition,
  onKeyDown,
}) {
  const controls = useDragControls();
  const y = useMotionValue(0);
  const [dragging, setDragging] = useState(false);
  const { lifted, boxShadow, scale, rotate } = useLift(y, dragging, reduceMotion);

  return (
    <Reorder.Item
      value={record}
      className="cq-row"
      data-lifted={lifted || undefined}
      tabIndex={0}
      /* No zIndex here — Reorder.Item writes its own inline value and
         overrides anything passed. Stacking is handled in styles.css. */
      style={{ y, boxShadow, scale, rotate }}
      transition={rowTransition}
      dragListener={false}
      dragControls={controls}
      /* No ref dragConstraints — Motion attaches window.resize →
         scalePositionWithinConstraints (strips transform, remeasures). iOS
         Safari / mobile Chrome fire that on every URL-bar show/hide, which
         glitches the list. Three rows + dragElastic is enough without a box. */
      dragElastic={0.08}
      dragMomentum={false}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onKeyDown={onKeyDown}
      aria-label={`${record.title} by ${record.artist}, position ${index + 1} of ${total}`}
    >
      {/* backdrop-filter sits on this untransformed child — combined with a
         transform on the same box it breaks in Chromium. Blur is only enabled
         while dragging (see styles.css) so idle rows cost nothing. */}
      <span className="cq-row-glass" aria-hidden="true" />
      <div className="cq-row-body">
        <img
          className="cq-row-cover"
          src={record.cover}
          alt=""
          width={40}
          height={40}
          decoding="async"
          loading="lazy"
          draggable={false}
        />
        <span className="cq-row-index">{String(index + 1).padStart(2, "0")}</span>
        <span className="cq-row-copy">
          <span className="cq-row-title">{record.title}</span>
          <span className="cq-row-artist">{record.artist}</span>
        </span>
        <span
          className="cq-row-handle"
          aria-hidden="true"
          onPointerDown={(event) => {
            event.preventDefault();
            controls.start(event, {
              distanceThreshold: event.pointerType === "touch" ? 8 : 3,
            });
          }}
        >
          <DotsSixVertical size={16} weight="bold" aria-hidden />
        </span>
      </div>
    </Reorder.Item>
  );
}

/** Interactive crate-queue canvas — no demo frame or dock. */
export function CrateQueueStage({ className }) {
  const reduceMotion = useReducedMotion() ?? false;
  const [records, setRecords] = useState(CRATE_RECORDS);
  const rowTransition = reduceMotion ? { duration: 0 } : ROW_SPRING;

  const onRowKeyDown = (event, index) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setRecords((list) => moveItem(list, index, index - 1));
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setRecords((list) => moveItem(list, index, index + 1));
    }
  };

  return (
    <div className={className ? `cq-root ${className}` : "cq-root"}>
      <main className="cq-stage" aria-label="Crate queue">
        <a
          className="cq-credit"
          href="https://twitter.com/alyx_so"
          target="_blank"
          rel="noopener noreferrer"
        >
          inspired by @alyx_so on twitter
        </a>

        <div className="cq-crate">
          <div className="cq-head" aria-hidden>
            <span className="cq-head-label">Tonight&rsquo;s crate</span>
            <span className="cq-head-count">{records.length} tracks</span>
          </div>

          <Reorder.Group
            axis="y"
            values={records}
            onReorder={setRecords}
            className="cq-list"
            aria-label="Tracks — drag the handle, or focus a row and use the arrow keys, to reorder"
          >
            {records.map((record, index) => (
              <RecordRow
                key={record.id}
                record={record}
                index={index}
                total={records.length}
                reduceMotion={reduceMotion}
                rowTransition={rowTransition}
                onKeyDown={(event) => onRowKeyDown(event, index)}
              />
            ))}
          </Reorder.Group>
        </div>
      </main>
    </div>
  );
}
