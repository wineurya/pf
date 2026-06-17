import { AnimatePresence, motion } from "motion/react";
import {
  ProfileAvatar,
  WalletMenuPhosphorIcon,
} from "@/exploration/walletMenu/WalletMenuIcons.jsx";
import {
  itemVariants,
  listVariants,
  panelVariants,
  rowVariants,
} from "@/exploration/walletMenu/walletMenuMotion.js";

function MenuItem({ item, onSelect, reduceMotion }) {
  const content = (
    <>
      <span className="wm-item-icon">
        {item.kind === "avatar" ? (
          <ProfileAvatar />
        ) : (
          <WalletMenuPhosphorIcon name={item.icon} />
        )}
      </span>
      <span className="wm-item-label">{item.label}</span>
    </>
  );

  if (reduceMotion) {
    return (
      <button type="button" className="wm-item" onClick={() => onSelect(item.id)}>
        {content}
      </button>
    );
  }

  return (
    <motion.button
      type="button"
      className="wm-item"
      variants={itemVariants}
      onClick={() => onSelect(item.id)}
    >
      {content}
    </motion.button>
  );
}

function MenuRow({ row, onSelect, reduceMotion }) {
  if (row.type === "divider") {
    return reduceMotion ? (
      <div className="wm-divider" role="presentation" />
    ) : (
      <motion.div className="wm-divider" role="presentation" variants={rowVariants} />
    );
  }

  if (row.type === "label") {
    return reduceMotion ? (
      <h2 className="wm-section-label">{row.label}</h2>
    ) : (
      <motion.h2 className="wm-section-label" variants={rowVariants}>
        {row.label}
      </motion.h2>
    );
  }

  return <MenuItem item={row.item} onSelect={onSelect} reduceMotion={reduceMotion} />;
}

function PanelBody({ rows, onSelect, reduceMotion }) {
  const rowList = rows.map((row) => (
    <MenuRow key={row.id} row={row} onSelect={onSelect} reduceMotion={reduceMotion} />
  ));

  return (
    <nav id="wm-panel" className="wm-panel" role="menu" aria-label="Account menu">
      {reduceMotion ? (
        <div className="wm-panel-rows">{rowList}</div>
      ) : (
        <motion.div
          className="wm-panel-rows"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {rowList}
        </motion.div>
      )}
    </nav>
  );
}

export function WalletMenuPanel({ open, reduceMotion, rows, onSelect }) {
  return (
    <div className="wm-panel-anchor" aria-hidden={!open}>
      <AnimatePresence initial={false}>
        {open ? (
          reduceMotion ? (
            <div key="wm-panel-static" className="wm-panel-shell">
              <PanelBody rows={rows} onSelect={onSelect} reduceMotion />
            </div>
          ) : (
            <motion.div
              key="wm-panel-shell"
              className="wm-panel-shell"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <PanelBody rows={rows} onSelect={onSelect} reduceMotion={false} />
            </motion.div>
          )
        ) : null}
      </AnimatePresence>
    </div>
  );
}
