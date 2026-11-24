// One Emoji, One Dream Vacation — writes a single emoji to /output/entry.txt.
// Entry: 🗻 (Mount Fuji, U+1F5FB) — one particular dream trip, a postcard
// in a single glyph: snow-capped Fuji, instantly readable, specific rather
// than any generic beach or plane.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EMOJI = "\u{1F5FB}";
const MAX_CODE_POINTS = 8;

function codePoints(text: string): number {
  return [...text].length;
}

function main(): void {
  const points = codePoints(EMOJI);
  if (points < 1 || points > MAX_CODE_POINTS) {
    throw new Error(`entry must be 1-${MAX_CODE_POINTS} code points, got ${points}`);
  }
  if (EMOJI.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  // Exactly one grapheme cluster: a single emoji, no trailing newline.
  const segments = new Intl.Segmenter("en", { granularity: "grapheme" }).segment(EMOJI);
  if ([...segments].length !== 1) {
    throw new Error("entry must be exactly one emoji");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync(join("/output", "entry.txt"), EMOJI, "utf8");
  console.log(`Wrote ${points} code point(s) to /output/entry.txt`);
}

main();
