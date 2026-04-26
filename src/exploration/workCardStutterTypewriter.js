/** Slight ragged typing: longer pauses on "phrase" boundaries (deterministic). */
export function typeCharDelay(i) {
  return 16 + (i > 0 && i % 5 === 0 ? 28 : 0) + (i % 9 === 4 ? 16 : 0);
}

const PART_DEL_MS = 11;

function delayMs(ms) {
  return new Promise((r) => {
    window.setTimeout(r, ms);
  });
}

async function typeStutterPart(part, { setExt, getGone, setTone, idx }) {
  setTone(idx === 0 ? "s0" : "s1");
  for (let i = 0; i <= part.length; i += 1) {
    if (getGone()) return;
    setExt(part.slice(0, i));
    if (i >= part.length) continue;
    await delayMs(typeCharDelay(i));
  }
  await delayMs(400);
  for (let i = part.length; i >= 0; i -= 1) {
    if (getGone()) return;
    setExt(part.slice(0, i));
    if (i > 0) await delayMs(PART_DEL_MS);
  }
  await delayMs(120);
}

/**
 * Drives the stutter + finale typing; runs in WorkCardStutterTeaser.
 * @param {{ stutterParts: string[], finSpaced: string, setExt: (s: string) => void, setTone: (s: string) => void, getGone: () => boolean }} p
 */
export async function runWorkCardStutterSequence(p) {
  const { stutterParts, finSpaced, setExt, setTone, getGone } = p;
  setExt("");
  for (const [idx, part] of stutterParts.entries()) {
    if (getGone()) return;
    await typeStutterPart(part, { setExt, getGone, setTone, idx });
  }
  if (getGone()) return;
  setTone("finale");
  for (let i = 0; i <= finSpaced.length; i += 1) {
    if (getGone()) return;
    setExt(finSpaced.slice(0, i));
    if (i >= finSpaced.length) continue;
    await delayMs(typeCharDelay(i));
  }
}
