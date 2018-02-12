import { execSync } from 'child_process'
import * as fs from 'fs'
import { merge } from 'lodash'

import PackageJson from '../../utils/package-json'
import Yarn from '../../utils/yarn'

const CONFIG_FILE_NAME = '.eslintrc.json'

const CONFIG = `{
  "extends": ["airbnb", "prettier"],
  "parser": "babel-eslint",
  "globals": {
    "document": true,
    "window": true,
    "expect": true,
    "beforeEach": true,
    "describe": true,
    "test": true,
    "jest": true
  },
  "rules": {
    "arrow-body-style": [1, "as-needed"],
    "class-methods-use-this": "off",
    "func-names": ["error", "never"],
    "import/no-webpack-loader-syntax": "off",
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "sibling",
          "index",
          "parent"
        ]
      }
    ],
    "no-else-return": "off",
    "no-underscore-dangle": "off",
    "no-unused-vars": [
      "error",
      {
        "vars": "local",
        "varsIgnorePattern": "_",
        "args": "after-used",
        "argsIgnorePattern": "_"
      }
    ],
    "no-use-before-define": "off",
    "react/jsx-filename-extension": "off"
  }
}`

class Eslint {
  public run() {
    process.stdout.write('Setting up eslint...\n\n')

    this.installDependencies()
      .then(this.writeConfig)
      .then(this.updatePackageJson)
  }

  private installDependencies() {
    return Yarn.addDev(
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

    fs.writeFileSync(CONFIG_FILE_NAME, CONFIG)

    return Promise.resolve()
  }

  private updatePackageJson() {
    const scriptConfig: any = {
      scripts: {
        lint: "yarn run eslint '**/*.js'",
      },
    }

    const packageJson = new PackageJson()
    packageJson.merge(scriptConfig)
    packageJson.write()
  }
}

export default Eslint
