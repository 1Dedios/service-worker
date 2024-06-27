import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { join } from 'node:path';
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
          entryPoints: [join(process.cwd(), 'src', 'service-worker.js')],
          outfile: join(process.cwd(), '/dist', 'service-worker.js'),
        });
      },
    },
  ],
});
