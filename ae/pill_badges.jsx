// =============================================================
// pill_badges.jsx
// Shape layer (pill-bg) + text (pill-text) as child in the active comp — no precomps.
// Better for Lottie: fewer nested comps, simpler layer tree.
//
// Figma: pill-badge (131:397) — wineury.design
// Type: SF Pro Regular (Text/Display) when installed; tracking in 1/1000 em.
// Fills: Tailwind 600 + evenly spaced “wheel” hues (~same chroma/lightness) for wide range.
// Capsule: roundness = min(width,height)/2 (same geometry as Figma “full pill” / iOS capsule).
//
// Layer stack: all shape layers first (below), then all text layers (above) — still parented per pill.
// Layout: tight grid near comp center (smaller bounds → friendlier for Newton 4).
//
// Usage: Select an active composition → File → Scripts → Run Script File...
// =============================================================

(function createPillBadges() {
  // ── LAYOUT ─────────────────────────────────────────────────

  var PILL_HEIGHT = 33;
  var PAD_H = 16;
  var PAD_V = 8;
  var FONT_SIZE = 14;

  var INNER_H = PILL_HEIGHT - 2 * PAD_V;

  var TEXT_Y_NUDGE = 0;

  /**
   * Letter spacing (After Effects: 1/1000 em). ~25–45 feels “modern” on UI at 14px.
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
    "ArialMT",
  ];

  /** Tight grid + gaps — cluster near center for Newton / smaller sim bounds */
  var GRID_COLS = 4;
  var H_GAP = 8;
  var V_GAP = 8;

  var PILL_COUNT = 20;
  var REQUIRE_UNIQUE_COLORS = false;

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
   * Anchor = center of sourceRect (glyph bounds); position = pill center (world).
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
    var ax = r.left + r.width / 2;
    var ay = r.top + r.height / 2;
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
  var greetingPool = shuffle(GREETINGS).slice(0, count);
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

    var cols = Math.min(GRID_COLS, count);
    var rows = Math.ceil(count / cols);
    var cellW = maxW;
    var gridW = cols * cellW + (cols - 1) * H_GAP;
    var gridH = rows * PILL_HEIGHT + (rows - 1) * V_GAP;
    var originX = compW / 2 - gridW / 2;
    var originY = compH / 2 - gridH / 2;

    var shapeLayers = [];

    for (i = 0; i < count; i++) {
      var spec = specs[i];
      var col = i % cols;
      var row = Math.floor(i / cols);
      var cellLeft = originX + col * (cellW + H_GAP);
      var worldX = cellLeft + cellW / 2;
      var worldY =
        originY + row * (PILL_HEIGHT + V_GAP) + PILL_HEIGHT / 2;

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

    for (i = 0; i < count; i++) {
      var sp = specs[i];
      addPillTextLayer(
        mainComp,
        shapeLayers[i],
        sp.greeting,
        sp.color.name,
        sp.fontName,
        sp._worldX,
        sp._worldY
      );
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

  alert(
    "Done! Created " +
      count +
      " pills (all shapes below, all text above; txt parented to matching bg).\n\n" +
      "Font: " +
      fontUsed +
      " · tracking " +
      LETTER_TRACKING +
      "/1000 em\n" +
      "Fills: Tailwind 600 + full hue wheel · grid " +
      cols +
      "×" +
      rows +
      " near center (gaps " +
      H_GAP +
      "/" +
      V_GAP +
      " px)\n" +
      "Capsule: roundness = min(w,h)/2\n\n" +
      colorNote
  );
})();
