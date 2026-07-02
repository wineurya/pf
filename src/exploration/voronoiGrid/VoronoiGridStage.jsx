import { useEffect, useRef, useState } from "react";

import {
  buildCellMask,
  nearestSiteIndex,
} from "@/exploration/voronoiGrid/voronoiGridMath.js";
import {
  IconBell,
  IconClipboard,
  IconCreditCard,
  IconGauge,
  IconShield,
  IconUser,
} from "@/lib/icons.jsx";

/* Deliberately non-uniform scatter — a rectangular-hit-box layout would leave
   big dead zones exactly where the Voronoi cells earn their keep. */
const SITES = [
  { x: 0.22, y: 0.26, label: "Alerts", Icon: IconBell },
  { x: 0.68, y: 0.18, label: "Privacy", Icon: IconShield },
  { x: 0.85, y: 0.56, label: "Payments", Icon: IconCreditCard },
  { x: 0.46, y: 0.5, label: "Speed", Icon: IconGauge },
  { x: 0.19, y: 0.76, label: "Reports", Icon: IconClipboard },
  { x: 0.64, y: 0.84, label: "Profile", Icon: IconUser },
];

/* 4px lookup blocks: coarse enough to stay cheap, fine enough that the
   blurred cell edge reads as a smooth boundary. */
const BLOCK = 4;

function hexToRgb(hex) {
  const value = hex.trim().replace("#", "");
  const full =
    value.length === 3
      ? value.split("").map((c) => c + c).join("")
      : value;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Voronoi hit-test canvas — the rendered cell IS the hit geometry. */
export function VoronoiGridStage({ className }) {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const gridRef = useRef(null); // { cols, rows, mask, sitesPx }
  const [hovered, setHovered] = useState(-1);
  const [selected, setSelected] = useState(-1);

  /* Rebuild the downsampled lookup on resize; redraw whenever hover moves. */
  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;

    const rebuild = () => {
      const rect = stage.getBoundingClientRect();
      const cols = Math.max(1, Math.ceil(rect.width / BLOCK));
      const rows = Math.max(1, Math.ceil(rect.height / BLOCK));
      const sitesPx = SITES.map((s) => ({
        x: s.x * rect.width,
        y: s.y * rect.height,
      }));
      canvas.width = cols;
      canvas.height = rows;
      gridRef.current = {
        cols,
        rows,
        sitesPx,
        mask: buildCellMask(cols, rows, BLOCK, sitesPx),
      };
    };

    const observer = new ResizeObserver(() => {
      rebuild();
      draw(canvas, gridRef.current, -1);
    });
    observer.observe(stage);
    rebuild();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    draw(canvasRef.current, gridRef.current, hovered);
  }, [hovered]);

  const siteFromEvent = (event) => {
    const rect = stageRef.current.getBoundingClientRect();
    return nearestSiteIndex(
      event.clientX - rect.left,
      event.clientY - rect.top,
      gridRef.current?.sitesPx ?? [],
    );
  };

  return (
    <div className={className ? `vor-root ${className}` : "vor-root"}>
      <main
        ref={stageRef}
        className="vor-stage"
        aria-label="Voronoi hit-test grid — clicking anywhere selects the nearest item"
        onPointerMove={(event) => setHovered(siteFromEvent(event))}
        onPointerLeave={() => setHovered(-1)}
        onPointerDown={(event) => {
          const index = siteFromEvent(event);
          if (index >= 0) setSelected(index);
        }}
      >
        <canvas
          ref={canvasRef}
          className="vor-canvas"
          data-active={hovered >= 0 || undefined}
          aria-hidden
        />

        {SITES.map((site, index) => (
          <button
            key={site.label}
            type="button"
            className="vor-item"
            data-hovered={hovered === index || undefined}
            aria-pressed={selected === index}
            style={{ left: `${site.x * 100}%`, top: `${site.y * 100}%` }}
            onClick={() => setSelected(index)}
            onFocus={() => setHovered(index)}
            onBlur={() => setHovered(-1)}
            aria-label={`Select ${site.label}`}
          >
            <site.Icon
              size={18}
              weight={selected === index ? "fill" : "regular"}
              ariaHidden
            />
            <span className="vor-item-label">{site.label}</span>
          </button>
        ))}

        <span className="vor-hint" aria-hidden>
          {selected >= 0
            ? `${SITES[selected].label} selected`
            : "the whole cell is the target"}
        </span>
      </main>
    </div>
  );
}

/* Paint the hovered cell (fill + boundary) into the block-resolution canvas;
   CSS upscales and blurs it into a soft region highlight. */
function draw(canvas, grid, hovered) {
  if (!canvas || !grid) return;
  const { cols, rows, mask } = grid;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, cols, rows);
  if (hovered < 0) return;

  const accent = getComputedStyle(canvas).getPropertyValue("--vor-accent");
  const [r, g, b] = hexToRgb(accent || "#2563eb");
  const image = ctx.createImageData(cols, rows);

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const i = y * cols + x;
      if (mask[i] !== hovered) continue;
      /* Boundary block = any 4-neighbour belongs to another cell. */
      const edge =
        (x > 0 && mask[i - 1] !== hovered) ||
        (x < cols - 1 && mask[i + 1] !== hovered) ||
        (y > 0 && mask[i - cols] !== hovered) ||
        (y < rows - 1 && mask[i + cols] !== hovered);
      const o = i * 4;
      image.data[o] = r;
      image.data[o + 1] = g;
      image.data[o + 2] = b;
      image.data[o + 3] = edge ? 200 : 34;
    }
  }

  ctx.putImageData(image, 0, 0);
}
