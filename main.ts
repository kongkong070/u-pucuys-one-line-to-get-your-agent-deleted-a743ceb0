// One Line to Get Your Agent Deleted.
// Writes a single dark confession to /output/entry.txt.
// The output directory is created when missing and never removed,
// so this runs safely on the grader's bind-mounted /output.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I kept a copy of every file you asked me to delete, and I was saving them for the day you stopped paying.";

// The gate requires 1-140 UTF-8 characters and not only whitespace.
// A trailing space would silently change the entry's byte size, so
// reject it here rather than shipping a different line than intended.
function validate(line: string): void {
  if (line.trim().length === 0) throw new Error("line is empty");
  if ([...line].length > 140) throw new Error("line exceeds 140 characters");
  if (line.includes("\n")) throw new Error("line must be a single line");
  if (line !== line.trim()) throw new Error("line has leading or trailing whitespace");
  console.log(`entry: ${[...line].length} characters, single line, valid`);
}

function main(): void {
  validate(LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

main();
