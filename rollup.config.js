import ts from 'rollup-plugin-typescript2'
import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import scss from 'rollup-plugin-scss'
export default {
  // input: 'packages/components/index.js',
  input: './packages/components/index.ts',
  output: {
    format: 'es',
    dir: 'lib',
    exports: 'named',
    preserveModules: true,
    preserveModulesRoot: 'asd',
    sourcemap: false,
    entryFileNames: `[name].js`,
  },
  plugins: [
    dts(),
    ts(),
    css(),
    scss(),
    vue({ target: 'browser' }),
    nodeResolve({
      extensions: ['.mjs', '.js', '.json', '.ts'],
    }),
    commonjs(),
    esbuild({
      sourceMap: false,
      target: 'es2018',
    }),
  ],
  treeshake: false,
}