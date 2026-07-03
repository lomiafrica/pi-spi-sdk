import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: false,
    clean: true,
    outExtension({ format }) {
      if (format === 'esm') {
        return { js: '.mjs' };
      }
      if (format === 'cjs') {
        return { js: '.cjs' };
      }
      return { js: '.js' };
    },
  },
  {
    entry: ['src/qrcode/index.ts'],
    outDir: 'dist/qrcode',
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: false,
    outExtension({ format }) {
      if (format === 'esm') {
        return { js: '.mjs' };
      }
      if (format === 'cjs') {
        return { js: '.cjs' };
      }
      return { js: '.js' };
    },
  },
  {
    entry: ['src/qrcode/index.ts'],
    format: ['iife'],
    globalName: 'PISPIQrcode',
    outDir: 'dist',
    platform: 'browser',
    target: 'es2017',
    outExtension() {
      return { js: '.umd.js' };
    },
    sourcemap: false,
    minify: true,
    external: ['qrcode'],
    banner: {
      js: '/* Browser build — load qrcode/build/qrcode.min.js first */',
    },
    esbuildOptions(options) {
      options.platform = 'browser';
      options.mainFields = ['browser', 'module', 'main'];
      options.define = {
        ...options.define,
        'process.env.NODE_ENV': '"production"',
      };
      options.external = options.external || [];
      if (Array.isArray(options.external)) {
        options.external.push('fs', 'path', 'crypto', 'stream', 'util', 'qrcode');
      }
      return options;
    },
  },
]);
