/* Build-time data for the Diff Pulse exploration: real {add, del} line-change
   stats from this repo's own git history. Buckets commits down to at most
   MAX_EVENTS entries (oldest → newest) and writes
   src/exploration/diffPulse/diffPulseData.json. Re-run to refresh:

     node scripts/generate-diff-pulse-data.mjs
*/

import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_EVENTS = 60;
const OUT = fileURLToPath(
  new URL("../src/exploration/diffPulse/diffPulseData.json", import.meta.url),
);

const log = execSync("git log --reverse --numstat --format=@%H", {
  encoding: "utf8",
  maxBuffer: 64 * 1024 * 1024,
});

/* Sum numstat lines per commit; binary files report "-\t-" and are skipped. */
const commits = [];
let current = null;
for (const line of log.split("\n")) {
  if (line.startsWith("@")) {
    current = { add: 0, del: 0 };
    commits.push(current);
  } else if (current) {
    const match = line.match(/^(\d+)\t(\d+)\t/);
    if (match) {
      current.add += Number(match[1]);
      current.del += Number(match[2]);
    }
  }
}

const nonEmpty = commits.filter((c) => c.add + c.del > 0);

/* Thin long histories by merging consecutive commits into even buckets so the
   running totals stay honest — sums, not samples. */
const events = [];
const bucketSize = Math.ceil(nonEmpty.length / MAX_EVENTS);
for (let i = 0; i < nonEmpty.length; i += bucketSize) {
  const bucket = nonEmpty.slice(i, i + bucketSize);
  events.push({
    add: bucket.reduce((sum, c) => sum + c.add, 0),
    del: bucket.reduce((sum, c) => sum + c.del, 0),
  });
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, `${JSON.stringify(events)}\n`);
console.log(
  `diffPulseData.json: ${events.length} events from ${nonEmpty.length} commits ` +
    `(+${events.reduce((s, e) => s + e.add, 0)} −${events.reduce((s, e) => s + e.del, 0)})`,
);
