import { Gnarrc } from 'utils/gnarrc'
import { PackageInstaller } from 'utils/package-installer'
import { PackageJson } from 'utils/package-json'
import { stdOut } from 'utils/std-out'

export class Eslint {
  static command = 'eslint'

  static async add() {
    stdOut(`Setting up ${Eslint.command}...\n\n`)

    await PackageInstaller.addDevFromGnarrc(Eslint.command)
    await Gnarrc.getFile(`${Eslint.command}/.eslintrc.json`)
    await Gnarrc.getFile(`${Eslint.command}/.eslintignore`)
    Eslint.updatePackageJson()
  }

  static async updatePackageJson() {
    new PackageJson().mergeFromGnarrc('eslint').then(pack => pack.write())
  }
}
