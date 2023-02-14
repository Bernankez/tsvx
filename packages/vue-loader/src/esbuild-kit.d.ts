declare module "@esbuild-kit/esm-loader" {
  type Load = import('./loader').Load;
  type Resolve = import('./loader').Resolve;
  type GetFormat = import('./loader-deprecated').GetFormat;
  type TransformSource = import('./loader-deprecated').TransformSource;

  const load: Load;
  const resolve: Resolve;
  const getFormat: GetFormat;
  const transformSource: TransformSource;

  export { load, resolve, getFormat, transformSource }
}
