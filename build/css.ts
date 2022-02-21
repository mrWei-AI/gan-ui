import {OutputOptions, rollup} from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { generateExternal, writeBundles } from './utils/rollup'
import scss from 'rollup-plugin-scss'
import {compRoot, epRoot, pkgRoot} from "./utils/paths";
import {buildConfigEntries} from "./build-info";
export const buildCss = async () => {
  const bundle = await rollup({
    input:compRoot+'/style.ts',
    plugins: [
        scss(),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts','.css',],
      }),
    ],
  })
    bundle.write({
        file : './output.js' ,
        format : 'esm'
    })

}
