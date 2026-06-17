export const WALLET_MENU_PROFILE = {
  name: "My profile",
  src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&h=96&q=80",
  alt: "Profile photo",
};

export const WALLET_MENU_SECTIONS = [
  {
    id: "actions",
    label: "Actions",
    items: [
      { id: "send-money", label: "Send money", icon: "send" },
      { id: "add-funds", label: "Add funds", icon: "add" },
      { id: "cash-out", label: "Cash out", icon: "cashOut" },
      { id: "transactions", label: "Transactions", icon: "transactions" },
    ],
  },
  {
    id: "account",
    label: "Account",
    items: [
      { id: "my-profile", label: "My profile", kind: "avatar" },
      { id: "settings", label: "Settings", icon: "settings" },
      { id: "integrations", label: "Integrations", icon: "integrations" },
    ],
  },
];
