import { spawn } from 'child_process'
import * as fs from 'fs'

import PackageJson from '../../utils/package-json'
import Yarn from '../../utils/yarn'

const PRETTIER_CONFIG_FILE_NAME = '.prettierrc'

class Prettier {
  public run() {
    process.stdout.write('Setting up Prettier...\n\n')

    this.installDependencies()
      .then(this.writeConfig)
      .then(this.updatePackageJson)
  }

  private installDependencies() {
    return Yarn.addDev('prettier', 'lint-staged', 'husky')
  }

  private writeConfig() {
    process.stdout.write('Writing Prettier config to .prettierrc\n\n')
    fs.writeFileSync(PRETTIER_CONFIG_FILE_NAME, config)

    return Promise.resolve()
  }

  private updatePackageJson() {
    const scriptConfig: any = {
      scripts: {
        precommit: 'lint-staged',
        prettify: "prettier '*.{js,ts,tsx}' '{src,app,__tests__}/**/*.{js,ts,tsx}' --write",
      },
      // tslint:disable object-literal-sort-keys
      'lint-staged': {
        '*.{js,ts,tsx,json,css,md}': ['prettier --write', 'git add'],
      },
    }

    const packageJson = new PackageJson()
    packageJson.merge(scriptConfig)
    packageJson.write()
  }
}

const config = `{
  trailingComma: "all",
  singleQuote: true,
  semi: false
}
`

export default Prettier
