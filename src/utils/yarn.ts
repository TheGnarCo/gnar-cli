import { execSync } from 'child_process'

class Yarn {
  public addDev(...packages: string[]): Promise<void> {
    const packageString = packages.join(' ')
    const command = `yarn add --dev ${packageString}`

    process.stdout.write(`Installing dev dependencies via: ${command}\n\n`)

    execSync(command)

    return Promise.resolve()
  }
}

export default new Yarn()
