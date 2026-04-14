// =============================================================
// pill_badges.jsx
// Shape layer (pill-bg) + text (pill-text) as child in the active comp — no precomps.
// Better for Lottie: fewer nested comps, simpler layer tree.
//
// Figma: [Testing](https://www.figma.com/design/ehQYOquLYoGBReIO32iya0/Testing) — chip **10:33** (Frame 14). Canvas 183:2 is empty in MCP; use 10:33 for specs.
// Type: SF Pro when installed (preferred); Geist / Arial fallbacks. Tracking in 1/1000 em.
// Text vertical: leading uses conventional size/line pairs (14→20, 16→24, 20→28), not font=leading.
// Vertical centering uses a stable reference rect (ascender+descender probe string) so descenders
// in label text (g j p q y) do not shift the anchor midpoint downward relative to cap-height strings.
// Fills: Tailwind 600 + evenly spaced "wheel" hues (~same chroma/lightness) for wide range.
// Capsule: roundness = min(width,height)/2 (same geometry as Figma "full pill" / iOS capsule).
//
// Layer stack: all shape layers first (below), then all text layers (above) — still parented per pill.
// Layout: optional grid, or stack all pills at comp center. Timeline: optional stagger via layer startTime
// (tuned for ~30fps comps: frame steps use comp.frameDuration, optional snap to whole frames).
//
// Usage: Select an active composition → File → Scripts → Run Script File...
// =============================================================

(function createPillBadges() {
  // ── LAYOUT ─────────────────────────────────────────────────

  /** Frame 10:33 height (px) — MCP get_design_context 2026-04. Bumped 28→32 to match 16px type. */
  var PILL_HEIGHT = 32;
  /** Figma padding: px-[12px] py-[4px] on frame 10:33. Bumped to keep proportion with 32px pill. */
  var PAD_H = 14;
  var PAD_V = 4;
  var FONT_SIZE = 16;

  var INNER_H = PILL_HEIGHT - 2 * PAD_V;

  var TEXT_Y_NUDGE = 0;

  /**
   * Optional override from Figma Inspect (px). Keep 0 to use conventional line-height for FONT_SIZE
   * (14→20, 16→24, 20→28 — same rhythm as common UI type scales, not 14-on-14).
   */
  var FIGMA_LINE_HEIGHT_PX = 0;

  /**
   * Letter spacing (After Effects: 1/1000 em). ~25–45 feels "modern" on UI at 14px.
   * Set 0 to disable.
   */
  var LETTER_TRACKING = 38;

  /**
   * PostScript names — first that AE accepts wins.
   */
  var FONT_CANDIDATES = [
    "SFProText-Regular",
    "SFProDisplay-Regular",
    ".SFNS-Regular",
    "SFUIText-Regular",
    "Geist-Regular",
    "Geist-Regular.otf",
    "ArialMT",
  ];

  /** When true, every pill shares the same position (comp center). When false, use grid below. */
  var STACK_PILLS_AT_CENTER = true;

  /** Tight grid + gaps — used when STACK_PILLS_AT_CENTER is false */
  var GRID_COLS = 4;
  var H_GAP = 8;
  var V_GAP = 8;

  var PILL_COUNT = 20;
  var REQUIRE_UNIQUE_COLORS = false;

  /**
   * Stagger in the timeline (layer.startTime), not opacity.
   * Pill 0 at 0s; pill 1 at FIRST_PILL_HOLD_SEC; pills 2…N−1 use cubic ease-out on index:
   * f(u)=1−(1−u)³ with u=(i−1)/(N−2) → long gaps early (slow), shorter gaps later (faster).
   * (Using u³ on index does the opposite; ease-out here matches "start slow, speed up".)
   * Set STAGGER_LAST_START_SEC ≥ FIRST_PILL_HOLD_SEC.
   */
  var STAGGER_LAYER_START_IN_TIMELINE = true;
  var FIRST_PILL_HOLD_SEC = 1.0;
  /** Comp time (seconds) when the last pill’s layer starts (f(u) reaches 1). */
  var STAGGER_LAST_START_SEC = 9.5;
  /** Lengthen comp if the last layer start + cushion would pass comp duration. */
  var EXTEND_COMP_FOR_STAGGER = true;
  /**
   * Text starts N comp frames after its pill-bg so shape and text never share the same in-point
   * (same-frame parent+child can glitch in previews / Lottie). Set 0 to align with shape again.
   * At 30fps, 1 frame = comp.frameDuration ≈ 1/30 s (exact value always comes from the comp).
   */
  var TEXT_START_AFTER_SHAPE_FRAMES = 1;

  /**
   * Snap each pill shape’s stagger time to the nearest whole comp frame (clean on 30fps integer grid).
   */
  var STAGGER_SNAP_SHAPE_START_TO_FRAMES = true;

  /**
   * When true with timeline stagger: (1) shape→text lag is at least 1 frame; (2) each pill’s shape
   * starts ≥1 frame after the previous pill’s text in-point — no shared in-frame overlap between
   * consecutive pills or shape/text of the same pill.
   */
  var STAGGER_ENFORCE_NO_OVERLAP = true;

  // ── GREETINGS ───────────────────────────────────────────────

  var GREETINGS = [
    "Hi!",
    "Hey!",
    "Hello!",
    "Heya!",
    "Sup!",
    "Yo!",
    "Howdy!",
    "Ahoy!",
    "Hiya!",
    "Greet!",
    "Ello!",
    "Ayy!",
    "Whaddup",
    "Heyy!",
    "Ohai!",
    "Hola!",
    "Ey!",
    "Buenas!",
    "Salut!",
    "Coucou!",
    "Allô!",
    "Ciao!",
    "Ehi!",
    "Salve!",
    "Oi!",
    "Olá!",
    "Alô!",
    "Hallo!",
    "Moin!",
    "Servus!",
    "Hoi!",
    "Dag!",
    "Hej!",
    "Heisan!",
    "Yaa!",
    "Ossu!",
    "Annyong",
    "Marhaba",
    "Ahlan!",
    "Aloha!",
    "Habari!",
    "Jambo!",
    "Namaste",
    "Kamusta",
  ];

  /** Must match an entry in GREETINGS — always pill index 0 (first pop / first in list). */
  var FIRST_POP_GREETING = "Hey!";

  // ── Fills: Tailwind 600 (RGB 0–1) + full hue wheel at ~600-like S/L ──

  var TAILWIND_600 = [
    { name: "red-600", rgb: [0.863, 0.149, 0.149] }, // #dc2626
    { name: "orange-600", rgb: [0.918, 0.345, 0.047] }, // #ea580c
    { name: "amber-600", rgb: [0.851, 0.467, 0.024] }, // #d97706
    { name: "yellow-600", rgb: [0.793, 0.541, 0.016] }, // #ca8a04
    { name: "lime-600", rgb: [0.396, 0.639, 0.051] }, // #65a30d
    { name: "green-600", rgb: [0.086, 0.639, 0.29] }, // #16a34a
    { name: "emerald-600", rgb: [0.02, 0.588, 0.412] }, // #059669
    { name: "teal-600", rgb: [0.051, 0.58, 0.533] }, // #0d9488
    { name: "cyan-600", rgb: [0.031, 0.569, 0.698] }, // #0891b2
    { name: "sky-600", rgb: [0.008, 0.518, 0.78] }, // #0284c7
    { name: "blue-600", rgb: [0.145, 0.388, 0.922] }, // #2563eb
    { name: "indigo-600", rgb: [0.31, 0.275, 0.898] }, // #4f46e5
    { name: "violet-600", rgb: [0.486, 0.227, 0.929] }, // #7c3aed
    { name: "purple-600", rgb: [0.576, 0.2, 0.918] }, // #9333ea
    { name: "fuchsia-600", rgb: [0.753, 0.149, 0.827] }, // #c026d3
    { name: "pink-600", rgb: [0.859, 0.153, 0.469] }, // #db2777
    { name: "rose-600", rgb: [0.881, 0.114, 0.282] }, // #e11d48
  ];

  /** HSL (h degrees, s/l 0–1) → RGB 0–1; tuned so wheel reads like ~600 weight vs white text */
  function hue2rgb(p, q, t) {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1 / 6) {
      return p + (q - p) * 6 * t;
    }
    if (t < 1 / 2) {
      return q;
    }
    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
  }

  function hslToRgb01(hDeg, s, l) {
    var h = (hDeg % 360) / 360;
    var r;
    var g;
    var b;
    if (s <= 0.0001) {
      r = g = b = l;
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return [r, g, b];
  }

  /** Every 12° on the wheel → warm / cool balanced when shuffled with Tailwind 600 */
  function buildWheel600() {
    var list = [];
    var step = 12;
    var sat = 0.69;
    var lit = 0.445;
    var h;
    for (h = 0; h < 360; h += step) {
      list.push({
        name: "wheel-" + h + "deg",
        rgb: hslToRgb01(h, sat, lit),
      });
    }
    return list;
  }

  var PILL_FILL_COLORS = TAILWIND_600.concat(buildWheel600());

  // ── HELPERS ─────────────────────────────────────────────────

  function shuffle(arr) {
    var a = arr.slice();
    var i = a.length;
    var j;
    var tmp;
    while (i--) {
      j = Math.floor(Math.random() * (i + 1));
      tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  }

  /** First slot is always `first`; remaining slots are a shuffled sample of the rest. */
  function buildGreetingPoolWithFirst(first, allArr, count) {
    if (count <= 0) {
      return [];
    }
    var hi = -1;
    var j;
    for (j = 0; j < allArr.length; j++) {
      if (allArr[j] === first) {
        hi = j;
        break;
      }
    }
    if (hi < 0) {
      return shuffle(allArr).slice(0, count);
    }
    var others = [];
    for (j = 0; j < allArr.length; j++) {
      if (j !== hi) {
        others.push(allArr[j]);
      }
    }
    var rest = shuffle(others).slice(0, count - 1);
    var out = [first];
    for (j = 0; j < rest.length; j++) {
      out.push(rest[j]);
    }
    return out;
  }

  function toAEColor(rgb) {
    return [rgb[0], rgb[1], rgb[2], 1];
  }

  function sanitizeItemName(s) {
    return String(s).replace(/[:\*\?"<>\|]/g, "-");
  }

  /** Shared slug so bg/txt rows identify the same pill (greeting + swatch). */
  function pillPairSlug(greeting, colorName) {
    return sanitizeItemName(greeting + " — " + colorName);
  }

  function pillBgLayerName(greeting, colorName) {
    return "pill-bg · " + pillPairSlug(greeting, colorName);
  }

  function pillTxtLayerName(greeting, colorName) {
    return "pill-txt · " + pillPairSlug(greeting, colorName);
  }

  function trySetFont(textDoc, psName) {
    try {
      textDoc.font = psName;
      return true;
    } catch (e) {
      return false;
    }
  }

  function trySetTracking(textDoc, amount) {
    try {
      textDoc.tracking = amount;
      return true;
    } catch (e) {
      return false;
    }
  }

  function resolveFont(textDoc) {
    var k;
    for (k = 0; k < FONT_CANDIDATES.length; k++) {
      if (trySetFont(textDoc, FONT_CANDIDATES[k])) {
        return FONT_CANDIDATES[k];
      }
    }
    return null;
  }

  /** iOS/Figma-style capsule: full semicircle caps = half the short side. */
  function pillRoundness(pillW, pillH) {
    return Math.min(pillW, pillH) / 2;
  }

  /**
   * Comp time (seconds) when pill index i should start.
   * Cubic ease-out on normalized index u∈[0,1]: eased = 1 − (1−u)³ (slow start, faster tail).
   */
  function staggerLayerStartSec(i, count, holdSec, lastStartSec) {
    if (count <= 1 || i <= 0) {
      return 0;
    }
    if (count === 2) {
      return i === 1 ? holdSec : 0;
    }
    var span = lastStartSec - holdSec;
    if (span < 0) {
      span = 0;
    }
    var u = (i - 1) / (count - 2);
    var om = 1 - u;
    var eased = 1 - om * om * om;
    return holdSec + span * eased;
  }

  function lastStaggerLayerStartSec(count, holdSec, lastStartSec) {
    if (count <= 1) {
      return 0;
    }
    return staggerLayerStartSec(count - 1, count, holdSec, lastStartSec);
  }

  function snapSecToFrameBoundary(comp, sec) {
    var fd = comp.frameDuration;
    if (!fd || fd <= 0) {
      return sec;
    }
    return Math.round(sec / fd) * fd;
  }

  function snapSecToFrameCeil(comp, sec) {
    var fd = comp.frameDuration;
    if (!fd || fd <= 0) {
      return sec;
    }
    return Math.ceil(sec / fd - 1e-9) * fd;
  }

  /** Conventional font-size → line-height (px), same family as 16/24 and 20/28. */
  var DEFAULT_LINE_HEIGHT_FOR_FONT = {
    14: 20,
    16: 24,
    20: 28,
  };

  function getTextLineHeightPx() {
    if (typeof FIGMA_LINE_HEIGHT_PX === "number" && FIGMA_LINE_HEIGHT_PX > 0.5) {
      return FIGMA_LINE_HEIGHT_PX;
    }
    var bySize = DEFAULT_LINE_HEIGHT_FOR_FONT[FONT_SIZE];
    if (typeof bySize === "number") {
      return bySize;
    }
    return Math.round((FONT_SIZE * 20) / 14);
  }

  /**
   * Anchor X = glyph run center; anchor Y = vertical center of a stable reference rect.
   * We use a hidden temp layer with a string that has both ascenders and descenders
   * ("Ågjpq") so every label is anchored against the same line-box height rather than
   * its own ink-tight rect (which shifts when descenders like g/j/p/q/y appear).
   */
  function snapTextAnchorAtCenter(textLayer, centerX, centerY) {
    var r = textLayer.sourceRectAtTime(0, false);
    if (!r || r.width < 0.25) {
      textLayer.property("Transform").property("Anchor Point").setValue([0, 0]);
      textLayer
        .property("Transform")
        .property("Position")
        .setValue([centerX, centerY + TEXT_Y_NUDGE]);
      return;
    }

    // Measure a stable reference rect using a string with full ascender+descender extent.
    var comp = textLayer.containingComp;
    var refLayer = comp.layers.addText("\u00c5gjpq"); // ascenders + descenders
    var refTextProp = refLayer.property("Source Text");
    var refDoc = refTextProp.value;
    applyPillTextStyle(refDoc);
    // Copy the same font as the label layer.
    try {
      refDoc.font = textLayer.property("Source Text").value.font;
    } catch (eFontCopy) {}
    refTextProp.setValue(refDoc);
    var rRef = refLayer.sourceRectAtTime(0, false);
    refLayer.remove();

    // Fall back to label's own rect if the reference rect is unusable.
    var stableTop    = (rRef && rRef.height > 0.25) ? rRef.top    : r.top;
    var stableHeight = (rRef && rRef.height > 0.25) ? rRef.height : r.height;

    var ax = r.left + r.width / 2;
    var ay = stableTop + stableHeight / 2;
    textLayer.property("Transform").property("Anchor Point").setValue([ax, ay]);
    textLayer
      .property("Transform")
      .property("Position")
      .setValue([centerX, centerY + TEXT_Y_NUDGE]);
  }

  function finalizeTextAtPillCenter(textLayer, textProp, centerX, centerY) {
    var doc = textProp.value;
    textProp.setValue(doc);
    snapTextAnchorAtCenter(textLayer, centerX, centerY);
    snapTextAnchorAtCenter(textLayer, centerX, centerY);
  }

  function applyPillTextStyle(textDoc) {
    textDoc.resetCharStyle();
    textDoc.fontSize = FONT_SIZE;
    textDoc.fillColor = [1, 1, 1];
    textDoc.justification = ParagraphJustification.CENTER_JUSTIFY;
    if (LETTER_TRACKING !== 0) {
      trySetTracking(textDoc, LETTER_TRACKING);
    }
    try {
      textDoc.autoLeading = false;
      textDoc.leading = getTextLineHeightPx();
    } catch (eLead) {}
    try {
      textDoc.baselineShift = 0;
    } catch (eBs) {}
  }

  /**
   * Measure final pill width for one greeting (temp layer, then removed).
   */
  function measureFinalWidth(mainComp, greeting) {
    var textLayer = mainComp.layers.addText(greeting);
    var textProp = textLayer.property("Source Text");
    var textDoc = textProp.value;
    applyPillTextStyle(textDoc);
    var fontName = resolveFont(textDoc);
    if (!fontName) {
      textLayer.remove();
      return null;
    }
    textProp.setValue(textDoc);
    var r0 = textLayer.sourceRectAtTime(0, false);
    var textW =
      r0 && r0.width > 0.25 ? r0.width : FONT_SIZE * greeting.length * 0.55;
    var finalW = Math.max(1, Math.ceil(textW + PAD_H * 2));
    textLayer.remove();
    return { finalW: finalW, fontName: fontName };
  }

  /** Shape only — call for all pills first so every text layer can sit above every shape. */
  function addPillShapeLayer(
    mainComp,
    greeting,
    color,
    pillH,
    worldX,
    worldY,
    finalW
  ) {
    var h = Math.max(1, Math.round(pillH));
    var roundness = pillRoundness(finalW, h);

    var shapeLayer = mainComp.layers.addShape();
    shapeLayer.name = pillBgLayerName(greeting, color.name);

    var contents = shapeLayer.property("ADBE Root Vectors Group");
    var grp = contents.addProperty("ADBE Vector Group");
    grp.name = "Pill Shape";
    var grpConts = grp.property("ADBE Vectors Group");

    // Parametric rectangle with roundness — Newton 4 treats this as a clean collision body.
    var rect = grpConts.addProperty("ADBE Vector Shape - Rect");
    rect.property("ADBE Vector Rect Size").setValue([finalW, h]);
    rect.property("ADBE Vector Rect Position").setValue([0, 0]);
    rect.property("ADBE Vector Rect Roundness").setValue(roundness);

    var fill = grpConts.addProperty("ADBE Vector Graphic - Fill");
    fill.property("ADBE Vector Fill Color").setValue(toAEColor(color.rgb));

    shapeLayer.property("Transform").property("Anchor Point").setValue([0, 0]);
    shapeLayer
      .property("Transform")
      .property("Position")
      .setValue([worldX, worldY]);

    return shapeLayer;
  }

  /** Text parented to matching shape; create after all shapes so stack = …shapes, …txts. */
  function addPillTextLayer(
    mainComp,
    shapeLayer,
    greeting,
    colorName,
    fontName,
    worldX,
    worldY
  ) {
    var textLayer = mainComp.layers.addText(greeting);
    textLayer.name = pillTxtLayerName(greeting, colorName);

    var textProp = textLayer.property("Source Text");
    var textDoc = textProp.value;
    applyPillTextStyle(textDoc);
    trySetFont(textDoc, fontName);
    textProp.setValue(textDoc);

    textLayer.property("Transform").property("Anchor Point").setValue([0, 0]);

    finalizeTextAtPillCenter(textLayer, textProp, worldX, worldY);
    textLayer.parent = shapeLayer;

    return textLayer;
  }

  // ── MAIN ────────────────────────────────────────────────────

  if (FONT_SIZE > INNER_H + 0.001) {
    alert(
      "FONT_SIZE (" +
        FONT_SIZE +
        ") is larger than inner height (" +
        INNER_H +
        ").\nReduce FONT_SIZE or increase PILL_HEIGHT / PAD_V."
    );
    return;
  }

  var mainComp = app.project.activeItem;
  if (!mainComp || !(mainComp instanceof CompItem)) {
    alert(
      "No active composition found.\nOpen or select a comp and run again."
    );
    return;
  }

  var maxByColors = REQUIRE_UNIQUE_COLORS
    ? Math.min(PILL_COUNT, GREETINGS.length, PILL_FILL_COLORS.length)
    : Math.min(PILL_COUNT, GREETINGS.length);

  var count = maxByColors;
  var greetingPool = buildGreetingPoolWithFirst(
    FIRST_POP_GREETING,
    GREETINGS,
    count
  );
  var colorPool = shuffle(PILL_FILL_COLORS.slice());

  app.beginUndoGroup("Create Pill Badges v2 (shape + text, no precomps)");

  var compW = mainComp.width;
  var compH = mainComp.height;
  var fontUsed = "";

  var specs = [];
  var i;

  try {
    for (i = 0; i < count; i++) {
      var greeting = greetingPool[i];
      var measured = measureFinalWidth(mainComp, greeting);
      if (!measured) {
        throw new Error("No usable font from FONT_CANDIDATES.");
      }
      specs.push({
        greeting: greeting,
        color: colorPool[i % colorPool.length],
        finalW: measured.finalW,
        fontName: measured.fontName,
      });
      fontUsed = measured.fontName;
    }

    var maxW = 1;
    for (i = 0; i < specs.length; i++) {
      if (specs[i].finalW > maxW) {
        maxW = specs[i].finalW;
      }
    }

    var cols;
    var rows;
    var cellW;
    var originX = 0;
    var originY = 0;

    if (STACK_PILLS_AT_CENTER) {
      cols = 1;
      rows = count;
      cellW = maxW;
    } else {
      cols = Math.min(GRID_COLS, count);
      rows = Math.ceil(count / cols);
      cellW = maxW;
      var gridW = cols * cellW + (cols - 1) * H_GAP;
      var gridH = rows * PILL_HEIGHT + (rows - 1) * V_GAP;
      originX = compW / 2 - gridW / 2;
      originY = compH / 2 - gridH / 2;
    }

    var shapeLayers = [];

    for (i = 0; i < count; i++) {
      var spec = specs[i];
      var worldX;
      var worldY;

      if (STACK_PILLS_AT_CENTER) {
        worldX = compW / 2;
        worldY = compH / 2;
      } else {
        var col = i % cols;
        var row = Math.floor(i / cols);
        var cellLeft = originX + col * (cellW + H_GAP);
        worldX = cellLeft + cellW / 2;
        worldY =
          originY + row * (PILL_HEIGHT + V_GAP) + PILL_HEIGHT / 2;
      }

      spec._worldX = worldX;
      spec._worldY = worldY;

      shapeLayers.push(
        addPillShapeLayer(
          mainComp,
          spec.greeting,
          spec.color,
          PILL_HEIGHT,
          worldX,
          worldY,
          spec.finalW
        )
      );
    }

    var textLayers = [];
    for (i = 0; i < count; i++) {
      var sp = specs[i];
      textLayers.push(
        addPillTextLayer(
          mainComp,
          shapeLayers[i],
          sp.greeting,
          sp.color.name,
          sp.fontName,
          sp._worldX,
          sp._worldY
        )
      );
    }

    if (STAGGER_LAYER_START_IN_TIMELINE) {
      var fd = mainComp.frameDuration;
      var textLagSec = TEXT_START_AFTER_SHAPE_FRAMES * fd;
      if (textLagSec < 0) {
        textLagSec = 0;
      }
      if (STAGGER_ENFORCE_NO_OVERLAP && fd > 0 && textLagSec < fd) {
        textLagSec = fd;
      }

      var shapeStarts = [];
      for (i = 0; i < count; i++) {
        var t0 = staggerLayerStartSec(
          i,
          count,
          FIRST_PILL_HOLD_SEC,
          STAGGER_LAST_START_SEC
        );
        if (STAGGER_SNAP_SHAPE_START_TO_FRAMES) {
          t0 = snapSecToFrameBoundary(mainComp, t0);
        }
        shapeStarts.push(t0);
      }

      if (STAGGER_ENFORCE_NO_OVERLAP && fd > 0) {
        for (i = 1; i < count; i++) {
          var minShape = shapeStarts[i - 1] + textLagSec + fd;
          var t1 = shapeStarts[i];
          if (t1 < minShape) {
            t1 = minShape;
          }
          if (STAGGER_SNAP_SHAPE_START_TO_FRAMES) {
            t1 = snapSecToFrameCeil(mainComp, t1);
            while (t1 < minShape - 1e-9) {
              t1 += fd;
            }
          }
          shapeStarts[i] = t1;
        }
      }

      if (EXTEND_COMP_FOR_STAGGER && count > 0) {
        var lastTextIn = shapeStarts[count - 1] + textLagSec;
        var needDur = lastTextIn + 1.0;
        if (mainComp.duration < needDur) {
          mainComp.duration = needDur;
        }
      }

      for (i = 0; i < count; i++) {
        shapeLayers[i].startTime = shapeStarts[i];
        textLayers[i].startTime = shapeStarts[i] + textLagSec;
      }
    }
  } catch (err) {
    app.endUndoGroup();
    alert("Stopped: " + String(err));
    return;
  }

  app.endUndoGroup();

  var colorNote = REQUIRE_UNIQUE_COLORS
    ? "Unique fills (max " + PILL_FILL_COLORS.length + " per run)."
    : "Pool: Tailwind 600 + " +
      (PILL_FILL_COLORS.length - TAILWIND_600.length) +
      " wheel hues; cycles if PILL_COUNT exceeds pool.";

  var layoutNote = STACK_PILLS_AT_CENTER
    ? "Layout: stacked at comp center (each pill its natural width).\n"
    : "Layout: grid " +
      cols +
      "×" +
      rows +
      " near center (gaps " +
      H_GAP +
      "/" +
      V_GAP +
      " px).\n";

  var staggerNote = STAGGER_LAYER_START_IN_TIMELINE
    ? "Timeline: " +
      mainComp.frameRate +
      " fps — cubic-out; shape snap " +
      (STAGGER_SNAP_SHAPE_START_TO_FRAMES ? "on" : "off") +
      "; text after shape ≥" +
      (STAGGER_ENFORCE_NO_OVERLAP ? "1" : String(TEXT_START_AFTER_SHAPE_FRAMES)) +
      " frame(s); no overlap " +
      (STAGGER_ENFORCE_NO_OVERLAP ? "on" : "off") +
      ". Disable: STAGGER_LAYER_START_IN_TIMELINE.\n\n"
    : "";

  alert(
    "Done! Created " +
      count +
      " pills (all shapes below, all text above; txt parented to matching bg).\n\n" +
      layoutNote +
      staggerNote +
      "Font: " +
      fontUsed +
      " · tracking " +
      LETTER_TRACKING +
      "/1000 em\n" +
      "Fills: Tailwind 600 + full hue wheel\n" +
      "Capsule: roundness = min(w,h)/2\n\n" +
      colorNote
  );
})();
