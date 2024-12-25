import esbuild from 'esbuild';

esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: false,
    outfile: './build/index.js',
    format: 'esm',
    loader: { '.html': 'text' },
}).catch(() => process.exit(1));
