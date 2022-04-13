import { PackageInstallable } from './types'

class Npm implements PackageInstallable {
  public addDev(packages: string): string {
    return `npm install --dev ${packages}`
  }
}

export default Npm
