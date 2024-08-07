import esbuild from 'esbuild';

esbuild.build({
    entryPoints: ['index.js'],
    bundle: true,
    minify: true,
    outfile: './build/index.js',
    format: 'esm',
    loader: { '.html': 'text' },
  }).catch(() => process.exit(1))