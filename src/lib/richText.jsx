import { IconTrafficCone } from "./icons.jsx";

/* Inline icons before highlights: `::iconKey==phrase==` */
const RICH_ICONS = {
  trafficCone: IconTrafficCone,
};

/* Inline emphasis: `==phrase==` → section-accent highlight (.cs__mark).
   Optional leading icon: `::trafficCone==under construction==`. */
export function renderRich(text) {
  if (typeof text !== "string" || (!text.includes("==") && !text.includes("::"))) {
    return text;
  }

  const parts = [];
  const re = /::(\w+)==([^=]+)==|==([^=]+)==/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      const Icon = RICH_ICONS[match[1]];
      parts.push(
        <mark key={key++} className="cs__mark rich__icon-mark">
          {Icon ? (
            <Icon className="rich__icon-mark-icon" size="1em" ariaHidden />
          ) : null}
          {match[2]}
        </mark>,
      );
    } else {
      parts.push(
        <mark key={key++} className="cs__mark">
          {match[3]}
        </mark>,
      );
    }

    lastIndex = re.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 ? parts[0] : parts;
}
