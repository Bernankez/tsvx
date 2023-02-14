export type MaybePromise<T> = T | Promise<T>;

export type ModuleFormat =
  | "builtin"
  | "dynamic"
  | "commonjs"
  | "json"
  | "module"
  | "wasm"
  | "vue";
