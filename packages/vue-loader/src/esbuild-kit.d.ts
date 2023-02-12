declare module "@esbuild-kit/esm-loader" {
  export type MaybePromise<T> = T | Promise<T>;

  export type ModuleFormat =
    | "builtin"
    | "dynamic"
    | "commonjs"
    | "json"
    | "module"
    | "wasm"
    | "vue";


  interface Resolved {
    url: string;
    format: ModuleFormat | undefined;
  }

  interface Context {
    conditions: string[];
    parentURL: string | undefined;
  }

  export type Resolve = (
    specifier: string,
    context: Context,
    defaultResolve: Resolve,
    recursiveCall?: boolean,
  ) => MaybePromise<Resolved>;

  export type Load = (
    url: string,
    context: {
      format: string;
      importAssertions: Record<string, string>;
    },
    defaultLoad: Load,
  ) => MaybePromise<{
    format: string;
    source: string | ArrayBuffer | SharedArrayBuffer | Uint8Array;
  }>;

  export type GetFormat = (
    url: string,
    context: Record<string, unknown>,
    defaultGetFormat: GetFormat,
  ) => MaybePromise<{ format: ModuleFormat }>;

  type Source = string | SharedArrayBuffer | Uint8Array;

  export type TransformSource = (
    source: Source,
    context: {
      url: string;
      format: ModuleFormat;
    },
    defaultTransformSource: TransformSource,
  ) => MaybePromise<{ source: Source }>;


  const load: Load;
  const resolve: Resolve;
  const getFormat: GetFormat;
  const transformSource: TransformSource;

  export { load, resolve, getFormat, transformSource }
}
