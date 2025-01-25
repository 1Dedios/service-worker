import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import process from 'node:process'
import { buildSync } from 'esbuild';

export default defineConfig({
  plugins: [
    react(),
    {
      apply: 'build',
      enforce: 'post',
      transformIndexHtml() {
        buildSync({
          minify: true,
          bundle: true,
          entryPoints: [path.join(process.cwd(), 'src', 'service-worker.js')],
          outfile: path.join(process.cwd(), 'dist', 'service-worker.js'),
        });
      },
    },
  ],
});
