import { useState } from "react";
import { motion } from "motion/react";
import { Loader2, Send } from "lucide-react";
import { useReducedMotion } from "@/exploration/useReducedMotion.js";
import { CTA_SURFACE_GLOSS } from "@/rebuild/components/RebuildAside.jsx";
import { REBUILD_CONTACT, WEB3FORMS_ACCESS_KEY } from "@/rebuild/data/contact.js";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const FIELD_CLASS =
  "w-full rounded-xl border border-[var(--wx-border-soft)] bg-[var(--wx-white)] px-4 py-3 font-[family-name:var(--font-body)] text-[14px] leading-[1.5] text-[var(--wx-ink)] outline-none transition-[border-color,box-shadow] duration-200 ease-out placeholder:text-[color-mix(in_srgb,var(--wx-muted)_75%,transparent)] focus-visible:border-[var(--wx-accent-amber)] focus-visible:ring-2 focus-visible:ring-[var(--wx-outline-ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--wx-page-bg)]";

const LABEL_CLASS =
  "font-[family-name:var(--font-body)] text-[12px] font-semibold uppercase tracking-[0.07em] text-[var(--wx-muted)]";

function Field({ id, name, label, type = "text", placeholder, autoComplete, multiline }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={4}
          required
          placeholder={placeholder}
          className={`${FIELD_CLASS} min-h-[108px] resize-y`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={FIELD_CLASS}
        />
      )}
    </div>
  );
}

/** Spring-in amber disc with a checkmark that draws on once the message lands. */
function SentCheck({ reduceMotion }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 230, damping: 17 }}
      className="flex size-14 items-center justify-center rounded-full"
      style={{ backgroundColor: "color-mix(in srgb, var(--wx-accent-amber) 15%, transparent)" }}
    >
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <motion.path
          d="M7 16.8l5.5 5.5L25 9.5"
          stroke="var(--wx-accent-amber)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: reduceMotion ? 0 : 0.18 }}
        />
      </svg>
    </motion.div>
  );
}

/**
 * Name / Email / Message form for the contact closer. Submits to Web3Forms,
 * which relays the message to the inbox the access key is registered to
 * (contact@wineury.design). Shows an animated confirmation once sent.
 */
export function ContactForm() {
  const reduceMotion = useReducedMotion();
  const copy = REBUILD_CONTACT.form;
  const [status, setStatus] = useState("idle"); // idle | submitting | sent | error

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "submitting") return;
    const formData = new FormData(event.currentTarget);
    setStatus("submitting");
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await res.json();
      setStatus(data.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <motion.div
        role="status"
        aria-live="polite"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mt-5 flex flex-col items-center gap-3 rounded-2xl border border-[var(--wx-border-soft)] bg-[var(--wx-white)] px-6 py-10 text-center"
      >
        <SentCheck reduceMotion={reduceMotion} />
        <p className="m-0 font-[family-name:var(--font-display)] text-[18px] font-emphasis leading-[24px] text-[var(--wx-ink)]">
          {copy.sent}
        </p>
        <p className="m-0 max-w-[32ch] font-[family-name:var(--font-body)] text-[14px] leading-[1.55] text-[var(--wx-muted)]">
          {copy.sentNote}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-1 rounded-md font-[family-name:var(--font-body)] text-[13px] font-semibold text-[var(--wx-accent-amber)] underline-offset-4 outline-none transition-opacity hover:opacity-80 focus-visible:underline"
        >
          {copy.sendAnother}
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
      <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
      <input type="hidden" name="subject" value="New message from wineury.design" />
      <input type="hidden" name="from_name" value="wineury.design contact form" />
      {/* Honeypot — bots fill hidden fields; real users never see this. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: "none" }}
      />

      <Field
        id="cf-name"
        name="name"
        label={copy.name.label}
        placeholder={copy.name.placeholder}
        autoComplete="name"
      />
      <Field
        id="cf-email"
        name="email"
        type="email"
        label={copy.email.label}
        placeholder={copy.email.placeholder}
        autoComplete="email"
      />
      <Field
        id="cf-message"
        name="message"
        label={copy.message.label}
        placeholder={copy.message.placeholder}
        multiline
      />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-1 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-[family-name:var(--font-body)] text-[14px] font-semibold text-white outline-offset-2 transition-[filter,opacity] duration-200 ease-out hover:brightness-[1.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--wx-outline-ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--wx-page-bg)] disabled:cursor-not-allowed disabled:opacity-70"
        style={{
          backgroundImage: [
            CTA_SURFACE_GLOSS,
            "linear-gradient(90deg, var(--wx-accent-amber) 0%, var(--wx-accent-amber) 100%)",
          ].join(", "),
        }}
      >
        {status === "submitting" ? (
          <>
            <Loader2 aria-hidden size={17} strokeWidth={2.2} className="animate-spin" />
            {copy.submitting}
          </>
        ) : (
          <>
            <Send aria-hidden size={16} strokeWidth={2.2} />
            {copy.submit}
          </>
        )}
      </button>

      {status === "error" && (
        <p
          role="alert"
          className="m-0 font-[family-name:var(--font-body)] text-[13px] leading-[1.5] text-[var(--wx-accent-amber)]"
        >
          {copy.error}
        </p>
      )}
    </form>
  );
}
