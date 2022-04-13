import { Command } from 'commander'
import { execCommand } from '../../utils/exec-command'
import { Gnarrc } from '../../utils/gnarrc'

export class Rails {
  static command = 'rails'

  static async run(
    mainCommand: string,
    subCommand: string,
    _options: Record<string, unknown>,
    command: Command,
  ) {
    const extraArgs = command.args
      .filter(arg => arg !== mainCommand && arg !== subCommand)
      .join(' ')

    process.stdout.write(`Setting up Rails New with Gnarly opinions...\n`)

    const rawOptions = await Gnarrc.get('rails/7/.railsrc')

    const railsCommand = [
      `rails`,
      `${mainCommand}`,
      `${subCommand}`,
      `${rawOptions.replace(/\r\n|\r|\n/g, ' ')}`.trim(),
      `${extraArgs}`,
      `\n`,
    ].join(' ')

    process.stdout.write(`Running ${railsCommand}`)
    execCommand(railsCommand)
  }
}
