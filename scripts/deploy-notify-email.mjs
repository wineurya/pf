#!/usr/bin/env node
/**
 * Post-deploy email for the portfolio agent workflow.
 *
 * Option A — Resend (API):
 *   RESEND_API_KEY, DEPLOY_NOTIFY_EMAIL, DEPLOY_FROM_EMAIL (optional)
 *
 * Option B — Gmail / any SMTP (no Resend account):
 *   SMTP_USER, SMTP_PASS, DEPLOY_NOTIFY_EMAIL
 *   SMTP_HOST (default smtp.gmail.com), SMTP_PORT (default 465)
 *   DEPLOY_FROM_EMAIL (optional; defaults to SMTP_USER)
 *
 * Skips quietly when no provider secrets are set.
 */

import { execSync } from "node:child_process";

const args = process.argv.slice(2);
const statusArg =
  args.find((a) => a.startsWith("--status="))?.split("=")[1] ??
  (args.includes("--status") ? args[args.indexOf("--status") + 1] : "success");
const urlArg =
  args.find((a) => a.startsWith("--url="))?.split("=")[1] ??
  (args.includes("--url") ? args[args.indexOf("--url") + 1] : "");

const to = process.env.DEPLOY_NOTIFY_EMAIL;
const resendKey = process.env.RESEND_API_KEY;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

if (!to) {
  console.log("deploy-notify: skipped (DEPLOY_NOTIFY_EMAIL not set)");
  process.exit(0);
}

if (!resendKey && !(smtpUser && smtpPass)) {
  console.log(
    "deploy-notify: skipped (set RESEND_API_KEY or SMTP_USER + SMTP_PASS)",
  );
  process.exit(0);
}

const PUBLIC_URL =
  process.env.DEPLOY_PUBLIC_URL || "https://wineury.vercel.app";

const ok = statusArg === "success";
const deployUrl = ok ? PUBLIC_URL : urlArg || PUBLIC_URL;
const runUrl =
  process.env.GITHUB_SERVER_URL &&
  process.env.GITHUB_REPOSITORY &&
  process.env.GITHUB_RUN_ID
    ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
    : null;

function gitLines(max = 4) {
  try {
    const before = process.env.GITHUB_EVENT_BEFORE;
    const sha = process.env.GITHUB_SHA;
    let range = "-3";
    if (before && sha && before !== "0000000000000000000000000000000000000000") {
      range = `${before}..${sha}`;
    }
    const raw = execSync(`git log ${range} --format=%s --no-merges`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (!raw) return ["(no commit messages in this push)"];
    return raw.split("\n").filter(Boolean).slice(0, max);
  } catch {
    return ["(could not read git log)"];
  }
}

function shortSha() {
  try {
    return execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();
  } catch {
    return "unknown";
  }
}

const changes = gitLines(4);
const subject = ok
  ? `Deployed · wineury.vercel.app (${shortSha()})`
  : `Deploy failed · wineury.vercel.app (${shortSha()})`;

const lines = ok
  ? [`Live: ${deployUrl}`, "", "Changes:", ...changes.map((c) => `• ${c}`)]
  : [
      `Deploy did not complete for ${deployUrl}.`,
      "",
      "Last commits in this push:",
      ...changes.map((c) => `• ${c}`),
      runUrl ? `\nWorkflow: ${runUrl}` : "",
    ];

const text = lines.filter((l) => l !== undefined).join("\n").trim();

async function sendViaResend(from) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [to], subject, text }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend ${res.status}: ${body}`);
  }
}

async function sendViaSmtp(from) {
  const nodemailer = await import("nodemailer");
  const port = Number(process.env.SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });
  await transporter.sendMail({ from, to, subject, text });
}

const from =
  process.env.DEPLOY_FROM_EMAIL ??
  (resendKey
    ? "Portfolio Agent <onboarding@resend.dev>"
    : `Portfolio Agent <${smtpUser}>`);

try {
  if (resendKey) {
    await sendViaResend(from);
    console.log(`deploy-notify: sent via Resend to ${to}`);
  } else {
    await sendViaSmtp(from);
    console.log(`deploy-notify: sent via SMTP to ${to}`);
  }
} catch (err) {
  console.error(`deploy-notify: ${err.message}`);
  process.exit(1);
}
