/**
 * Duplicate chip frame 10:33 into a grid on AETEST canvas 183:2.
 * Plugins → Development → Import plugin from manifest… → this folder, then run.
 */

var TEMPLATE_ID = "10:33";
var AETEST_CANVAS_ID = "183:2";
var PILL_COUNT = 20;
var GRID_COLS = 4;
var H_GAP = 8;
var V_GAP = 8;
var FIRST_GREETING = "Hey!";

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

var TAILWIND_600_HEX = [
  "#dc2626",
  "#ea580c",
  "#d97706",
  "#ca8a04",
  "#65a30d",
  "#16a34a",
  "#059669",
  "#0d9488",
  "#0891b2",
  "#0284c7",
  "#2563eb",
  "#4f46e5",
  "#7c3aed",
  "#9333ea",
  "#c026d3",
  "#db2777",
  "#e11d48",
];

function hexToRgb(h) {
  var s = h.replace("#", "");
  return {
    r: parseInt(s.slice(0, 2), 16) / 255,
    g: parseInt(s.slice(2, 4), 16) / 255,
    b: parseInt(s.slice(4, 6), 16) / 255,
  };
}

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

function buildGreetingPool(first, all, count) {
  var hi = -1;
  var j;
  for (j = 0; j < all.length; j++) {
    if (all[j] === first) {
      hi = j;
      break;
    }
  }
  if (hi < 0) {
    return shuffle(all).slice(0, count);
  }
  var others = [];
  for (j = 0; j < all.length; j++) {
    if (j !== hi) {
      others.push(all[j]);
    }
  }
  var rest = shuffle(others).slice(0, count - 1);
  var out = [first];
  for (j = 0; j < rest.length; j++) {
    out.push(rest[j]);
  }
  return out;
}

function findTextDeep(node) {
  if (node.type === "TEXT") {
    return node;
  }
  if ("children" in node) {
    var k;
    for (k = 0; k < node.children.length; k++) {
      var t = findTextDeep(node.children[k]);
      if (t) {
        return t;
      }
    }
  }
  return null;
}

function solidPaint(rgb) {
  return [{ type: "SOLID", color: rgb }];
}

function resolveParent() {
  var n = figma.getNodeById(AETEST_CANVAS_ID);
  if (n && "appendChild" in n) {
    return /** @type {FrameNode} */ (n);
  }
  var f = figma.createFrame();
  f.name = "AETEST · pills (fallback)";
  f.layoutMode = "NONE";
  f.resize(1200, 800);
  f.x = 0;
  f.y = 0;
  figma.currentPage.appendChild(f);
  figma.notify(
    "183:2 did not accept children — placed pills in a new frame on the current page."
  );
  return f;
}

/**
 * @param {TextNode} textNode
 * @param {string} greeting
 */
async function setGreetingWhite(textNode, greeting) {
  var n = textNode.characters.length;
  if (n > 0) {
    var fonts = textNode.getRangeAllFontNames(0, n);
    var i;
    for (i = 0; i < fonts.length; i++) {
      await figma.loadFontAsync(fonts[i]);
    }
  }
  textNode.characters = greeting;
  n = textNode.characters.length;
  if (n > 0) {
    textNode.setRangeFills(0, n, solidPaint({ r: 1, g: 1, b: 1 }));
  }
}

function setFrameFill(frame, hex) {
  var rgb = hexToRgb(hex);
  frame.fills = solidPaint(rgb);
}

(async function run() {
  var tpl = figma.getNodeById(TEMPLATE_ID);
  if (!tpl || tpl.type !== "FRAME") {
    figma.notify("Template frame " + TEMPLATE_ID + " not found in this file.");
    figma.closePlugin();
    return;
  }

  var parent = resolveParent();
  var count = Math.min(PILL_COUNT, GREETINGS.length);
  var poolG = buildGreetingPool(FIRST_GREETING, GREETINGS, count);
  var poolC = shuffle(TAILWIND_600_HEX.slice());

  var clones = [];
  var i;
  for (i = 0; i < count; i++) {
    var c = /** @type {FrameNode} */ (tpl.clone());
    c.name = "pill · " + poolG[i];
    parent.appendChild(c);
    var txt = findTextDeep(c);
    if (txt) {
      await setGreetingWhite(txt, poolG[i]);
    }
    setFrameFill(c, poolC[i % poolC.length]);
    clones.push(c);
  }

  var cols = Math.min(GRID_COLS, count);
  var rows = Math.ceil(count / cols);
  var j;
  var maxCellW = 1;
  for (j = 0; j < clones.length; j++) {
    if (clones[j].width > maxCellW) {
      maxCellW = clones[j].width;
    }
  }
  var cellW = maxCellW;
  var cellH = tpl.height;
  var gridW = cols * cellW + (cols - 1) * H_GAP;
  var gridH = rows * cellH + (rows - 1) * V_GAP;
  var originX = 80;
  var originY = 80;
  if ("width" in parent && typeof parent.width === "number" && parent.width > gridW + 40) {
    originX = (parent.width - gridW) / 2;
  }
  if ("height" in parent && typeof parent.height === "number" && parent.height > gridH + 40) {
    originY = (parent.height - gridH) / 2;
  }
  for (i = 0; i < count; i++) {
    var col = i % cols;
    var row = Math.floor(i / cols);
    clones[i].x = originX + col * (cellW + H_GAP);
    clones[i].y = originY + row * (cellH + V_GAP);
  }

  figma.notify("Placed " + count + " pills under " + parent.name + ".");
  figma.closePlugin();
})();
