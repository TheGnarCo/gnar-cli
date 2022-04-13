import { existsSync } from 'node:fs'

import Npm from './npm'
import Yarn from './yarn'
import { PackageInstallable } from './types'
import { execCommand } from '../exec-command'

const YARN_LOCK_FILE = 'yarn.lock'

export class PackageInstaller {
  static manager: PackageInstallable = existsSync(YARN_LOCK_FILE) ? new Yarn() : new Npm()

  static async addDev(...packages: string[]): Promise<void> {
    const command = PackageInstaller.manager.addDev(packages.join(' '))

    process.stdout.write(`Installing dev dependencies via: ${command}\n\n`)

    execCommand(command)
  }
}
