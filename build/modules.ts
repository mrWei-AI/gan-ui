import { rollup } from 'rollup'
import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import filesize from 'rollup-plugin-filesize'
import glob from 'fast-glob'
import { epRoot, pkgRoot } from './utils/paths'
import { generateExternal, writeBundles } from './utils/rollup'
import { excludeFiles } from './utils/pkg'
import { buildConfigEntries } from './build-info'
import type { OutputOptions } from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'
import scss from 'rollup-plugin-scss'

async function alog() {
  let a = await glob('**/*.{js,ts,vue}', {
    cwd: pkgRoot,
    absolute: true,
    onlyFiles: true
  })
  console.log('————————————————————————————————————》》》》》》》》', a)
  return a
}
export const buildModules = async () => {
  const input = excludeFiles(
    await alog()
    // await glob('**/*.{js,ts,vue}', {
    //   cwd: pkgRoot,
    //   absolute: true,
    //   onlyFiles: true,
    // })
  )
  const bundle = await rollup({
    input,
    plugins: [
      css(),
      scss(),
      vue({ target: 'browser' }),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts']
      }),
      commonjs(),
      esbuild({
        sourceMap: false,
        target: 'es2018'
      })
    ],
    external: await generateExternal({ full: false }),
    treeshake: true
  })
  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true,
        preserveModulesRoot: epRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`
      }
    })
  )
}
