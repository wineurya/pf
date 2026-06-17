import { WALLET_MENU_SECTIONS } from "@/exploration/walletMenu/walletMenuContent.js";

export function buildMenuRows() {
  const rows = [];
  WALLET_MENU_SECTIONS.forEach((section, sectionIndex) => {
    if (sectionIndex > 0) {
      rows.push({ type: "divider", id: `divider-${section.id}` });
    }
    rows.push({ type: "label", id: `label-${section.id}`, label: section.label });
    section.items.forEach((item) => {
      rows.push({ type: "item", id: item.id, item });
    });
  });
  return rows;
}
