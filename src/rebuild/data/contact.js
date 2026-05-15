/** Contact closer - compact final CTA inspired by Cope Design's plainspoken footer rhythm. */
export const REBUILD_CONTACT = {
  eyebrow: "Contact",
  headlineLead: "Let's build",
  headlineAccent: "something thoughtful.",
  supporting:
    "Send the role, product, or messy flow. I'll reply with the clearest next step: a quick conversation, a focused sprint, or a straight answer.",
  availability: "Available for select projects and collaborations.",
  form: {
    name: { label: "Name", placeholder: "Your name" },
    email: { label: "Email", placeholder: "you@company.com" },
    message: {
      label: "Message",
      placeholder: "The role, product, or messy flow you're working through.",
    },
    submit: "Send message",
    submitting: "Sending…",
    sent: "Message sent",
    sentNote: "Thanks for reaching out — I'll get back to you soon.",
    sendAnother: "Send another",
    error: "Couldn't send right now. Email contact@wineury.design directly.",
  },
  footerName: "Wineury",
};

/**
 * Web3Forms access key. The contact form POSTs to Web3Forms, which relays each
 * submission to the inbox the key is registered to. Create a free key at
 * https://web3forms.com using contact@wineury.design so messages land there,
 * then replace the placeholder below.
 */
export const WEB3FORMS_ACCESS_KEY = "c67955a9-b657-406b-bfea-e31f25e0e70e";
