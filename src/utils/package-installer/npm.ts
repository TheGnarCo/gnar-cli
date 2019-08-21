import { PackageInstallable } from './index'

class Npm implements PackageInstallable {
  public addDev(packages: string): string {
    return `npm install --dev ${packages}`
  }

  public addGlobal(packages: string): string {
    return `npm install -g ${packages}`
  }
}

export default Npm
