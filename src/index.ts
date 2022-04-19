#!/usr/bin/env node

import { program } from 'commander'

import { Eslint, Prettier } from './commands'

program.version('0.0.dev')

program
  .command('prettier')
  .description('Install Prettier with Gnarly Opinions')
  .action(Prettier.run)

program
  .command('eslint')
  .description('Install ESlint + Prettier with Gnarly Opinions')
  .action(Eslint.run)

program.parse(process.argv)
