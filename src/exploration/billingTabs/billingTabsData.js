/* Billing period tabs — plan content. Yearly is exactly 25% off monthly so
   the tab chip's claim and the morphing figures always agree. */

export const BILLING_PERIODS = [
  { id: "monthly", label: "Monthly" },
  { id: "yearly", label: "Yearly", chip: "−25%" },
];

export const BILLING_PLANS = [
  {
    id: "free",
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    note: { monthly: "free forever", yearly: "free forever" },
    features: ["3 projects", "Community support", "Basic analytics"],
    cta: "Start free",
  },
  {
    id: "pro",
    name: "Pro",
    featured: true,
    price: { monthly: 24, yearly: 18 },
    note: { monthly: "billed monthly", yearly: "billed yearly" },
    features: ["Unlimited projects", "Custom domains", "Priority support"],
    cta: "Get Pro",
  },
];
