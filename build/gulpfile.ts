import { run } from './utils/process'
import { withTaskName } from './utils/gulp'
import {series, parallel, TaskFunction} from 'gulp'
import {buildOutput} from "./utils/paths";
import {buildConfig, Module} from "./build-info";

const runTask = (name: string) =>
    withTaskName(name, () => run(`npm run build ${name}`));

export const copyTypesDefinitions: TaskFunction = (done) => {
    const src = `${buildOutput}/types/`
    const copy = (module: Module) =>
        withTaskName(`copyTypes:${module}`, () =>
            run(`rsync -a ${src} ${buildConfig[module].output.path}/`)
        )
    return parallel(copy('esm'), copy('cjs'))(done)
}


export default series(
    withTaskName('clean', () => run('npm run clean')),
    parallel(
        runTask('buildModules'),
        runTask('buildFullBundle'),
        runTask('generateTypesDefinitions'),
    ),
    parallel(copyTypesDefinitions)
);
export * from './modules'
export * from './full-bundle'
export * from './types-definitions'
export * from './css'
