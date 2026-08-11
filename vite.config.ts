import { resolve } from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { type PluginOption, defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { sharedCssConfig } from './vite.shared';

// Dev-only tooling: the paper-camp toolbar package may be absent (e.g. on CI,
// where the local link: spec doesn't resolve), so the dev server degrades to
// no toolbar instead of the whole config failing to load. Builds never import it.
async function paperCampPlugin(): Promise<PluginOption[]> {
  try {
    const { paperCamp } = await import('@dendelion/paper-camp/vite');
    return [paperCamp()];
  } catch {
    return [];
  }
}

export default defineConfig(async ({ command }) => {
  const baseConfig = {
    plugins: [react()] as PluginOption[],
    css: sharedCssConfig,
  };

  if (command === 'serve') {
    return {
      ...baseConfig,
      plugins: [...baseConfig.plugins, ...(await paperCampPlugin())],
      server: {
        host: '0.0.0.0',
        port: 3040,
        allowedHosts: true,
      },
    };
  }

  return {
    ...baseConfig,
    plugins: [
      ...baseConfig.plugins,
      dts({
        include: ['src/**/*'],
        exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/showcase/**/*', 'src/showcase.tsx'],
        insertTypesEntry: true,
      }),
    ],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'FuncUI',
        fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          'react/jsx-runtime',
          'clsx',
          'tailwind-merge',
          'framer-motion',
        ],
        output: {
          // The library is interactive (hooks, state, event handlers), so the
          // whole bundle is a Client Component — lets Next.js App Router
          // consumers import it from Server Components without per-import
          // "use client" directives.
          banner: "'use client';",
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'style.css') return 'index.css';
            return assetInfo.name || '';
          },
        },
      },
      cssCodeSplit: false,
      sourcemap: true,
    },
  };
});
