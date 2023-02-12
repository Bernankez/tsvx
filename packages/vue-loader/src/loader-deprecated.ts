import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { transformSync } from "esbuild";
import { compileScript, parse } from "@vue/compiler-sfc";
import { randomUUID } from "uncrypto";
import type { GetFormat, TransformSource } from "@esbuild-kit/esm-loader";
import { getFormat as esmGetFormat, transformSource as esmTransformSource } from "@esbuild-kit/esm-loader";
import { compareNodeVersion } from "@esbuild-kit/core-utils";

const _getFormat: GetFormat = async (url, context, defaultGetFormat) => {
  if (url.endsWith(".vue")) {
    return { format: "module" };
  }
  return await esmGetFormat(url, context, defaultGetFormat);
};

const _transformSource: TransformSource = async (source, context, defaultTransformSource) => {
  const { url } = context;
  const filePath = url.startsWith("file://") ? fileURLToPath(url) : url;

  if (filePath.endsWith(".vue")) {
    if (process.send) {
      process.send({
        type: "dependency",
        path: "url",
      });
    }

    const source = fs.readFileSync(filePath, "utf-8");

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
      source: code,
    };
  }
  return await esmTransformSource(source, context, defaultTransformSource);
};

const nodeSupportsDeprecatedLoaders = compareNodeVersion([16, 12, 0]) < 0;

export const getFormat = nodeSupportsDeprecatedLoaders ? _getFormat : undefined;
export const transformSource = nodeSupportsDeprecatedLoaders ? _transformSource : undefined;
