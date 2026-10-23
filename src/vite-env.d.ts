/// <reference types="vite/client" />

// vite-imagetools: `import url from './x.png?h=112&format=webp&as=url'` resolves to the built asset URL.
// (An ambient module pattern may contain only one `*`, so the imports end in a fixed `&as=url` marker.)
declare module '*&as=url' {
  const src: string;
  export default src;
}
