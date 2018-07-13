import * as fs from 'fs'
import { execSync } from 'child_process'

import Yarn from './yarn'
import Npm from './npm'

export interface PackageInstallable {
  addDev(packages: string): string
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

  private getPackageManager(): PackageInstallable {
    if (fs.existsSync(YARN_LOCK_FILE)) {
      return new Yarn()
    } else {
      return new Npm()
    }
  }
}

export default new PackageInstaller()
