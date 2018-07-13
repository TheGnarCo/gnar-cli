import { PackageInstallable } from './index'

class Yarn implements PackageInstallable {
  public addDev(packages: string): string {
    return `yarn add --dev ${packages}`
  }
}

export default Yarn
