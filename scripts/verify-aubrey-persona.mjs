import { chromium, devices } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.PREVIEW_URL ?? "http://127.0.0.1:4173";
const outDir = path.resolve("exports/visual-check");

async function checkPersona(page, label) {
  await page.goto(`${baseUrl}/work/siren`, { waitUntil: "networkidle" });
  await page.waitForSelector(".persona__photo", { timeout: 15000 });
  await page.locator(".persona__photo").scrollIntoViewIfNeeded();

  const metrics = await page.locator(".persona__photo").evaluate((img) => ({
    src: img.currentSrc || img.src,
    alt: img.alt,
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight,
    clientWidth: img.clientWidth,
    clientHeight: img.clientHeight,
    complete: img.complete,
  }));

  const shotPath = path.join(outDir, `siren-aubrey-${label}.png`);
  await page.locator(".persona").screenshot({ path: shotPath });

  return { label, metrics, shotPath };
}

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const results = [];

try {
  {
    const context = await browser.newContext({ ...devices["iPhone 14"] });
    const page = await context.newPage();
    results.push(await checkPersona(page, "iphone14"));
    await context.close();
  }
  {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();
    results.push(await checkPersona(page, "desktop"));
    await context.close();
  }
} finally {
  await browser.close();
}

const report = {
  checkedAt: new Date().toISOString(),
  baseUrl,
  results,
  ok: results.every(
    (r) =>
      r.metrics.naturalWidth > 0 &&
      r.metrics.clientWidth > 0 &&
      r.metrics.clientHeight > 0,
  ),
};

await writeFile(path.join(outDir, "siren-aubrey-report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
process.exit(report.ok ? 0 : 1);
