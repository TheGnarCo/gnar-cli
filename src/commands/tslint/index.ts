import * as fs from 'fs'

import PackageInstaller from '../../utils/package-installer'
import PackageJson from '../../utils/package-json'
import { CONFIG, CONFIG_FILE_NAME } from './defaultConfig'

class Tslint {
  public run() {
    process.stdout.write('Setting up tslint...\n\n')

    this.installDependencies()
      .then(this.writeConfig)
      .then(this.updatePackageJson)
  }

  private installDependencies() {
    return PackageInstaller.addDev('tslint', 'tslint-react')
  }

  private writeConfig(): Promise<void> {
    process.stdout.write(
      `Writing the following config to ${CONFIG_FILE_NAME}\n\n`,
    )

    fs.writeFileSync(CONFIG_FILE_NAME, CONFIG)

    return Promise.resolve()
  }

  private updatePackageJson() {
    const scriptConfig: any = {
      scripts: {
        lint: "npm run tslint -c tslint.json '**/*.ts' '**/*.tsx'",
      },
    }

    const packageJson = new PackageJson()
    packageJson.merge(scriptConfig)
    packageJson.write()
  }
}

export default Tslint