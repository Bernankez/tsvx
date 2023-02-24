import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";

const dir = typeof __dirname === "string" ? __dirname : dirname(fileURLToPath(import.meta.url));
const root = dirname(dir);

const README_PATH = resolve(root, "./README.md");
const TSVX_PATH = resolve(root, "./packages/tsvx/README.md");
const LOADER_PATH = resolve(root, "./packages/vue-loader/README.md");

copyReadme();

function copyReadme() {
  [TSVX_PATH, LOADER_PATH].forEach((path) => {
    fs.copyFileSync(README_PATH, path);
  });
}
