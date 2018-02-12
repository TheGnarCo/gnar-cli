#!/usr/bin/env node

import * as program from 'commander'
import Prettier from './commands/prettier'
import Eslint from './commands/eslint'

const VERSION = require('../package.json').version

let command

program
  .version(VERSION)
  .command('prettier')
  .description('install prettier with default configuration and git hooks')
  .action(function() {
    new Prettier().run()
  })

program
  .version(VERSION)
  .command('eslint')
  .description('install eslint with default configuration')
  .action(function() {
    new Eslint().run()
  })

program.parse(process.argv)
