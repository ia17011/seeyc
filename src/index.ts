import * as fs from 'fs'
import {PackageJSON} from './type'

// const num: number = +process.argv[2]

/**
 *
 * package.jsonをロードする
 */
async function loadPackageJson(packageJsonPath: string): Promise<PackageJSON> {
  const packageJson: PackageJSON = JSON.parse(
    await fs.readFileSync(packageJsonPath, 'utf8'),
  )
  return packageJson
}

/**
 *
 * package.jsonのdependenciesとdevDependenciesのパッケージのSetを作る
 */
async function listPackages(packageJsonPath: string) {
  const packageJson = await loadPackageJson(packageJsonPath)
  let packages = new Set()

  const typePackage = new RegExp('^@types/', 'g')

  if (typeof packageJson.dependencies !== 'undefined') {
    for (const [packageName, _] of Object.entries(packageJson.dependencies)) {
      if (typePackage.test(packageName)) {
        continue
      }
      packages.add(packageName)
    }
  }

  if (typeof packageJson.devDependencies !== 'undefined') {
    for (const [packageName, _] of Object.entries(
      packageJson.devDependencies,
    )) {
      if (typePackage.test(packageName)) {
        continue
      }
      packages.add(packageName)
    }
  }

  console.log(packages)
}

listPackages('./package.json')
