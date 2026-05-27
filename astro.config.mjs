import { defineConfig } from 'astro/config';

export default defineConfig({
  server: {
    host: true,
    port: 4321,
  },
  devToolbar: {
    enabled: false,
  },
  vite: {
    optimizeDeps: {
      include: ['three', 'gsap', 'gsap/ScrollTrigger', 'lenis', 'postprocessing'],
    },
    ssr: {
      noExternal: ['three', 'gsap', 'lenis', 'postprocessing'],
    },
  },
});
