import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

export default {
    input: `./src/service-worker/index.ts`,
    context: 'src/',
    output: [
        { file: './src/sw-devrant.js', format: 'umd', sourcemap: 'inline' },
    ],
    watch: {
        include: 'src/**',
        chokidar: {
            // because WSL (and WSL2)
            usePolling: true,
        },
    },
    plugins: [
        // Compile TypeScript files
        typescript({ useTsconfigDeclarationDir: true }),
        // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
        commonjs(),
        // Allow node_modules resolution, so you can use 'external' to control
        // which external modules to include in the bundle
        // https://github.com/rollup/rollup-plugin-node-resolve#usage
        resolve({
            browser: true,
        }),
    ],
};
