import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";

const dir = typeof __dirname === "string" ? __dirname : dirname(fileURLToPath(import.meta.url));
const root = dirname(dir);

const README_EN = resolve(root, "./README.md");
const README_CN = resolve(root, "./README.zh-CN.md");
const TSVX_EN = resolve(root, "./packages/tsvx/README.md");
const TSVX_CN = resolve(root, "./packages/tsvx/README.zh-CN.md");
const LOADER_PATH = resolve(root, "./packages/vue-loader/README.md");

copyReadme();

function copyReadme() {
  fs.copyFileSync(README_EN, TSVX_EN);
  fs.copyFileSync(README_CN, TSVX_CN);
}
