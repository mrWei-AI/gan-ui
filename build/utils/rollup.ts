import { epPackage } from './paths'

import type { OutputOptions, RollupBuild } from 'rollup'
const getPackageManifest = (pkgPath: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(pkgPath) as any
}

let getPackageDependencies = (pkgPath: string): string[] => {
  const manifest = getPackageManifest(pkgPath)
  const { dependencies } = manifest
  return Object.keys(dependencies ?? {})
}
export const generateExternal = async (options: { full: boolean }) => {
  return (id: string) => {
    const packages: string[] = ['vue']
    if (!options.full) {
      packages.push('gan/theme-chalk')

      packages.push('@vue', ...getPackageDependencies(epPackage))

    }

    return [...new Set(packages)].some(
      (pkg) => id === pkg || id.startsWith(`${pkg}/`)
    )
  }
}

export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)))
}
