import * as fs from 'fs'

import PackageInstaller from '../../utils/package-installer'
import PackageJson from '../../utils/package-json'

const CONFIG_FILE_NAME = '.eslintrc.json'
const TEMPLATE_FILE_PATH = 'src/commands/eslint/.eslintrc.json'
class Eslint {
  public run() {
    process.stdout.write('Setting up eslint...\n\n')

    this.installDependencies()
      .then(this.writeConfig)
      .then(this.updatePackageJson)
  }

  private installDependencies() {
    return PackageInstaller.addDev(
      'babel-eslint',
      'eslint',
      'eslint-config-airbnb',
      'eslint-plugin-import',
      'eslint-plugin-jsx-a11y',
      'eslint-plugin-react',
      'eslint-config-prettier',
    )
  }

  private writeConfig() {
    process.stdout.write(
      `Writing the following config to ${CONFIG_FILE_NAME}\n\n`,
    )

    const configFile = fs.readFileSync(TEMPLATE_FILE_PATH).toString()
    fs.writeFileSync(CONFIG_FILE_NAME, configFile)

    return Promise.resolve()
  }

  private updatePackageJson() {
    const scriptConfig: any = {
      scripts: {
        lint: "npm run eslint '**/*.js'",
      },
    }

    const packageJson = new PackageJson()
    packageJson.merge(scriptConfig)
    packageJson.write()
  }
}

export default Eslint
