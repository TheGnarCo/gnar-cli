import * as fs from 'fs'
import { CONFIG, CONFIG_FILE_NAME } from './defaultConfig'

import PackageInstaller from '../../utils/package-installer'
import PackageJson from '../../utils/package-json'

class Typescript {
  private generateConfig: boolean
  private addScripts: boolean

  public run(generateConfig?: boolean, addScripts?: boolean) {
    this.generateConfig = generateConfig || false
    this.addScripts = addScripts || false

    process.stdout.write('Setting up typescript...\n\n')
    this.installDependencies()
      .then(this.writeConfig)
      .then(this.updatePackageJson)
  }

  private installDependencies() {
    return PackageInstaller.addGlobal('typescript')
  }

  private writeConfig = () => {
    if (this.generateConfig) {
      process.stdout.write(`Writing default config to ${CONFIG_FILE_NAME}\n\n`)

      fs.writeFileSync(CONFIG_FILE_NAME, CONFIG)
    }

    return Promise.resolve()
  }

  private updatePackageJson = () => {
    if (this.addScripts) {
      const scriptConfig: any = {
        scripts: {
          "prepare": 'tsc',
          'prepare-watch': 'tsc --watch',
        },
      }

      const packageJson = new PackageJson()
      packageJson.merge(scriptConfig)
      packageJson.write()
    }

    return Promise.resolve()
  }
}

export default Typescript
