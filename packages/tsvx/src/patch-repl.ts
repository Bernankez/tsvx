import repl, { type REPLEval, type REPLServer } from "repl";
import { transform } from "@esbuild-kit/core-utils";

function patchEval(nodeRepl: REPLServer) {
  const { eval: defaultEval } = nodeRepl;
  const preEval: REPLEval = async function (code, context, filename, callback) {
    const transformed = await transform(
      code,
      filename,
      {
        loader: "ts",
        tsconfigRaw: {
          compilerOptions: {
            preserveValueImports: true,
          },
        },
        define: {
          require: "global.require",
        },
      },
    ).catch(
      (error: any) => {
        console.log(error.message);
        return { code: "\n" };
      },
    );

    return defaultEval.call(this, transformed.code, context, filename, callback);
  };

  // @ts-expect-error overwriting read-only property
  nodeRepl.eval = preEval;
}

const { start } = repl;
repl.start = function (...args) {
  const nodeRepl = Reflect.apply(start, this, [...args]);
  patchEval(nodeRepl);
  return nodeRepl;
};

export {};
