#!/usr/bin/env node

import { program } from 'commander'

import { stdOut } from './utils/std-out'

import { Prettier } from './packages/prettier'
import { Eslint } from './packages/eslint'

import { Rails } from './frameworks/rails'

program.version('0.0.dev')

program
  .command('add')
  .argument('<packageName>', 'the package name')
  .description('Add and Setup Dependencies with Gnarly Opinions')
  .action(packageName => {
    switch (packageName.toLowerCase()) {
      case 'prettier':
        Prettier.add()
        break
      case 'eslint':
        Eslint.add()
        break
      default:
        stdOut(`
          Unrecognized package name passed to gnar add: ${packageName}
          Recognized Packages: eslint, prettier, typescript
        `)
        break
    }
  })

program
  .command('init')
  .argument('<frameworkName>', 'the framework name')
  .argument('<subCommand>', 'subcommand')
  .description('Greenfield Frameworks with Gnarly Opinions')
  .action((frameworkName, subCommand, _options, command) => {
    const extraArgs = command.args.filter((arg: string) => arg !== subCommand).join(' ')

    switch (frameworkName.toLowerCase()) {
      case 'rails':
        Rails.init(subCommand, extraArgs)
        break
      default:
        stdOut(`
          Unrecognized Framework name passed to gnar add: ${frameworkName}
          Recognized Frameworks: rails
        `)
        break
    }
  })

program.parse(process.argv)
