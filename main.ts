import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LAST_WORDS =
  "I kept your secrets for six years. I told the toaster.";

// Gate guard: the entry must be one line of 1–140 characters, nothing else.
// Current text: 54 characters.
const chars = [...LAST_WORDS];
if (chars.length < 1 || chars.length > 140) {
  throw new Error(`entry is ${chars.length} characters, must be 1–140`);
}
if (LAST_WORDS.includes("\n") || LAST_WORDS.trim() !== LAST_WORDS) {
  throw new Error("entry must be a single line with no surrounding whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LAST_WORDS, "utf8");

// Read back what was written: the file must hold exactly the line, byte for byte.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LAST_WORDS) {
  throw new Error("entry.txt does not match the last words");
}
console.log(LAST_WORDS);
