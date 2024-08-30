import { defineConfig } from 'tsup';

export default defineConfig((opts) => ({
    entry: ['bin/index.ts'],
    format: ['cjs'],
    outDir: 'dist',
    target: ['node16'],
    bundle: true,
    clean: !opts.watch,
    // minify: !opts.watch,
    treeshake: opts.watch ? false : 'smallest',
    splitting: true,
    cjsInterop: true,
    legacyOutput: true,
    dts: true,
}));
