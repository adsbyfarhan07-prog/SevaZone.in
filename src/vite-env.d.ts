/// <reference types="vite/client" />

// Ye add karo neeche 👇
declare module "*.png" {
  const src: string;
  export default src;
}
