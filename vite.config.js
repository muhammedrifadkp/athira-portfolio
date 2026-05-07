import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import javascriptObfuscator from 'vite-plugin-javascript-obfuscator';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    javascriptObfuscator({
      // Obfuscate JS: enable string array encoding and rotation for "encryption-like" effect
      rotateStringArray: true,
      stringArray: true,
      stringArrayEncoding: ['base64'],
      stringArrayIndexShift: true,
      stringArrayRotate: true,
      stringArrayShuffle: true,
      splitStrings: true,
      splitStringsChunkLength: 10,
      // Compact code
      compact: true,
      controlFlowFlattening: false, // Disable if it breaks functionality
      controlFlowFlatteningThreshold: 0.75,
      deadCodeInjection: true,
      deadCodeInjectionThreshold: 0.4,
      debugProtection: false, // Avoid breaking dev tools if needed
      debugProtectionInterval: false,
      disableConsoleOutput: true,
      identifierNamesGenerator: 'mangled',
      renameGlobals: false,
      transformObjectKeys: true,
      unicodeEscapeSequence: false,
    }),
  ],
  build: {
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        collections: resolve(__dirname, 'collections.html'),
        projectDetail: resolve(__dirname, 'project-detail.html'),
      },
    },
    target: 'esnext',
    sourcemap: false, // Disable sourcemaps for obfuscation
  },
});


