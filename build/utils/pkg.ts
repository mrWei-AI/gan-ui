import {buildConfig, Module} from "../build-info";
import {EP_PREFIX} from "./constants";


export const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist']
  return files.filter(
    (path) => !excludes.some((exclude) => path.includes(exclude))
  )
}
export const pathRewriter = (module: Module) => {
  const config = buildConfig[module]

  return (id: string) => {
    console.log('id>>>>>>>>>>>',id)
    id = id.replaceAll(`${EP_PREFIX}/lib`, 'gan/lib');
    id = id.replaceAll(`${EP_PREFIX}/`, `${config.bundle.path}/`)

    return id
  }
}