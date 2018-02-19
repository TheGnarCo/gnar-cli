#!/usr/bin/env node

import * as program from 'commander'
import Eslint from './commands/eslint'
import Prettier from './commands/prettier'
import Tslint from './commands/tslint'

// tslint:disable no-var-requires
const VERSION = require('../package.json').version

program
  .version(VERSION)
  .command('prettier')
  .description('install prettier with default configuration and git hooks')
  .action(() => {
    new Prettier().run()
  })

program
  .version(VERSION)
  .command('eslint')
  .description('install eslint with default configuration')
  .action(() => {
    new Eslint().run()
  })

program
  .version(VERSION)
  .command('tslint')
  .description('install tslint with default configuration')
  .action(() => {
    new Tslint().run()
  })

program.parse(process.argv)
