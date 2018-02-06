import { spawn } from 'child_process'
import * as fs from 'fs'

const PRETTIER_CONFIG_FILE_NAME = '.prettierrc'

class Prettier {
  public run() {
    process.stdout.write('Setting up Prettier...\n')

    this.installDependencies()
      .then(() => {
        return this.writeConfig()
      })
      .then(() => {
        return this.updatePackageJson()
      })
  }

  private installDependencies() {
    process.stdout.write('Installing dependencies....\n')

    const yarn = spawn('yarn', [
      'add',
      '--dev',
      'prettier',
      'lint-staged',
      'husky',
    ])

    return new Promise(resolve => {
      yarn.on('close', function() {
        resolve()
      })
    })
  }

  private writeConfig() {
    process.stdout.write('Writing Prettier config to .prettierrc\n')
    fs.writeFileSync(PRETTIER_CONFIG_FILE_NAME, config)

    return Promise.resolve()
  }

  private updatePackageJson() {
    process.stdout.write('Updating your package.json with hooks... \n')
    const packageJson = this.readPackageJson()

    packageJson.scripts = packageJson.scripts || {}
    packageJson.scripts.precommit = 'lint-staged'
    packageJson['lint-staged'] = {
      '*.{js,ts,json,css,md}': ['prettier --write', 'git add'],
    }

    const formattedPackageJson = JSON.stringify(packageJson, null, 2)
    fs.writeFileSync('package.json', formattedPackageJson)
  }

  private readPackageJson(): any {
    const contents = fs.readFileSync('package.json').toString()

    return JSON.parse(contents)
  }
}

const config = `
{
  trailingComma: "all",
  singleQuote: true,
  semi: false
}
`

export default Prettier
