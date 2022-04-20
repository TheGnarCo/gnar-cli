import { PackageInstaller } from 'utils/package-installer'
import { Gnarrc } from 'gnarrc'
import { PackageJson } from 'utils/package-json'
import { stdOut } from 'utils/std-out'

export class Prettier {
  static command = 'prettier'

  static async add() {
    stdOut(`Setting up ${Prettier.command}...\n\n`)

    await PackageInstaller.addDevFromGnarrc(Prettier.command)
    await Gnarrc.getFile(`${Prettier.command}/.prettierrc`)
    Prettier.updatePackageJson()
  }

  static async updatePackageJson() {
    new PackageJson().mergeFromGnarrc(Prettier.command).then(pack => pack.write())
  }
}
