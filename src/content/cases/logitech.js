/* Case study: logitech */

import logitechCover from "../../assets/case/logitech-cover.webp";
import logitechProposal from "../../assets/case/logitech-proposal.webp";
import logitechLawContiguity from "../../assets/case/logitech-law-contiguity.webp";
import logitechLawFitts from "../../assets/case/logitech-law-fitts.webp";
import logitechLawMiller from "../../assets/case/logitech-law-miller.webp";
import logitechLawRestorff from "../../assets/case/logitech-law-restorff.webp";
import logitechLawZeigarnik from "../../assets/case/logitech-law-zeigarnik.webp";
import logitechLawSerial from "../../assets/case/logitech-law-serial.webp";
import logitechHomeLaptop from "../../assets/case/logitech-home-laptop.webp";
import logitechLanding from "../../assets/case/logitech-landing.webp";

export const logitech = {
    title: "Logitech",
    meta: "Promo Landing",
    hero: "image",
    cover: logitechCover,
    coverAlt:
      "Logitech G PRO X Superlight promo landing with hero mouse, feature cards, and nebula backdrop",
    facts: {
      role: "UI Design",
      team: "Solo",
      duration: "Sept – Nov 2024",
      tools: ["Figma", "Illustrator", "Mobbin"],
    },
    intro:
      "A promotional site for the Logitech G PRO X Superlight where each section uses a UX law to decide what the shopper should notice next.",
    blocks: [
      { section: "Overview" },
      {
        title: "The gist of Logitech",
        p: "The project tested whether ==UX laws could shape a product story== from the start, not appear as a justification after the screens were done.",
      },
      {
        title: "What was the outcome?",
        p: "The final prototype used four focused sections, and ==every major layout choice traced back to a named principle==: what to see first, where to click, and how much detail to hold at once.",
      },
      { section: "The brief" },
      {
        title: "The psychology was mapped before the pixels moved.",
        p: "The brief was simple: present a new product so it is easy to understand and remember. My angle was to ==put the psychology on the page== by pairing each law with one concrete interface decision before any pixels moved.",
      },
      {
        media: "image",
        src: logitechProposal,
        alt: "Final project proposal document pairing each UX law with the interface decision it would drive",
        compact: true,
        title: "The proposal, on paper.",
        sub: "Every UX law was paired with the concrete interface decision it would drive before a single pixel moved.",
      },
      { section: "The laws" },
      {
        cols: [
          {
            icon: "lawMagnet",
            title: "Spatial contiguity",
            sub: "Specs attach to the product image so the eye does not bounce between two separate explanations.",
          },
          {
            icon: "lawCrosshair",
            title: "Fitts's law",
            sub: "Primary purchase targets stay large and close to the product decision.",
          },
          {
            icon: "lawSeven",
            title: "Miller's law",
            sub: "The software story capped at 5–7 pages.",
          },
        ],
      },
      {
        cols: [
          {
            icon: "lawAsterisk",
            title: "Von Restorff",
            sub: "Contrast makes the 63-gram weight the page's easiest number to remember.",
          },
          {
            icon: "lawDashed",
            title: "Zeigarnik",
            sub: "Progress dots give the page a visible sense of unfinished reading.",
          },
          {
            icon: "lawBookmarks",
            title: "Serial position",
            sub: "Price first, battery life last. Shoppers remember what sits at the start and end of the page.",
          },
        ],
      },
      {
        title: "Tesler's law kept the product story honestly complex.",
        p: "Tesler's law ==kept the honest complexity==. The page could simplify the path, but it could not hide the specifications a serious buyer needs.",
      },
      {
        slider: [
          {
            src: logitechLawContiguity,
            alt: "Annotated software page: descriptive text placed directly beside the G HUB visual",
            law: "Spatial contiguity",
            text: "Descriptive text sits right beside the G HUB visual, so software and explanation read as one unit.",
          },
          {
            src: logitechLawFitts,
            alt: "Annotated purchase page: six large Buy Now buttons grouped close together",
            law: "Fitts's law",
            text: "Six large Buy Now targets sit close together, so the purchase click costs no travel.",
          },
          {
            src: logitechLawMiller,
            alt: "Annotated features page: six feature cards listed so users can retain the information",
            law: "Miller's law",
            text: "The features page holds six cards — inside the 5–7 chunks people can actually retain.",
          },
          {
            src: logitechLawRestorff,
            alt: "Annotated feature slide: the 63-gram weight highlighted as the one contrasting number",
            law: "Von Restorff",
            text: "One highlighted number — 63 grams — makes the weight the easiest thing on the page to remember.",
          },
          {
            src: logitechLawZeigarnik,
            alt: "Annotated carousel: header navigation, arrow buttons, and progress dots marked on the features slide",
            law: "Zeigarnik",
            text: "Progress dots under the carousel keep the read visibly unfinished, pulling people to the next slide.",
          },
          {
            src: logitechLawSerial,
            alt: "Closing panel of the landing: headline specs at the top, the Explore purchase card at the end",
            law: "Serial position",
            text: "What sits first and last is chosen: the page leads with the headline specs and closes on where to buy.",
          },
        ],
        title: "Laws, made visible.",
        sub: "Each principle lands on a specific part of the page: product specs, target sizing, progress, contrast, and content order.",
      },
      { section: "The site" },
      {
        media: "image",
        src: logitechHomeLaptop,
        alt: "Laptop mockup of the Superlight G PRO X home page with Home, Features, Software, and Purchase in the nav pill",
        title: "Four sections, one path.",
        sub: "Home, Features, Software, and Where to Buy lead from product value to G HUB profiles and purchase options.",
      },
      { section: "Retrospective" },
      {
        title: "The laws decided the site instead of decorating it.",
        p: "The useful lesson was not that every UX law needs a section. It was that each law can force a decision. ==The laws did not decorate the site; they decided it==.",
      },
      {
        media: "image",
        src: logitechLanding,
        alt: "Finished landing pages: the hero with the Superlight mouse beside the specs panel with weight, sensor, and price",
        title: "The finished landing.",
        sub: "The hero brings together the 63-gram weight, HERO 25K sensor, and a purchase action within easy reach.",
      },
    ],
  };
