import { defineConfig } from 'tsup'

export default defineConfig({
    entry: { index: 'src/index.ts', 'react/index': 'src/react/index.ts', 'next/index': 'src/next/index.ts' },
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    shims: true,
    minify: true,
    treeshake: true,
    skipNodeModulesBundle: true,
    external: ['react', 'react-dom', 'next'],
    outDir: 'dist'
})