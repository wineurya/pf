#!/usr/bin/env node
/**
 * Crawl wineury.design and download media assets into exports/wineury-design/
 *
 * Layout:
 *   hero/{imagery|icons|videos|fonts|other}
 *   about/{imagery|icons|videos|fonts|other}
 *   cases/{slug}/{mockups|imagery|icons|videos|fonts|documents|other}
 *   site/{imagery|icons|videos|fonts|other}   — shared / non-case pages
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_ROOT = path.join(ROOT, 'exports', 'wineury-design');
const BASE = 'https://wineury.design';

const CASE_SLUGS = ['incity', 'resolutions', 'siren', 'logitech', 'avance', 'kinetix', 'levan'];

const ASSET_EXT =
  /\.(?:png|jpe?g|webp|gif|svg|avif|mp4|webm|mov|m4v|pdf|woff2?|ttf|otf|ico|riv|json)(?:\?[^\s"'<>\\)]*)?$/i;

const FRAMER_HOST =
  /^https?:\/\/(?:framerusercontent\.com|framer\.com\/images|app\.framerstatic\.com)/i;

function uniq(arr) {
  return [...new Set(arr)];
}

function decodeHtml(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function normalizeUrl(raw) {
  const url = decodeHtml(raw.trim());
  try {
    const u = new URL(url);
    // Drop resize query params that break Framer CDN when encoded wrong; keep clean base for dedupe
    if (u.hostname.includes('framerusercontent.com') && u.pathname.match(/\.(png|jpe?g|webp|svg|avif)$/i)) {
      return `${u.origin}${u.pathname}`;
    }
    return u.href;
  } catch {
    return null;
  }
}

function slugFromUrl(url) {
  try {
    const base = new URL(url).pathname.split('/').pop() || 'asset';
    return base.replace(/\.[a-z0-9]+$/i, '').slice(0, 96);
  } catch {
    return 'unknown';
  }
}

function extFromUrl(url) {
  try {
    const base = new URL(url).pathname.split('/').pop() || 'asset';
    const m = base.match(/\.([a-z0-9]+)$/i);
    if (m) return m[1].toLowerCase();
  } catch {}
  if (/\.mp4/i.test(url)) return 'mp4';
  if (/\.webm/i.test(url)) return 'webm';
  return 'bin';
}

function caseFromPageUrl(pageUrl) {
  const u = new URL(pageUrl);
  const parts = u.pathname.split('/').filter(Boolean);
  if (!parts.length) return null;

  const last = parts[parts.length - 1].toLowerCase();
  if (CASE_SLUGS.includes(last)) return last;
  if (last === 'incity-old' || last.startsWith('incity')) return 'incity';
  if (parts[0] === 'cases' && CASE_SLUGS.includes(parts[1])) return parts[1];

  const joined = parts.join('-');
  if (joined.includes('incity')) return 'incity';
  if (joined.includes('siren')) return 'siren';
  if (joined.includes('resolution')) return 'resolutions';
  if (joined.includes('logitech')) return 'logitech';
  if (joined.includes('levan')) return 'levan';
  if (joined.includes('avance')) return 'avance';
  if (joined.includes('kinetix')) return 'kinetix';
  return null;
}

function pageBucket(pageUrl) {
  const u = new URL(pageUrl);
  const p = u.pathname;
  if (p === '/' || p === '') return 'hero';
  if (p.includes('/about') || p.includes('old/about')) return 'about';
  if (caseFromPageUrl(pageUrl)) return 'case';
  return 'site';
}

function categorize(url, pageUrl) {
  const lower = url.toLowerCase();
  const ext = extFromUrl(url);

  if (['mp4', 'webm', 'mov', 'm4v'].includes(ext)) return 'videos';
  if (['woff', 'woff2', 'ttf', 'otf'].includes(ext)) return 'fonts';
  if (ext === 'pdf') return 'documents';
  if (ext === 'riv') return 'animations';
  if (ext === 'svg' || lower.includes('/icons/') || lower.includes('icon')) return 'icons';

  if (
    lower.includes('mock') ||
    lower.includes('phone') ||
    lower.includes('device') ||
    lower.includes('iphone') ||
    lower.includes('frame') ||
    lower.includes('screen') ||
    lower.includes('wireframe') ||
    lower.includes('prototype')
  ) {
    return 'mockups';
  }

  if (['png', 'jpg', 'jpeg', 'webp', 'gif', 'avif'].includes(ext)) return 'imagery';
  if (ext === 'json') return 'data';
  return 'other';
}

function isDownloadable(url) {
  const ext = extFromUrl(url);
  if (['mjs', 'js', 'css', 'html'].includes(ext)) return false;
  if (ASSET_EXT.test(url)) return true;
  if (FRAMER_HOST.test(url)) {
    const ext2 = extFromUrl(url);
    return !['mjs', 'js'].includes(ext2);
  }
  return false;
}

function extractAssets(html) {
  const found = [];
  const patterns = [
    /https?:\/\/[^\s"'<>\\)]+/gi,
    /url\(["']?(https?:[^"')]+)["']?\)/gi,
  ];

  for (const re of patterns) {
    let m;
    while ((m = re.exec(html))) {
      const raw = m[1] ?? m[0];
      const url = normalizeUrl(raw);
      if (url && isDownloadable(url)) found.push(url);
    }
  }

  const srcsetRe = /srcset=["']([^"']+)["']/gi;
  let m;
  while ((m = srcsetRe.exec(html))) {
    for (const part of m[1].split(',')) {
      const url = normalizeUrl(part.trim().split(/\s+/)[0]);
      if (url && isDownloadable(url)) found.push(url);
    }
  }

  return uniq(found);
}

function extractLinks(html, origin) {
  const links = [];
  const re = /href=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) {
    try {
      const href = m[1];
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:'))
        continue;
      const abs = new URL(href, origin).href.split('#')[0];
      if (abs.includes('wineury.design')) links.push(abs);
    } catch {}
  }
  return uniq(links);
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; wineury-asset-archiver/2.0)' },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.text();
}

async function downloadFile(url, dest) {
  await fs.mkdir(path.dirname(dest), { recursive: true });
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; wineury-asset-archiver/2.0)' },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(dest, buf);
  return buf.length;
}

function destPath(url, pageUrl) {
  const ext = extFromUrl(url);
  const baseName = slugFromUrl(url);
  const hash = Buffer.from(url).toString('base64url').slice(-8);
  const category = categorize(url, pageUrl);
  const bucket = pageBucket(pageUrl);
  const caseSlug = caseFromPageUrl(pageUrl);

  let dir;
  if (bucket === 'hero') dir = path.join(OUT_ROOT, 'hero', category);
  else if (bucket === 'about') dir = path.join(OUT_ROOT, 'about', category);
  else if (bucket === 'case' && caseSlug)
    dir = path.join(OUT_ROOT, 'cases', caseSlug, category);
  else dir = path.join(OUT_ROOT, 'site', category);

  return path.join(dir, `${baseName}-${hash}.${ext}`);
}

async function loadSearchIndexPages(html) {
  const pages = [];
  const re = /searchIndex-[A-Za-z0-9_-]+\.json/g;
  const ids = uniq(html.match(re) || []);
  for (const id of ids) {
    const url = `https://framerusercontent.com/sites/7cfarnVbERCSGxfjoj6eRO/${id}`;
    try {
      const json = JSON.parse(await fetchText(url));
      for (const key of Object.keys(json)) {
        if (key.startsWith('/')) pages.push(`${BASE}${key}`);
      }
    } catch {}
  }
  return uniq(pages);
}

async function main() {
  console.log('Fetching homepage + search index...');
  const homeHtml = await fetchText(`${BASE}/`);
  const seedPages = uniq([
    `${BASE}/`,
    `${BASE}/cases`,
    `${BASE}/incity`,
    `${BASE}/incity-old`,
    `${BASE}/old-home`,
    ...(await loadSearchIndexPages(homeHtml)),
  ]);

  const visitedPages = new Set();
  const queue = [...seedPages];
  const assets = new Map();

  console.log(`Crawling ${seedPages.length} seed pages...\n`);
  while (queue.length) {
    const pageUrl = queue.shift();
    if (visitedPages.has(pageUrl)) continue;
    visitedPages.add(pageUrl);

    let html;
    try {
      html = await fetchText(pageUrl);
      console.log(`  OK ${pageUrl}`);
    } catch (e) {
      console.log(`  skip ${pageUrl} (${e.message})`);
      continue;
    }

    for (const link of extractLinks(html, pageUrl)) {
      if (!visitedPages.has(link) && link.includes('wineury.design')) queue.push(link);
    }

    for (const assetUrl of extractAssets(html)) {
      if (!assets.has(assetUrl)) assets.set(assetUrl, { page: pageUrl });
    }
  }

  console.log(`\nFound ${assets.size} assets on ${visitedPages.size} pages`);
  console.log('Downloading...\n');

  const manifest = {
    scrapedAt: new Date().toISOString(),
    source: BASE,
    pages: [...visitedPages].sort(),
    assets: [],
    errors: [],
  };

  let i = 0;
  for (const [url, meta] of assets) {
    i++;
    const dest = destPath(url, meta.page);
    const rel = path.relative(ROOT, dest);
    try {
      const bytes = await downloadFile(url, dest);
      manifest.assets.push({
        url,
        path: rel,
        bytes,
        category: categorize(url, meta.page),
        caseSlug: caseFromPageUrl(meta.page),
        page: meta.page,
      });
      console.log(`  [${i}/${assets.size}] ${path.relative(OUT_ROOT, dest)} (${bytes})`);
    } catch (e) {
      manifest.errors.push({ url, error: e.message, page: meta.page });
      console.log(`  [${i}/${assets.size}] FAIL ${url.slice(0, 90)}… (${e.message})`);
    }
  }

  await fs.mkdir(OUT_ROOT, { recursive: true });
  await fs.writeFile(path.join(OUT_ROOT, 'manifest.json'), JSON.stringify(manifest, null, 2));

  const byCase = {};
  for (const a of manifest.assets) {
    const key = a.caseSlug || a.page.includes('/about') ? 'about' : 'site';
    byCase[key] = (byCase[key] || 0) + 1;
  }

  console.log(`\nDone: ${manifest.assets.length} downloaded, ${manifest.errors.length} failed.`);
  console.log(`Output: ${OUT_ROOT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
