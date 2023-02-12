import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { compileScript, parse } from "@vue/compiler-sfc";
import { transformSync } from "esbuild";
import { randomUUID } from "uncrypto";
import type { Load, Resolve } from "@esbuild-kit/esm-loader";
import { load as esmLoad, resolve as esmResolve } from "@esbuild-kit/esm-loader";

export const resolve: Resolve = async (specifier, context, defaultResolve, recursiveCall) => {
  const resolved = await esmResolve(specifier, context, defaultResolve, recursiveCall);
  if (specifier.endsWith(".vue")) {
    return {
      ...resolved,
      format: "vue",
    };
  }
  return resolved;
};

export const load: Load = async (url, context, defaultLoad) => {
  if (context.format === "vue") {
    const source = fs.readFileSync(fileURLToPath(url), "utf-8");
    const sfc = parse(source);
    const { content } = compileScript(sfc.descriptor, {
      id: randomUUID(),
      inlineTemplate: true,
    });
    const { code } = transformSync(content, {
      loader: "ts",
      target: "esnext",
      format: "esm",
    });

    return {
      format: "module",
      source: code,
    };
  }
  return await esmLoad(url, context, defaultLoad);
};
