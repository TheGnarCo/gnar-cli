import { PackageInstallable } from './index'

class Npm implements PackageInstallable {
  public addDev(packages: string): string {
    return `npm install --dev ${packages}`
  }
}

export default Npm
