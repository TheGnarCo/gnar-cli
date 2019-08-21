import { PackageInstallable } from './index'

class Yarn implements PackageInstallable {
  public addDev(packages: string): string {
    return `yarn add --dev ${packages}`
  }

  public addGlobal(packages: string): string {
    return `yarn global add ${packages}`
  }
}

export default Yarn
