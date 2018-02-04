#!/usr/bin/env node

import * as program from 'commander'
import Prettier from './commands/prettier'

const VERSION = require('../package.json').version

let command

program
  .version(VERSION)
  .command(
    'prettier',
    'install prettier with default configuration and git hooks',
  )
  .action(function() {
    new Prettier().run()
  })

program.parse(process.argv)
