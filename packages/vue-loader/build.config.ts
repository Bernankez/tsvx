import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "src/index",
    "src/loader",
    "src/loader-deprecated",
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
});
