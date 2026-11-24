import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line office joke for make.fun "One-Line Office Joke: 24-Hour
// Sprint": a standup where twelve people report "no blockers" for
// half an hour while the project quietly catches fire in the corner.
const text =
  "Our standup is twelve people saying \u201cno blockers\u201d for half an hour while the project quietly catches fire in the corner.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate: the entry must be a single line of 1-200 characters.
const length = [...text].length;
if (length < 1 || length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${length}`);
}
// Hoist the newline check into one named condition for the single-line gate.
const hasNewline = text.includes("\n") || text.includes("\r");
if (hasNewline) {
  throw new Error("entry must be a single line (no newline characters)");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
