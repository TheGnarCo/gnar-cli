import { writeFileSync } from 'node:fs'
import { PackageInstaller } from '../../utils/package-installer'
import PackageJson from '../../utils/package-json'
import { Prettier } from '../prettier'

const CONFIG_FILE_NAME = '.eslintrc.json'

const CONFIG = `{
  "env": {
      "browser": true,
      "es2021": true
  },
  "plugins": [
      "@typescript-eslint",
      "regexp",
      "prettier"
  ],
  "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:regexp/recommended",
      "airbnb",
      "airbnb-typescript",

      "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
      "project": "./tsconfig.json",
      "createDefaultProgram": true
  },
  "rules": {
      "arrow-body-style": [
          1,
          "as-needed"
      ],
      "class-methods-use-this": "off",
      "func-names": [
          "error",
          "never"
      ],
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

export class Eslint {
  static command = 'eslint'

  static async run() {
    Prettier.run()

    process.stdout.write(`Setting up ${Eslint.command}...\n\n`)

    await Eslint.installDependencies()
    await Eslint.writeConfig()
    Eslint.updatePackageJson()
  }

  static async installDependencies() {
    return PackageInstaller.addDev(
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      Prettier.command,
      Eslint.command,
      'eslint-config-airbnb',
      'eslint-plugin-react-hooks',
      'eslint-config-prettier',
      'eslint-config-airbnb-typescript',
      'eslint-plugin-import',
      'eslint-plugin-jsx-a11y',
      'eslint-plugin-prettier',
      'eslint-plugin-react',
      'eslint-plugin-regexp',
      'lint-staged',
      'husky',
    )
  }

  static async writeConfig() {
    process.stdout.write(`Writing the following config to ${CONFIG_FILE_NAME}\n\n`)

    writeFileSync(CONFIG_FILE_NAME, CONFIG)

    return Promise.resolve()
  }

  static updatePackageJson() {
    const scriptConfig = {
      scripts: {
        lint: 'eslint . -c .eslintrc.json',
      },
      'lint-staged': {
        '*.{js,jsx,ts,tsx}': 'eslint . -c .eslintrc.json --cache --fix',
      },
    }

    const packageJson = new PackageJson()
    packageJson.merge(scriptConfig)
    packageJson.write()
  }
}
