import * as fs from 'node:fs'

import { PackageInstaller } from '../../utils/package-installer'
import PackageJson from '../../utils/package-json'

const PRETTIER_CONFIG_FILE_NAME = '.prettierrc'
const CONFIG = `{
  "semi": false,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "avoid"
}`

export class Prettier {
  static command = 'prettier'

  static async run() {
    process.stdout.write(`Setting up ${Prettier.command}...\n\n`)

    await Prettier.installDependencies()
    await Prettier.writeConfig()
    Prettier.updatePackageJson()
  }

  static async installDependencies() {
    return PackageInstaller.addDev(Prettier.command, 'lint-staged', 'husky')
  }

  static async writeConfig() {
    process.stdout.write(`Writing ${Prettier.command} config to .prettierrc\n\n`)
    fs.writeFileSync(PRETTIER_CONFIG_FILE_NAME, CONFIG)

    return Promise.resolve()
  }

  static updatePackageJson() {
    const scriptConfig = {
      scripts: {
        prettify: "prettier '*.{js,ts,tsx}' '{src,app,__tests__}/**/*.{js,ts,tsx}' --write",
      },
      'lint-staged': {
        '*.{js,ts,tsx,json,css,md}': ['prettier --write'],
      },
    }

    const packageJson = new PackageJson()
    packageJson.merge(scriptConfig)
    packageJson.write()
  }
}
