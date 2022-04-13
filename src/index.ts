#!/usr/bin/env node

import { program } from 'commander'

import { Eslint } from './commands/eslint'
import { Prettier } from './commands/prettier'
import { Rails } from './commands/rails'

program.version('0.0.dev')

program
  .command('prettier')
  .description('Install Prettier with Gnarly Opinions')
  .action(Prettier.run)

program
  .command('eslint')
  .description('Install ESlint + Prettier with Gnarly Opinions')
  .action(Eslint.run)

program
  .command('rails')
  .argument('<mainCommand>', 'first argument passed to rails')
  .argument('[subcommand]', 'Second command passed to rails')
  .description('install ESLint with Gnarly configuration - now with Prettier!')
  .action(Rails.run)

program.parse(process.argv)
