/** Dock sections — icon keys resolve in NotchSidebarIcons.jsx. Rows are the
    pop-out panel's inner tabs; content is placeholder-real (a workspace nav)
    so the morph between sections has something honest to show. */
export const NOTCH_SIDEBAR_SECTIONS = [
  {
    id: "home",
    label: "Home",
    icon: "home",
    rows: [
      { id: "overview", label: "Overview", icon: "overview" },
      { id: "activity", label: "Activity", icon: "activity" },
      { id: "trends", label: "Trends", icon: "trends" },
    ],
  },
  {
    id: "files",
    label: "Files",
    icon: "files",
    rows: [
      { id: "recents", label: "Recents", icon: "recents" },
      { id: "shared", label: "Shared", icon: "shared" },
      { id: "archive", label: "Archive", icon: "archive" },
    ],
  },
  {
    id: "alerts",
    label: "Alerts",
    icon: "alerts",
    rows: [
      { id: "mentions", label: "Mentions", icon: "mentions" },
      { id: "approvals", label: "Approvals", icon: "approvals" },
      { id: "digest", label: "Digest", icon: "digest" },
    ],
  },
];

export const NOTCH_SIDEBAR_SIDES = [
  { id: "left", label: "Left" },
  { id: "top", label: "Top" },
  { id: "right", label: "Right" },
];
