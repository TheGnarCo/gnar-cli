#!/usr/bin/env node

import * as program from 'commander'
import Eslint from './commands/eslint'
import Prettier from './commands/prettier'
import Tslint from './commands/tslint'
import Typescript from './commands/typescript'

// tslint:disable no-var-requires
const VERSION = require('../package.json').version
interface TypescriptInstallOptions {
  withConfig: boolean
  addScripts: boolean
}

program.version(VERSION)

program
  .command('prettier')
  .description('install prettier with default configuration and git hooks')
  .action(() => {
    new Prettier().run()
  })

program
  .command('eslint')
  .description('install eslint with default configuration')
  .action(() => {
    new Eslint().run()
  })

program
  .command('tslint')
  .description('install tslint with default configuration')
  .action(() => {
    new Tslint().run()
  })

program
  .command('typescript')
  .description('install Typescript globally')
  .option('-C, --with-config', 'add a local tsconfig file')
  .option('-S, --add-scripts', 'add a local tsconfig file')
  .action(({ withConfig, addScripts }: TypescriptInstallOptions) => {
    new Typescript().run(withConfig, addScripts)
  })

program.parse(process.argv)
