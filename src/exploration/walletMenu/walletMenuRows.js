import { WALLET_MENU_SECTIONS } from "@/exploration/walletMenu/walletMenuContent.js";

export function buildMenuRows() {
  const rows = [];
  /* Section labels alone separate the groups — no divider hairline. */
  WALLET_MENU_SECTIONS.forEach((section) => {
    rows.push({ type: "label", id: `label-${section.id}`, label: section.label });
    section.items.forEach((item) => {
      rows.push({ type: "item", id: item.id, item });
    });
  });
  return rows;
}
