import { execCommand } from '../../utils/exec-command'
import { Gnarrc } from '../../utils/gnarrc'
import { stdOut } from '../../utils/std-out'

export class Rails {
  static command = 'rails'

  static async init(name: string, extraArgs: Array<string>) {
    stdOut(`Setting up Rails New with Gnarly opinions...\n`)

    const rawOptions = await Gnarrc.get('rails/7/.railsrc')
    const args = `${rawOptions.replace(/\r\n|\r|\n/g, ' ').trim()} ${extraArgs.join(' ')}`

    const railsCommand = [`rails new`, `${name}`, `${args}`, `\n`].join(' ')

    stdOut(`Running ${railsCommand}`)
    execCommand(railsCommand)
  }
}
