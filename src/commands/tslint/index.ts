import { execSync } from 'child_process'
import * as fs from 'fs'
import { merge } from 'lodash'

import PackageJson from '../../utils/package-json'
import Yarn from '../../utils/yarn'

const CONFIG_FILE_NAME = 'tslint.json'

const CONFIG = `{
  "extends": ["tslint:recommended", "tslint-react"],
  "linterOptions": {
    "exclude": ["node_modules/**"]
  },
  "rules": {
    "arrow-parens": [true, "ban-single-arg-parens"],
    "semicolon": ["true", "never"],
    "quotemark": [true, "single", "jsx-double"],
    "variable-name": [
      true,
      "ban-keywords",
      "check-format",
      "allow-leading-underscore"
    ],
    "interface-name": [true, "never-prefix"],
    "object-literal-key-quotes": false,
    "trailing-comma": [
      true,
      {
        "multiline": {
          "objects": "always",
          "arrays": "always",
          "functions": "always",
          "typeLiterals": "ignore"
        },
        "esSpecCompliant": true
      }
    ]
  }
}`

class Tslint {
  public run() {
    process.stdout.write('Setting up tslint...\n\n')

    this.installDependencies()
      .then(this.writeConfig)
      .then(this.updatePackageJson)
  }

  private installDependencies() {
    return Yarn.addDev('tslint', 'tslint-react')
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
        lint: "yarn run tslint -c tslint.json '**/*.ts' '**/*.tsx'",
      },
    }

    const packageJson = new PackageJson()
    packageJson.merge(scriptConfig)
    packageJson.write()
  }
}

export default Tslint
