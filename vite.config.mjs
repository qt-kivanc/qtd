import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import copy from 'rollup-plugin-copy';
import { extname, relative, resolve } from 'path'
import { fileURLToPath } from 'node:url'
import { glob } from 'glob'
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vitejs.dev/config/
export default defineConfig({
  // https://github.com/vitejs/vite/issues/1973
  define: {
    // "process.env": process.env,
    // // By default, Vite doesn't include shims for NodeJS/
    // // necessary for segment analytics lib to work
    "global": {},
  },
  resolve: {
    alias: {
      /*
      process: "process/browser",
      buffer: "buffer",
      crypto: "crypto-browserify",
      assert: "assert",
      http: "stream-http",
      https: "https-browserify",
      os: "os-browserify",
      url: "url",
      util: "util"
      */
    }
  },
  plugins: [
    react(), 
    viteTsconfigPaths(), 
    svgr(),
    libInjectCss(),
    dts({ include: ['lib'], rollupTypes: true }),
    copy({
      targets: [
        { src: 'dist/index.d.ts', dest: 'dist', rename: 'index.d.mts' },
      ],
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1600,
    copyPublicDir: false,
    lib: {
      name      : "QTD",
      entry     : resolve(__dirname, 'lib/index.ts'),
      formats   : ["es", "cjs", "umd", "iife"],
      fileName  : (format) => `index.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  }
});