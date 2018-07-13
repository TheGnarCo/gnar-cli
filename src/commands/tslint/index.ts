import { execSync } from 'child_process'
import * as fs from 'fs'
import { merge } from 'lodash'

import PackageJson from '../../utils/package-json'
import PackageInstaller from '../../utils/package-installer'

const CONFIG_FILE_NAME = 'tslint.json'

const CONFIG = `{
  "extends": ["tslint:recommended", "tslint-react"],
  "linterOptions": {
    "exclude": ["node_modules/**"]
  },
  "rules": {
    "arrow-parens": [true, "ban-single-arg-parens"],
    "interface-name": [true, "never-prefix"],
    "interface-over-type-literal": false,
    "jsx-boolean-value": [true, "never"],
    "jsx-no-multiline-js": false,
    "object-literal-key-quotes": false,
    "ordered-imports": false,
    "quotemark": [true, "single", "jsx-double"],
    "semicolon": ["true", "never"],
    "member-ordering": [
      true,
      {
        "order": [
          "public-constructor",
          "public-instance-field"
        ]
      }
    ],
    "trailing-comma": [
      true,
      {
        "esSpecCompliant": true,
        "multiline": {
          "arrays": "always",
          "functions": "always",
          "objects": "always",
          "typeLiterals": "ignore"
        }
      }
    ],
    "variable-name": [
      true,
      "allow-leading-underscore",
      "allow-pascal-case",
      "ban-keywords",
      "check-format"
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
