import { execSync } from 'child_process'
import * as fs from 'fs'

import Npm from './npm'
import Yarn from './yarn'

export interface PackageInstallable {
  addDev(packages: string): string
  addGlobal(packages: string): string
}

const YARN_LOCK_FILE = 'yarn.lock'

class PackageInstaller {
  public addDev(...packages: string[]): Promise<void> {
    const packageString = packages.join(' ')
    const command = this.getPackageManager().addDev(packageString)

    process.stdout.write(`Installing dev dependencies via: ${command}\n\n`)

    execSync(command)

    return Promise.resolve()
  }

  public addGlobal(...packages: string[]): Promise<void> {
    const packageString = packages.join(' ')
    const command = this.getPackageManager().addGlobal(packageString)

    process.stdout.write(`Installing global dependencies via: ${command}\n\n`)

    execSync(command)

    return Promise.resolve()
  }

  private getPackageManager(): PackageInstallable {
    if (fs.existsSync(YARN_LOCK_FILE)) {
      return new Yarn()
    } else {
      return new Npm()
    }
  }
}

export default new PackageInstaller()
