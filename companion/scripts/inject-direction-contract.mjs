import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const contract = (await readFile(join(root, "direction-contract.txt"), "utf8")).trim();
const target = join(root, "out", "index.html");
const html = await readFile(target, "utf8");

if (!html.includes("<body>")) {
  throw new Error("Static export has no plain body tag for the direction contract");
}

await writeFile(target, html.replace("<body>", `<body>${contract}`));
