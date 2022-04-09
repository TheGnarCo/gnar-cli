import { PackageInstaller } from '../../utils/package-installer'
import PackageJson from '../../utils/package-json'
import { Gnarrc } from '../../utils/gnarrc'

export class Prettier {
  static command = 'prettier'

  static async run() {
    process.stdout.write(`Setting up ${Prettier.command}...\n\n`)

    await PackageInstaller.addDevFromGnarrc(Prettier.command)
    await Gnarrc.getFile(`${Prettier.command}/.prettierrc`)
    Prettier.updatePackageJson()
  }

  static async updatePackageJson() {
    new PackageJson().mergeFromGnarrc(Prettier.command).then(pack => pack.write())
  }
}
