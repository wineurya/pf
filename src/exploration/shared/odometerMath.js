/* Right-aligned odometer carry. Each column tracks a cumulative position whose
   value mod 10 is the visible digit, so 9→0 rolls forward like a real odometer
   instead of rewinding through 8…1. Columns whose digit did not change keep
   their position, which is what keeps them static in the DOM. */
export function rollPositions(prevPositions, prevValue, nextValue, nextText) {
  const dir = nextValue >= prevValue ? 1 : -1;
  const width = nextText.length;

  /* Right-align previous columns; a new leading column starts from 0 so
     "99" → "100" rolls the hundreds column 0→1 rather than popping in. */
  const shifted = new Array(width).fill(0);
  const overlap = Math.min(prevPositions.length, width);
  for (let i = 0; i < overlap; i += 1) {
    shifted[width - 1 - i] = prevPositions[prevPositions.length - 1 - i];
  }

  return nextText.split("").map((char, i) => {
    const digit = Number(char);
    const pos = shifted[i];
    const current = ((pos % 10) + 10) % 10;
    if (current === digit) return pos;
    return dir > 0
      ? pos + ((digit - current + 10) % 10)
      : pos - ((current - digit + 10) % 10);
  });
}
