import { useState } from "react";
import { Reorder, useReducedMotion } from "motion/react";

import { CRATE_RECORDS } from "@/exploration/crateQueue/crateQueueContent.js";

/* Snappy but settled — rows should feel like they slide into slots, not float. */
const ROW_SPRING = { type: "spring", stiffness: 620, damping: 46 };

function moveItem(list, from, to) {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

/** Interactive crate-queue canvas — no demo frame or dock. */
export function CrateQueueStage({ className }) {
  const reduceMotion = useReducedMotion() ?? false;
  const [records, setRecords] = useState(CRATE_RECORDS);
  const [draggingId, setDraggingId] = useState(null);

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
        <div className="cq-crate">
          <div className="cq-head" aria-hidden>
            <span className="cq-head-label">Tonight&rsquo;s crate</span>
            <span className="cq-head-count">{records.length} LPs</span>
          </div>

          <Reorder.Group
            axis="y"
            values={records}
            onReorder={setRecords}
            className="cq-list"
            aria-label="Records — drag a row, or focus it and use the arrow keys, to reorder"
          >
            {records.map((record, index) => (
              <Reorder.Item
                key={record.id}
                value={record}
                className={
                  draggingId === record.id ? "cq-row cq-row--dragging" : "cq-row"
                }
                tabIndex={0}
                transition={rowTransition}
                whileDrag={reduceMotion ? undefined : { scale: 1.02 }}
                onDragStart={() => setDraggingId(record.id)}
                onDragEnd={() => setDraggingId(null)}
                onKeyDown={(event) => onRowKeyDown(event, index)}
                aria-label={`${record.title} by ${record.artist}, position ${index + 1} of ${records.length}`}
              >
                <span className="cq-row-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="cq-row-title">{record.title}</span>
                <span className="cq-row-artist">{record.artist}</span>
                <span className="cq-row-year">{record.year}</span>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      </main>
    </div>
  );
}
