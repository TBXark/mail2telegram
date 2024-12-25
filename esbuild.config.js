import esbuild from 'esbuild';

esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    outfile: './build/index.js',
    format: 'esm',
    loader: { '.html': 'text' },
}).catch(() => process.exit(1));
