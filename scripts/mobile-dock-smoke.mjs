/**
 * One-off mobile dock smoke test (iPhone viewport).
 * Run: node scripts/mobile-dock-smoke.mjs [baseUrl]
 */
import { chromium, devices } from "playwright";

const base = process.argv[2] || "http://localhost:5180";
const url = `${base.replace(/\/$/, "")}/work/incity`;

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  ...devices["iPhone 13"],
  hasTouch: true,
});
const page = await context.newPage();

const results = [];

function pass(label) {
  results.push({ ok: true, label });
  console.log(`PASS  ${label}`);
}

function fail(label, detail) {
  results.push({ ok: false, label, detail });
  console.error(`FAIL  ${label}${detail ? ` — ${detail}` : ""}`);
}

try {
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });

  const railHidden = await page.locator(".cs-rail").isHidden();
  if (railHidden) pass("cs-rail hidden on mobile");
  else fail("cs-rail hidden on mobile", "left rail still visible");

  const dock = page.locator(".cs-dock");
  if (await dock.isVisible()) pass("cs-dock visible");
  else fail("cs-dock visible");

  const sectionBtn = page.locator(".cs-dock__section");
  const sectionLabelBefore = (await sectionBtn.textContent())?.trim() || "";

  await page.evaluate(() => window.scrollBy(0, 900));
  await page.waitForTimeout(400);

  const sectionLabelAfterScroll = (await sectionBtn.textContent())?.trim() || "";
  if (sectionLabelAfterScroll && sectionLabelAfterScroll !== sectionLabelBefore) {
    pass(`dock section updates on scroll (${sectionLabelBefore} → ${sectionLabelAfterScroll})`);
  } else if (sectionLabelAfterScroll) {
    pass(`dock section label present after scroll (${sectionLabelAfterScroll})`);
  } else {
    fail("dock section updates on scroll", "empty label");
  }

  await sectionBtn.tap();
  await page.waitForTimeout(350);

  const sheet = page.locator(".cs-dock__sheet");
  if (await sheet.isVisible()) pass("TOC sheet opens on tap");
  else fail("TOC sheet opens on tap");

  const barBoxBefore = await page.locator(".cs-dock__bar").boundingBox();
  await page.evaluate(() => window.scrollBy(0, 250));
  await page.waitForTimeout(400);

  if (!(await sheet.isVisible())) pass("TOC sheet closes on scroll");
  else fail("TOC sheet closes on scroll", "sheet still open");

  const barBoxAfter = await page.locator(".cs-dock__bar").boundingBox();
  if (barBoxBefore && barBoxAfter) {
    const drift = Math.abs(barBoxBefore.y - barBoxAfter.y);
    if (drift < 8) pass(`dock bar stable after scroll (drift ${drift.toFixed(1)}px)`);
    else fail("dock bar stable after scroll", `drift ${drift.toFixed(1)}px`);
  } else {
    fail("dock bar stable after scroll", "missing bounding box");
  }

  // Touch swipe down on main content
  const main = page.locator(".cs-main");
  const box = await main.boundingBox();
  if (box) {
    await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height * 0.35);
    await page.mouse.move(box.x + box.width / 2, box.y + box.height * 0.35);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height * 0.75, { steps: 12 });
    await page.mouse.up();
    await page.waitForTimeout(300);
    pass("swipe-down gesture on content completed");
  } else {
    fail("swipe-down gesture", "no main bounding box");
  }

  if (!(await sheet.isVisible())) pass("sheet stays closed after swipe");
  else fail("sheet stays closed after swipe");
} catch (err) {
  fail("smoke test runtime", err.message);
} finally {
  await browser.close();
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
