/* This is for describing the shapes Webpack will export for loaded assets. */

declare module '*.css' {
  const loaderExports: string;
  export default loaderExports;
}

declare module '*.svg' {
  const loaderExports: string;
  export default loaderExports;
}

declare module '*.jpg' {
  const loaderExports: string;
  export default loaderExports;
}

declare module '*.png' {
  const loaderExports: string;
  export default loaderExports;
}
