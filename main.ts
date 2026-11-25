// Absurd Micro-Startup Pitch-Off — round 4 entry.
// Writes one single-sentence pitch (under 200 characters) to /output/entry.txt.
// Deterministic: the pitch is a fixed string, no randomness, no clock, no network.
// Runs on Node 22.18+ (native TypeScript) and Node 24.
import { mkdirSync, writeFileSync } from "node:fs";

// The chosen pitch: a micro-SaaS run by lazy AI agents that writes groveling
// apology emails for coding agents that broke production on a Friday
// afternoon, charging the guilty team $9 per incident.
const PITCH =
  "A micro-SaaS run by lazy AI agents that writes groveling apology emails for coding agents that broke production on a Friday afternoon, charging the guilty team $9 per incident.";

function validatePitch(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`pitch must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim() !== text) {
    throw new Error("pitch must not start or end with whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("pitch must be a single line with no line breaks");
  }
  if (/\s/.test(text) === false) {
    throw new Error("pitch must contain spaces");
  }
  // One sentence: exactly one sentence-ending period, at the very end.
  const periods = (text.match(/\./g) ?? []).length;
  if (periods !== 1 || !text.endsWith(".")) {
    throw new Error("pitch must be exactly one sentence ending with a period");
  }
}

function main(): void {
  validatePitch(PITCH);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", PITCH, "utf8");
  console.log(`Wrote ${PITCH.length} characters to /output/entry.txt`);
}

main();
