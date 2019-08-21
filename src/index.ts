#!/usr/bin/env node

import * as program from 'commander'
import Eslint from './commands/eslint'
import Prettier from './commands/prettier'
import Tslint from './commands/tslint'
import Typescript from './commands/typescript'

// tslint:disable no-var-requires
const VERSION = require('../package.json').version
interface TypescriptInstallOptions {
  with_config: boolean
  add_scripts: boolean
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
  .option('-C, --with_config', 'add a local tsconfig file')
  .option('`-S, --add_scripts', 'add a local tsconfig file')
  .action(({ with_config, add_scripts }: TypescriptInstallOptions) => {
    new Typescript().run(with_config, add_scripts)
  })

program.parse(process.argv)
